import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Mail, ArrowRight } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-content/5 pt-20 pb-10 relative overflow-hidden">
      <div className="urban-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-base-content/10">
                <img src="/assets/logo.png" alt="KHOUTHBAN Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-black text-base-content tracking-tight">
                Desert <span className="text-primary">Urban</span>
              </span>
            </Link>
            <p className="text-base-content/60 text-sm leading-relaxed max-w-md font-medium">
              A premium digital urban planning and architectural coordination platform exclusively designed for arid and desert environments. Elevate your blueprints from the sand up.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base-content mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-base-content/40 cursor-not-allowed">
              <li><span>About Us</span></li>
              <li><span>For Architects</span></li>
              <li><span>For Offices</span></li>
              <li><span>Urban Standards</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base-content mb-6">Stay Connected</h4>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-base-content/30 shadow-sm border border-base-content/5 cursor-not-allowed"><Twitter size={18} /></span>
              <span className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-base-content/30 shadow-sm border border-base-content/5 cursor-not-allowed"><Linkedin size={18} /></span>
              <span className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-base-content/30 shadow-sm border border-base-content/5 cursor-not-allowed"><Instagram size={18} /></span>
            </div>
            <div className="relative group">
              <input disabled type="email" placeholder="Subscribe to newsletter" className="w-full bg-base-200 text-sm p-4 rounded-xl border border-base-content/10 focus:outline-none transition-colors opacity-50 cursor-not-allowed" />
              <button disabled className="absolute right-2 top-2 p-2 bg-primary/50 text-base-100 rounded-lg cursor-not-allowed"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-base-content/10 text-xs font-semibold text-base-content/40 uppercase tracking-widest gap-4">
          <p>© {new Date().getFullYear()} KHOUTHBAN Platform. All rights reserved.</p>
          <div className="flex gap-8 text-base-content/40 cursor-not-allowed">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
