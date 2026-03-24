import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-black mb-4">AXION <span className="text-brand-blue">2K26</span></h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering the next generation of engineers through immersive hardware and intelligence workshops. 
              Join us at Vidyaa Vikas College of Engineering and Technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-purple" />
                <span>axion2k26@vvcet.ac.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-purple" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-purple" />
                <span>Tiruchengode, Namakkal, TN</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Follow the Innovation</h4>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-purple/20 hover:text-brand-neon transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2026 Vidyaa Vikas College of Engineering and Technology. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
