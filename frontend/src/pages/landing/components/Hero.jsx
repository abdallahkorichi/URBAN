import { Link } from "react-router-dom";
import { Map, ShieldCheck } from "lucide-react";

function Hero() {
  return (
    <section className="bg-base-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 items-center gap-12">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3E2F1C] leading-tight">
            Smart Urban Planning
            <br />
            For Arid Regions
          </h1>

          <p className="mt-6 text-lg text-[#5C4B37] max-w-xl">
            A structured digital platform connecting architects and studies
            offices to simplify KHOUTHBAN project submission, review, and
            regulatory compliance.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-5">
            <Link
              to="/register"
              className="bg-[#C2A97F] text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-[#9C7B52] transition shadow-lg"
            >
              Submit Your Project
            </Link>

            <Link
              to="/login"
              className="border-2 border-[#C2A97F] px-8 py-4 rounded-2xl text-lg font-medium text-[#3E2F1C] hover:bg-[#E8DFD0] transition"
            >
              Office Login
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE (MACRO URBAN GRID DATA VIZ) */}
        <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto flex items-center justify-center mt-16 md:mt-0">
          
          {/* Main Glass Platform */}
          <div className="bg-white/90 w-full rounded-[2.5rem] shadow-2xl border border-[#E8DFD0] overflow-hidden relative z-10 backdrop-blur-xl p-8 transition-transform hover:-translate-y-2 duration-500">
            
            {/* Window Controls & Title */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-black text-[#3E2F1C] tracking-tight text-xl">Macro Urban Grid</h3>
                <p className="text-[10px] text-[#9C7B52] font-black uppercase tracking-widest mt-1">Sector 4 • Arid Zone Development</p>
              </div>
              <div className="flex gap-1.5">
                 <span className="w-2.5 h-2.5 rounded-full bg-[#E8DFD0]"></span>
                 <span className="w-2.5 h-2.5 rounded-full bg-[#D8CCB8]"></span>
                 <span className="w-2.5 h-2.5 rounded-full bg-[#C2A97F] animate-pulse"></span>
              </div>
            </div>

            {/* Glowing City Grid SVG Container */}
            <div className="relative w-full aspect-[4/3] bg-[#F5EFE6]/50 rounded-3xl border border-[#E8DFD0] overflow-hidden shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] group">
               {/* Pattern Overlay */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3E2F1C 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
               
               <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full drop-shadow-sm">
                 {/* Geometric City Blocks */}
                 <rect x="40" y="40" width="140" height="100" rx="4" fill="white" stroke="#D8CCB8" strokeWidth="2" className="transition-all duration-700 group-hover:fill-[#C2A97F]/10" />
                 <rect x="200" y="40" width="160" height="60" rx="4" fill="white" stroke="#D8CCB8" strokeWidth="2" className="transition-all duration-700 group-hover:fill-[#C2A97F]/10" />
                 
                 <rect x="40" y="160" width="100" height="100" rx="4" fill="white" stroke="#9C7B52" strokeWidth="2" />
                 <rect x="160" y="120" width="200" height="140" rx="4" fill="white" stroke="#C2A97F" strokeWidth="2" />
                 
                 {/* Zoning Highlights (Commercial/Green) */}
                 <rect x="50" y="210" width="40" height="40" rx="2" fill="#8C6E4F" opacity="0.1" />
                 <rect x="280" y="140" width="60" height="60" rx="2" fill="#E8DFD0" opacity="0.5" />
                 
                 {/* Connection Nodes (Infrastructure Hubs) */}
                 <circle cx="110" cy="90" r="5" fill="#8C6E4F" className="animate-pulse" />
                 <circle cx="280" cy="70" r="5" fill="#8C6E4F" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                 <circle cx="260" cy="190" r="5" fill="#8C6E4F" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                 
                 {/* Core Infrastructure Path (Roads/Transit) */}
                 <path d="M 0 120 Q 150 150 150 300" fill="none" stroke="#C2A97F" strokeWidth="4" strokeDasharray="8 6" className="opacity-60" />
                 <path d="M 400 60 Q 300 100 200 300" fill="none" stroke="#9C7B52" strokeWidth="3" opacity="0.4" />
               </svg>

               {/* Fade out at bottom edge */}
               <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F5EFE6] to-transparent pointer-events-none" />
            </div>

            {/* Zoning Breakdown Bars */}
            <div className="mt-8 space-y-4">
               <div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#9C7B52] mb-2">
                   <span>Residential Density</span>
                   <span className="text-[#3E2F1C]">45%</span>
                 </div>
                 <div className="h-2 w-full bg-[#E8DFD0] rounded-full overflow-hidden">
                   <div className="h-full bg-[#C2A97F] w-[45%] rounded-full shadow-inner" />
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#9C7B52] mb-2">
                   <span>Commercial & Infrastructure</span>
                   <span className="text-[#3E2F1C]">35%</span>
                 </div>
                 <div className="h-2 w-full bg-[#E8DFD0] rounded-full overflow-hidden">
                   <div className="h-full bg-[#8C6E4F] w-[35%] rounded-full shadow-inner" />
                 </div>
               </div>
            </div>
          </div>

          {/* Floating Widget 1: Map Marker */}
          <div className="absolute -right-4 md:-right-8 top-12 bg-white p-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-[#E8DFD0] z-20 flex items-center gap-4 animate-bounce hover:scale-105 transition-transform" style={{ animationDuration: '4s' }}>
            <div className="w-12 h-12 rounded-full bg-[#F5EFE6] flex items-center justify-center">
              <Map size={24} className="text-[#8C6E4F]" />
            </div>
            <div>
              <p className="text-sm font-black text-[#3E2F1C]">Topography Scanned</p>
              <p className="text-[10px] font-bold text-[#9C7B52] uppercase tracking-widest">Terrain: Arid Class B</p>
            </div>
          </div>

          {/* Floating Widget 2: Shield/Compliance */}
          <div className="absolute -left-4 md:-left-8 bottom-16 bg-white p-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-[#E8DFD0] z-20 flex items-center gap-4 animate-bounce hover:scale-105 transition-transform" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <div className="w-12 h-12 rounded-full bg-[#F5EFE6] flex items-center justify-center">
              <ShieldCheck size={24} className="text-[#8C6E4F]" />
            </div>
            <div>
              <p className="text-sm font-black text-[#3E2F1C]">City Standards</p>
              <p className="text-[10px] font-bold text-[#9C7B52] uppercase tracking-widest">100% Alignment</p>
            </div>
          </div>

          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#C2A97F]/10 rounded-[4rem] blur-[60px] -z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
