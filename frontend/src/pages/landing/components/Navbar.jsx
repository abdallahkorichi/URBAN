import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full px-8 py-6 flex justify-between items-center bg-base-100/80 backdrop-blur-md shadow-sm fixed top-0 z-50 border-b border-base-content/5">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-base-content/10 group-hover:border-primary/30 transition-colors">
          <img 
            src="/assets/logo.png" 
            alt="KOUTHBAN Logo" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <span className="text-2xl font-black text-base-content tracking-tight">
           KOUTHBAN
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-[#3E2F1C] hover:text-[#9C7B52] transition font-medium"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-[#C2A97F] text-white px-5 py-2 rounded-xl hover:bg-[#9C7B52] transition shadow-md"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
