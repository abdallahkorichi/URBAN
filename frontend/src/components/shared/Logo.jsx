import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-base-content/10 group-hover:border-primary/30 transition-colors">
        <img
          src="/assets/logo.png"
          alt="Desert Urban Logo"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="text-xl font-black text-base-content tracking-tight">
        KOUTHBAN
      </span>
    </Link>
  );
}

export default Logo;
