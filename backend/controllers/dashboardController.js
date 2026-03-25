import Project from "../models/Project.js";
import User from "../models/User.js";

// Get dashboard statistics (office only)
export const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const pendingProjects = await Project.countDocuments({ status: "pending" });
    const approvedProjects = await Project.countDocuments({
      status: "approved",
    });
    const rejectedProjects = await Project.countDocuments({
      status: "rejected",
    });

    const totalArchitects = await User.countDocuments({ role: "architect" });
    res.json({
      totalProjects,
      pendingProjects,
      approvedProjects,
      rejectedProjects,
      totalArchitects,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};
