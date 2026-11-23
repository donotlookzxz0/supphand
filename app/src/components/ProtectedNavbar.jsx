import { useOutletContext, useNavigate, Outlet } from "react-router";
import { logout } from "../services/auth";
import Navbar from "../components/Navbar";

const ProtectedNavbar = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center md:px-2 md:py-4">
      <Navbar userLogout={handleLogout} showUsername={user.username} />
      <div className="flex flex-1">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
};

export default ProtectedNavbar;