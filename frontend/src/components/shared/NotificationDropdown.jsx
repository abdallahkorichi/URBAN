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
        className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full transition-colors focus:outline-none"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 lg:w-96 rounded-2xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-white">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell size={32} className="mx-auto text-gray-200 mb-3" />
                <p className="text-sm font-medium">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    onClick={() => handleMarkAsRead(notification._id, notification.isRead)}
                    className={`p-4 hover:bg-gray-50 transition cursor-pointer flex gap-4 ${
                      !notification.isRead ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <div className="shrink-0 pt-1">
                      {notification.isRead ? (
                        <Check size={18} className="text-gray-400" />
                      ) : (
                        <div className="h-2.5 w-2.5 mt-1 rounded-full bg-blue-500 shadow-sm" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm ${notification.isRead ? "text-gray-600 font-medium" : "text-gray-900 font-bold"}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center text-xs text-gray-400 font-medium">
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
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center">
             <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Office Communications</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
