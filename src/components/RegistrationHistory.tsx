import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Loader2, RefreshCw, User, Mail, Hash, School, AlertCircle } from 'lucide-react';

// IMPORTANT: Replace this with your actual Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1H2iMeyOWVXbJPj0Ydg0veb6WXtcn_G4pEIJjxajIzYn8s0ZN6TifajqCqjGOa78d/exec';

interface Participant {
  timestamp: string;
  participantid: string;
  fullname: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  paymentstatus: string;
}

export default function RegistrationHistory() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (SCRIPT_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT')) {
      setError('CRITICAL: You are using the EXAMPLE URL. Replace SCRIPT_URL with YOUR OWN Web App URL.');
      setLoading(false);
      setRefreshing(false);
      return;
    }

    setRefreshing(true);
    setError(null);
    try {
      // JSONP Fetcher
      const jsonp = (url: string): Promise<any> => {
        return new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => reject(new Error('Connection timed out.')), 10000);
          const callbackName = 'jsonp_' + Math.round(100000 * Math.random());
          (window as any)[callbackName] = (data: any) => {
            clearTimeout(timeoutId);
            delete (window as any)[callbackName];
            document.body.removeChild(script);
            resolve(data);
          };
          const script = document.createElement('script');
          const sep = url.indexOf('?') >= 0 ? '&' : '?';
          script.src = `${url}${sep}callback=${callbackName}&t=${Date.now()}`;
          script.onerror = () => {
            clearTimeout(timeoutId);
            delete (window as any)[callbackName];
            document.body.removeChild(script);
            reject(new Error('JSONP failed. Check script deployment.'));
          };
          document.body.appendChild(script);
        });
      };

      const data = await jsonp(SCRIPT_URL);
      if (data && data.result === 'error') throw new Error(data.message);
      setParticipants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Connection failed.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredParticipants = participants.filter(p => 
    p.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.participantid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Registration History</h2>
          <p className="text-gray-400 text-sm">Monitor and manage workshop participants</p>
        </div>
        <div className="flex items-center gap-3">
          {error && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-xs border border-red-500/20">
              <AlertCircle className="w-4 h-4" />
              <span>Connection Issue</span>
            </div>
          )}
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2 glass px-6 py-3 rounded-2xl hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-3xl border-red-500/20 bg-red-500/5"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-red-400">Connection Failed</h3>
              <p className="text-sm text-gray-400">
                The app couldn't connect to your Google Sheet. This is usually due to one of these reasons:
              </p>
              <ul className="text-xs text-gray-500 space-y-1 list-disc ml-4">
                <li>The <b>SCRIPT_URL</b> in the code doesn't match your Web App URL.</li>
                <li>The script is not deployed as <b>"Anyone"</b> (it might be set to "Only myself").</li>
                <li>You haven't clicked <b>"New Version"</b> when redeploying.</li>
              </ul>
              <div className="pt-2 flex gap-3">
                <a 
                  href={SCRIPT_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                >
                  Test URL in New Tab
                </a>
                <button 
                  onClick={fetchData}
                  className="text-xs bg-brand-purple/20 text-brand-neon px-4 py-2 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="relative w-full md:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search by ID, Name, Email or College..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-brand-purple/50 transition-colors"
        />
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Participant</th>
                <th className="px-6 py-4 font-medium">Details</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-purple mb-2" />
                    <p className="text-gray-500">Loading history...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-red-400 mb-4 flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center gap-2 font-bold">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                      </div>
                      <p className="text-xs text-gray-500 max-w-md">
                        This is usually a CORS issue. Ensure your Apps Script is deployed as <b>"Anyone"</b> and try opening the URL in a new tab first.
                      </p>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <button 
                        onClick={fetchData}
                        className="bg-brand-purple/20 text-brand-neon px-6 py-2 rounded-xl text-sm font-bold hover:bg-brand-purple/30 transition-all"
                      >
                        Try again
                      </button>
                      <a 
                        href={SCRIPT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/5 text-gray-400 px-6 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-all"
                      >
                        Open Backend URL
                      </a>
                    </div>
                  </td>
                </tr>
              ) : filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((p, i) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={p.participantid}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <span className="text-brand-neon font-mono font-bold">{p.participantid}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-200">{p.fullname || 'Unknown Participant'}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {p.email || 'No Email'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{p.college}</div>
                      <div className="text-xs text-gray-500">{p.department} • {p.year}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.paymentstatus === 'Paid' 
                          ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {p.paymentstatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(p.timestamp).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-xs text-gray-600 text-center">
        Total Registrations: {filteredParticipants.length}
      </div>
    </div>
  );
}
