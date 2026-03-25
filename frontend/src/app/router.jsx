import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ArchitectDashboard from "../pages/architect/ArchitectDashboard";
import MyProjects from "../pages/architect/MyProjects";
import SubmitProject from "../pages/architect/SubmitProject";
import Profile from "../components/shared/Profile";

import OfficeDashboard from "../pages/office/OfficeDashboard";
import AllProjects from "../pages/office/AllProjects";

const router = createBrowserRouter([
  // Public
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // Architect
  {
    path: "/architect",
    element: (
      <ProtectedRoute role="architect">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <ArchitectDashboard /> },
      { path: "projects", element: <MyProjects /> },
      { path: "submit", element: <SubmitProject /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  // Office
  {
    path: "/office",
    element: (
      <ProtectedRoute role="office">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <OfficeDashboard /> },
      { path: "projects", element: <AllProjects /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
