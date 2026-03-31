import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";
import { getFileUrl } from "../../services/api";

function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center overflow-hidden">
          {user?.profilePic ? (
            <img src={getFileUrl(user.profilePic)} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <User size={18} />
          )}
        </div>
        <span className="font-medium hidden sm:block">
          {user?.name}
        </span>
        <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-base-100 shadow-xl rounded-xl border border-base-content/10 z-50 overflow-hidden">
          <button
            onClick={() => {
              navigate(`/${user.role}/profile`);
              setOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-base-content font-bold hover:bg-base-200 transition-colors"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-error font-bold hover:bg-error/10 hover:text-error flex items-center gap-2 transition-colors border-t border-base-content/5"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;