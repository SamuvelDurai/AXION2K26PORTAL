import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Shield, Globe, Cpu } from 'lucide-react';

interface HomeProps {
  onExplore: () => void;
}

export default function Home({ onExplore }: HomeProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-purple/30 text-brand-purple text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Sparkles className="w-4 h-4" />
          The Future of Learning is Here
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
        >
          AXION <span className="text-brand-blue">2K26</span><br />
          <span className="text-gradient">WORKSHOP PORTAL</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg mb-12 leading-relaxed"
        >
          Join the most elite technical workshops designed to bridge the gap between 
          academic learning and industry excellence. Master the future, today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onExplore}
            className="px-10 py-5 bg-white text-black rounded-2xl font-bold flex items-center gap-3 hover:bg-brand-purple hover:text-white transition-all duration-500 group shadow-2xl shadow-brand-purple/20"
          >
            Explore Workshops
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 glass border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all duration-500">
            View Schedule
          </button>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {[
          { icon: Zap, title: 'Expert Led', desc: 'Learn from industry veterans and academic pioneers.' },
          { icon: Shield, title: 'Certified', desc: 'Get globally recognized certificates upon completion.' },
          { icon: Globe, title: 'Networking', desc: 'Connect with peers and mentors from across the globe.' }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5 hover:border-brand-purple/30 transition-all group"
          >
            <div className="w-14 h-14 bg-brand-purple/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-purple/20 transition-colors">
              <feature.icon className="w-7 h-7 text-brand-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="glass rounded-[40px] p-12 border border-white/5 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Workshops', val: '12+' },
            { label: 'Participants', val: '1.2K+' },
            { label: 'Speakers', val: '20+' },
            { label: 'Success Rate', val: '98%' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-black text-brand-blue mb-2">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
