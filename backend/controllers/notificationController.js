import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Ensure the notification belongs to the actual user trying to read it
    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this notification" });
    }

    notification.isRead = true;
    const updatedNotification = await notification.save();
    
    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};
