import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name || "");
      if (parsedUser.profilePic) {
        setPreview(`http://localhost:5000/${parsedUser.profilePic}`);
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    if (name) formData.append("name", name);
    if (password) formData.append("password", password);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const res = await api.put("/users/profile", formData);
      const updatedUser = res.data;

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setPassword("");
      toast.success("Profile updated perfectly! ✨");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (!user) return <div className="p-8">Loading Profile...</div>;

  return (
    <div className="relative max-w-2xl mx-auto mt-6">
      <div className="glass-card rounded-[2.5rem] relative z-10 overflow-hidden">
        <div className="urban-pattern absolute inset-0 opacity-5 dark:opacity-10 mix-blend-overlay pointer-events-none z-0" />
        
        <div className="p-10 relative z-10">
          <h2 className="text-3xl font-black mb-10 text-base-content">Your Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 bg-base-200 flex items-center justify-center shadow-xl">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-base-content/20">
                   <div className="text-4xl font-black uppercase">{user.name?.charAt(0) || "U"}</div>
                </div>
              )}
            </div>
            
            <label className="btn btn-sm btn-outline btn-primary rounded-full px-6">
              Change Architectural Identity
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="grid gap-6">
            {/* Username Field */}
            <div className="group">
              <label className="block text-[10px] font-black tracking-widest text-base-content/40 uppercase mb-2 group-focus-within:text-primary transition-colors">
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-base-200/50 border-base-content/10 border-2 p-4 rounded-2xl focus:border-primary focus:bg-base-100 transition-all outline-none font-bold text-base-content"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-[10px] font-black tracking-widest text-base-content/40 uppercase mb-2 group-focus-within:text-primary transition-colors">
                New Security Key <span className="opacity-40 font-normal normal-case">(leave blank to keep current)</span>
              </label>
              <input
                type="password"
                className="w-full bg-base-200/50 border-base-content/10 border-2 p-4 rounded-2xl focus:border-primary focus:bg-base-100 transition-all outline-none font-bold text-base-content"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Update Credentials
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
