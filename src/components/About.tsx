import { motion } from 'motion/react';
import { Cpu, Lightbulb, Users, Award } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Hands-on Sessions",
      desc: "Direct experience with cutting-edge hardware and AI modules."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation Hub",
      desc: "Turn your ideas into functional prototypes with expert guidance."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Networking",
      desc: "Connect with like-minded innovators and industry mentors."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certification",
      desc: "Receive a prestigious certificate recognized by major tech firms."
    }
  ];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Beyond the <span className="text-gradient">Screen</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              AXION 2K26 is not just a workshop; it's a launchpad for the next generation of engineers. 
              Organized by the Department of ECE at Vidyaa Vikas College of Engineering and Technology, 
              this three-day immersive event focuses on the intersection of hardware design and artificial intelligence.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-2xl">
                <h4 className="text-2xl font-bold text-brand-blue">3 Days</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Intensive Learning</p>
              </div>
              <div className="glass p-4 rounded-2xl">
                <h4 className="text-2xl font-bold text-brand-purple">10+ Projects</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Hands-on Tasks</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-3xl hover:border-brand-purple/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-4 text-brand-neon group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
