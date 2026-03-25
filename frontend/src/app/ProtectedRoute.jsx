import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    const userStr = localStorage.getItem("user");
    if (userStr && userStr !== "undefined") {
      user = JSON.parse(userStr);
    }
  } catch (e) {
    console.error("Failed to parse user:", e);
  }

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // 🔥 If layout is passed as children → render it
  // Otherwise render nested routes
  return children ? children : <Outlet />;
}

export default ProtectedRoute;