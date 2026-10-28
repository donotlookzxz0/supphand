import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchUser } from "../services/auth.js";

const ProtectedRoute = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetchUser()
      .then((userData) => setUser(userData))
      .catch(() => setUser(null));
  }, []);
  
  if (user === undefined) {
    return <p>...</p>
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;