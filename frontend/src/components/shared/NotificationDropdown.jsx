import { useState, useEffect, useRef } from "react";
import { Bell, Check, Clock } from "lucide-react";
import api from "../../services/api";

function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notifications on mount
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n) => !n.isRead).length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id, isCurrentlyRead) => {
    if (isCurrentlyRead) return; // Already read, do nothing

    try {
      await api.put(`/notifications/${id}/read`);
      // Update local state to reflect the change visually instantly
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n._id);
    if(unreadIds.length === 0) return;

    try {
      await Promise.all(unreadIds.map(id => api.put(`/notifications/${id}/read`)));
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
       console.error("Failed to mark all as read", error);
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-base-content/50 hover:bg-base-content/5 hover:text-base-content rounded-xl transition-all focus:outline-none"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white shadow-sm ring-2 ring-base-100">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 lg:w-96 rounded-2xl bg-base-100 shadow-xl border border-base-content/10 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-base-content/5 bg-base-200/50">
            <h3 className="font-bold text-base-content">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-semibold text-primary hover:text-primary transition"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-base-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-base-content/40">
                <Bell size={32} className="mx-auto text-base-content/20 mb-3" />
                <p className="text-sm font-medium">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-base-content/5">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    onClick={() => handleMarkAsRead(notification._id, notification.isRead)}
                    className={`p-4 hover:bg-base-200/50 transition cursor-pointer flex gap-4 ${
                      !notification.isRead ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="shrink-0 pt-1">
                      {notification.isRead ? (
                        <Check size={18} className="text-base-content/30" />
                      ) : (
                        <div className="h-2.5 w-2.5 mt-1 rounded-full bg-primary shadow-sm" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm ${notification.isRead ? "text-base-content/70 font-medium" : "text-base-content font-bold"}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center text-xs text-base-content/40 font-medium">
                        <Clock size={12} className="mr-1" />
                        {formatTime(notification.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer just for aesthetic polish */}
          <div className="px-4 py-2 border-t border-base-content/5 bg-base-200/50 text-center">
             <p className="text-[10px] text-base-content/40 font-semibold uppercase tracking-widest">Office Communications</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
