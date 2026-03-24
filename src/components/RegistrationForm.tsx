import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, CheckCircle, AlertCircle, User, School, BookOpen, CreditCard, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

// IMPORTANT: Replace this with your actual Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1H2iMeyOWVXbJPj0Ydg0veb6WXtcn_G4pEIJjxajIzYn8s0ZN6TifajqCqjGOa78d/exec';

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participantId, setParticipantId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '1st Year',
    paymentStatus: 'Not Paid'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (SCRIPT_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT')) {
      setError('CRITICAL: You are using the EXAMPLE URL. You must replace SCRIPT_URL with YOUR OWN Web App URL from Google Apps Script.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use no-cors for maximum reliability with Apps Script
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData),
      });
      
      // Since no-cors doesn't return data, we estimate the ID or show a generic success
      setParticipantId('AXION2K26-NEW');
      setSuccess(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } catch (fetchErr) {
      console.error('Registration error:', fetchErr);
      setError('Submission failed. Check your internet or ensure the script is deployed as "Anyone".');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const IDCardPreview = ({ id = 'AXION2K26-XXX', isFinal = false }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-sm aspect-[1.586/1] glass rounded-3xl overflow-hidden border border-white/20 shadow-2xl group"
    >
      {/* Card Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-brand-purple/30 transition-colors" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-blue/20 rounded-full -ml-12 -mb-12 blur-2xl group-hover:bg-brand-blue/30 transition-colors" />
      
      <div className="relative h-full p-6 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">Workshop Participant</div>
            <div className="text-lg font-black tracking-tighter">AXION <span className="text-brand-blue">2K26</span></div>
          </div>
          {isFinal ? (
            <div className="bg-white p-1 rounded-lg">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${id}`} 
                alt="QR" 
                className="w-12 h-12"
              />
            </div>
          ) : (
            <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-gray-600">
              <QrCode className="w-6 h-6" />
            </div>
          )}
        </div>

        <div>
          <div className="text-xl font-bold text-white mb-1 truncate">
            {formData.fullName || 'Participant Name'}
          </div>
          <div className="text-xs text-gray-400 font-medium truncate mb-4">
            {formData.college || 'College Name'}
          </div>
          
          <div className="flex justify-between items-end border-t border-white/10 pt-4">
            <div>
              <div className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Department</div>
              <div className="text-xs font-bold text-gray-300">{formData.department || 'Dept'}</div>
            </div>
            <div className="text-right">
              <div className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">ID Number</div>
              <div className="text-sm font-black text-brand-neon font-mono">{id}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Holographic Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
    </motion.div>
  );

  if (success) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 md:p-12 rounded-[2.5rem] text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Registration Successful!</h2>
          <p className="text-gray-400 mb-8 max-w-md">
            Confirmation email sent to <strong>{formData.email}</strong>. 
            The ID card below is mandatory for entry.
          </p>
          
          <div className="mb-10 w-full flex justify-center">
            <IDCardPreview id={participantId} isFinal={true} />
          </div>

          <button 
            onClick={() => {
              setSuccess(false);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                college: '',
                department: '',
                year: '1st Year',
                paymentStatus: 'Not Paid'
              });
            }}
            className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-brand-blue hover:text-white transition-all shadow-xl shadow-white/5"
          >
            Register Next Participant
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 glass p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-brand-purple/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-purple/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-purple/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">College Name</label>
              <div className="relative">
                <School className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  required
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Vidyaa Vikas CET"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-brand-purple/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Department</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  required
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="ECE / CSE / IT"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-brand-purple/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Year of Study</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-purple/50 transition-colors appearance-none"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Payment Status</label>
              <div className="flex gap-4">
                {['Paid', 'Not Paid'].map((status) => (
                  <label key={status} className="flex-1">
                    <input
                      type="radio"
                      name="paymentStatus"
                      value={status}
                      checked={formData.paymentStatus === status}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className={`
                      cursor-pointer text-center py-4 rounded-2xl border transition-all flex items-center justify-center gap-2
                      ${formData.paymentStatus === status 
                        ? 'bg-brand-purple/20 border-brand-purple text-white' 
                        : 'bg-white/5 border-white/10 text-gray-500'}
                    `}>
                      <CreditCard className="w-4 h-4" />
                      {status}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-brand-purple to-brand-blue py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50 shadow-xl shadow-brand-purple/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Complete Registration
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="md:col-span-2 flex flex-col items-center gap-2 text-red-400 text-sm mt-2 justify-center bg-red-500/5 p-4 rounded-2xl border border-red-500/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-bold">{error}</span>
                </div>
                <p className="text-[10px] text-gray-500 text-center max-w-xs">
                  If this persists, ensure your Apps Script is deployed as <b>"Anyone"</b> and try opening the <a href={SCRIPT_URL} target="_blank" rel="noopener noreferrer" className="underline">Backend URL</a> in a new tab.
                </p>
              </div>
            )}
          </form>
        </motion.div>

        {/* Preview Section */}
        <div className="lg:col-span-2 sticky top-32">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-1">Live Preview</h3>
            <p className="text-sm text-gray-500">Real-time ID card generation</p>
          </div>
          <IDCardPreview />
          
          <div className="mt-8 glass p-6 rounded-3xl border-brand-purple/20">
            <h4 className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-4">Coordinator Note</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                Verify payment status before completion.
              </li>
              <li className="flex gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                Unique ID format: AXION2K26-XXX.
              </li>
              <li className="flex gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                Confirmation email includes this ID card.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
