import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Folder,
  PlusSquare,
  Settings,
} from "lucide-react";
import Logo from "../components/shared/Logo";
import NotificationDropdown from "../components/shared/NotificationDropdown";
import AvatarDropdown from "../components/shared/AvatarDropdown";
import ThemeToggle from "../components/shared/ThemeToggle";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isArchitect = user?.role === "architect";

  const menuItems = isArchitect
    ? [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          path: "/architect/dashboard",
        },
        {
          name: "My Projects",
          icon: Folder,
          path: "/architect/projects",
        },
        {
          name: "Submit Project",
          icon: PlusSquare,
          path: "/architect/submit",
        },
        {
          name: "Settings",
          icon: Settings,
          fake: true,
        },
      ]
    : [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          path: "/office/dashboard",
        },
        {
          name: "All Projects",
          icon: Folder,
          path: "/office/projects",
        },
        {
          name: "Settings",
          icon: Settings,
          fake: true,
        },
      ];

  return (
    <div className="flex min-h-screen bg-base-200 relative overflow-hidden">
      {/* ================= Sidebar ================= */}
      <div
        className={`glass-card rounded-none border-y-0 border-l-0 relative z-20 transition-all duration-300 flex flex-col ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-base-content/5">
          {!collapsed && <Logo />}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl text-base-content/50 hover:text-primary hover:bg-base-content/5 transition-all mx-auto"
          >
            {collapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
        </div>

        <ul className="flex-1 mt-6 space-y-2 px-4 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            if (item.fake) {
              return (
                <li key={index}>
                  <button
                    onClick={() => alert("Coming soon")}
                    className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-200 font-bold group text-base-content/60 hover:text-base-content hover:bg-base-100/50 ${
                      collapsed ? "justify-center px-0" : ""
                    }`}
                  >
                    <Icon size={22} className="group-hover:scale-110 transition-transform" />
                    {!collapsed && <span>{item.name}</span>}
                  </button>
                </li>
              );
            }

            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 font-bold group ${
                      isActive
                        ? "bg-primary text-primary-content shadow-lg shadow-primary/20 scale-100"
                        : "text-base-content/60 hover:text-base-content hover:bg-base-100/50"
                    } ${collapsed ? "justify-center px-0" : ""}`
                  }
                >
                  <Icon size={22} className="group-hover:scale-110 transition-transform" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col relative z-10 w-full">
        {/* Header */}
        <header className="glass-card rounded-none border-x-0 border-t-0 px-8 py-5 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-xl font-black text-base-content tracking-tight">
            {isArchitect ? "Architect Dashboard" : "Quality Assurance Office"}
          </h1>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <div className="w-px h-6 bg-base-content/10 hidden sm:block" />
            <NotificationDropdown />
            <AvatarDropdown />
          </div>
        </header>

        {/* 🔥 THIS IS WHAT RENDERS YOUR PAGES */}
        <main className="p-8 flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;