import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, History, LogOut, LayoutDashboard } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import RegistrationHistory from './components/RegistrationHistory';

export default function App() {
  const [activeTab, setActiveTab] = useState<'register' | 'history'>('register');

  return (
    <div className="animated-gradient min-h-screen selection:bg-brand-purple/30 selection:text-brand-neon">
      {/* Sidebar / Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tighter leading-none">
                AXION <span className="text-brand-blue">2K26</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                Coordinator Portal
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('register')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'register' 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden md:inline">Register Participant</span>
              <span className="md:hidden">Register</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'history' 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden md:inline">Registration History</span>
              <span className="md:hidden">History</span>
            </button>
          </div>

          <button className="hidden md:flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'register' ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">New Registration</h1>
                <p className="text-gray-500">Enter participant details to generate ID and send confirmation.</p>
              </div>
              <RegistrationForm />
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Registration History</h1>
                <p className="text-gray-500">Manage and search through all registered participants.</p>
              </div>
              <RegistrationHistory />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 uppercase tracking-[0.2em] pointer-events-none">
        AXION 2K26 • Coordinator Dashboard • VVCET
      </div>
    </div>
  );
}
