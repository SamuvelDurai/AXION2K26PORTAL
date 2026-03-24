import { motion } from 'motion/react';
import { CheckCircle2, Coffee, Zap, Globe, Rocket } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Participation Certificate",
      desc: "Valuable addition to your professional portfolio."
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Free Food & Refreshments",
      desc: "Stay energized throughout the intensive sessions."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Hands-on Experience",
      desc: "Work with real hardware components and AI kits."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Networking",
      desc: "Meet innovators from across the country."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Tech Challenges",
      desc: "Win exciting prizes in real-time competitions."
    }
  ];

  return (
    <section className="py-24 px-4 bg-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Why Join <span className="text-gradient">AXION?</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center group"
            >
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center mb-6 text-brand-blue group-hover:bg-brand-blue/20 group-hover:text-white transition-all duration-300">
                {b.icon}
              </div>
              <h3 className="font-bold mb-2 text-sm md:text-base">{b.title}</h3>
              <p className="text-xs text-gray-500">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Award({ className }: { className?: string }) {
  return <AwardIcon className={className} />;
}

import { Award as AwardIcon } from 'lucide-react';
