/* 
  AXION 2K26 - Production Registration Backend
  
  INSTRUCTIONS:
  1. Paste this code into your Google Apps Script editor.
  2. Click the "Run" button for the 'setup' function (this is MANDATORY to grant email permissions).
  3. Click "Deploy" > "New Deployment".
  4. Select "Web App".
  5. Set "Execute as" to "Me".
  6. Set "Who has access" to "Anyone".
  7. Copy the Web App URL and paste it into SCRIPT_URL in your React app.
*/

function setup() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  
  // Initialize Registrations Sheet
  let sheet = doc.getSheetByName("Registrations");
  if (!sheet) {
    sheet = doc.insertSheet("Registrations");
    sheet.appendRow(["Timestamp", "Participant ID", "Full Name", "Email", "Phone", "College", "Department", "Year", "Payment Status"]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#f3f4f6");
  }
  
  // Initialize Logs Sheet
  let logSheet = doc.getSheetByName("Logs");
  if (!logSheet) {
    logSheet = doc.insertSheet("Logs");
    logSheet.appendRow(["Timestamp", "Type", "Message", "Details"]);
    logSheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#fee2e2");
  }
  
  return "Setup successful. Sheets are ready and permissions granted.";
}

function doGet(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName("Registrations") || setup();
    const values = sheet.getDataRange().getValues();
    
    let data = [];
    if (values.length > 1) {
      const headers = values[0];
      data = values.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          let key = header.toString().trim().toLowerCase().replace(/ /g, "");
          if (key === "name" || key === "participantname") key = "fullname";
          if (key === "id" || key === "idnumber") key = "participantid";
          if (key === "status") key = "paymentstatus";
          obj[key] = row[index];
        });
        return obj;
      });
    }
    return respond(data, e.parameter.callback);
  } catch (err) {
    return respond({ result: "error", message: err.toString() }, e.parameter.callback);
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName("Registrations") || setup();
    
    let data;
    try {
      data = (e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : e.parameter;
    } catch (pErr) { 
      data = e.parameter; 
    }
    
    // DEBUG: Log the entire data object to see what's coming in
    logToSheet("DEBUG", "Payload Received", data);
    
    // Robust Field Extraction (Search all keys for 'email' and 'name')
    let email = "";
    let name = "Participant";
    
    if (data) {
      for (let key in data) {
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes("email")) email = data[key];
        if (lowerKey.includes("name") || lowerKey.includes("fullname")) name = data[key];
      }
    }
    
    email = (email || "").toString().trim();
    name = (name || "Participant").toString().trim();
    
    const phone = data.phone || data.Phone || "";
    const college = data.college || data.College || "";
    const dept = data.department || data.Department || "";
    const year = data.year || data.Year || "";
    const payment = data.paymentStatus || data.PaymentStatus || "Not Paid";
    
    if (!email || !email.includes("@")) {
      logToSheet("ERROR", "Registration failed: Invalid or Missing Email", { email, data });
      return respond({ result: "error", message: "Valid Email is required" });
    }

    // Duplicate Check
    const values = sheet.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
      if (values[i][3] && values[i][3].toString().toLowerCase() === email.toLowerCase()) {
        return respond({ result: "error", message: "Email already registered" });
      }
    }
    
    // Generate ID and Save
    const participantId = "AXION2K26-" + (sheet.getLastRow()).toString().padStart(3, '0');
    sheet.appendRow([new Date(), participantId, name, email, phone, college, dept, year, payment]);
    
    // Send Email
    sendConfirmationEmail(email, name, participantId);
    
    logToSheet("SUCCESS", "New Registration", { id: participantId, email: email });
    return respond({ result: "success", participantId: participantId });
    
  } catch (err) {
    logToSheet("CRITICAL", "doPost Error", err.toString());
    return respond({ result: "error", message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

function sendConfirmationEmail(toEmail, recipientName, participantId) {
  if (!toEmail || typeof toEmail !== 'string' || !toEmail.includes('@')) {
    logToSheet("ERROR", "sendConfirmationEmail aborted: Invalid recipient", { to: toEmail });
    return false;
  }
  try {
    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + participantId;
    const subject = "AXION 2K26 - Registration Confirmation";
    
    const htmlBody = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #6d28d9 0%, #3b82f6 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; letter-spacing: -1px;">AXION 2K26</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px; text-transform: uppercase; tracking: 2px;">Registration Confirmed</p>
        </div>
        <div style="padding: 30px; color: #374151;">
          <p style="font-size: 16px; line-height: 1.5;">Dear <strong>${recipientName}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.5;">Your registration for AXION 2K26 is successful!</p>
          
          <div style="background-color: #f9fafb; border: 1px dashed #d1d5db; border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Your Participant ID</p>
            <p style="margin: 0; font-size: 32px; font-weight: 900; color: #111827; font-family: monospace;">${participantId}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <img src="${qrUrl}" alt="QR Code" style="width: 150px; height: 150px; border: 4px solid #f3f4f6; border-radius: 8px;" />
            <p style="font-size: 11px; color: #9ca3af; margin-top: 10px;">Scan this code at the entry gate</p>
          </div>
          
          <div style="border-top: 1px solid #f3f4f6; pt: 20px; margin-top: 20px;">
            <p style="font-size: 14px; color: #4b5563;"><strong>Event Dates:</strong> 25–27 March 2026</p>
            <p style="font-size: 14px; color: #4b5563;"><strong>Venue:</strong> VVCET Campus</p>
          </div>
        </div>
        <div style="background-color: #fef2f2; padding: 15px; text-align: center; border-top: 1px solid #fee2e2;">
          <p style="margin: 0; font-size: 12px; color: #b91c1c; font-weight: bold;">Please keep this email safe. This ID is mandatory for entry.</p>
        </div>
      </div>
    `;

    GmailApp.sendEmail(toEmail, subject, "", {
      htmlBody: htmlBody,
      name: "AXION 2K26 Team"
    });
    
    return true;
  } catch (e) {
    logToSheet("ERROR", "Email Send Failed", { to: toEmail, error: e.toString() });
    return false;
  }
}

function logToSheet(type, message, details) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName("Logs");
    if (sheet) {
      sheet.appendRow([new Date(), type, message, JSON.stringify(details)]);
    }
  } catch (e) {}
}

function respond(data, callback) {
  const result = JSON.stringify(data);
  if (callback) return ContentService.createTextOutput(callback + "(" + result + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}
