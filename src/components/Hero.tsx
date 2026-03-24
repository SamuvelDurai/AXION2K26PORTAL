import { motion } from 'motion/react';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import Countdown from './Countdown';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block py-1 px-4 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-neon text-sm font-medium mb-6"
        >
          Vidyaa Vikas College of Engineering and Technology Presents
        </motion.span>
        
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4">
          AXION <span className="text-gradient">2K26</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          Three-Day Immersive Hardware & Intelligence Workshop. 
          Shape the future of technology with hands-on innovation.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12 text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-blue" />
            <span>25–27 March 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-purple" />
            <span>Tiruchengode, TN</span>
          </div>
        </div>

        <Countdown />

        <div className="mt-12">
          <a
            href="#register"
            className="inline-block bg-gradient-to-r from-brand-purple to-brand-blue hover:scale-105 transition-transform px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(109,40,217,0.4)]"
          >
            Register Now
          </a>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
