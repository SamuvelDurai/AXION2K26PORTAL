# AXION 2K26 - Deployment Instructions

Follow these steps to set up your workshop registration portal.

## 1. Google Sheets Setup
1. Create a new Google Sheet.
2. Name the first sheet tab **"Registrations"**.
3. In the first row (Headers), add the following columns:
   - `Timestamp`
   - `Participant ID`
   - `Full Name`
   - `Email`
   - `Phone`
   - `College`
   - `Department`
   - `Year`
   - `Payment Status`

## 2. Google Apps Script Setup
1. In your Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any existing code and paste the content from the `Code.gs` file provided in this project.
3. Click the **Save** icon and name the project "AXION 2K26 Backend".
4. Click **Deploy** > **New Deployment**.
5. Select **Web App** as the type.
6. Set **Execute as** to "Me".
7. Set **Who has access** to "Anyone".
8. Click **Deploy**. You may need to authorize the script with your Google account.
9. **Copy the Web App URL** provided at the end.

## 3. Connect Frontend to Backend
1. Open `src/components/RegistrationForm.tsx` in this project.
2. Locate the `SCRIPT_URL` constant at the top of the file.
3. Replace the placeholder URL with your **Web App URL** from step 2.9.
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec';
   ```

## 4. Testing
1. Run your React app.
2. Fill out the registration form.
3. Upon submission:
   - Data will appear in your Google Sheet.
   - A unique ID (AXION2026-001, etc.) will be generated.
   - A confirmation email with a QR code will be sent to the registered email address.

## Notes
- The QR code is generated using the `api.qrserver.com` service.
- Ensure your Google account has enough daily email quota (Consumer accounts: 100/day, Workspace: 1500/day).
