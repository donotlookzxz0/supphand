import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { fetchUser } from "../services/auth.js";

function PublicRoute() {

const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetchUser()
      .then((userData) => setUser(userData))
      .catch(() => setUser(null));
  }, []);
  
  if (user === undefined) {
    return <p>...</p>
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

}

export default PublicRoute