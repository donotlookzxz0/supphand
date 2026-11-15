import { useOutletContext, useNavigate, Outlet } from "react-router";
import { logout } from "../services/auth";
import Sidebar from "../components/Sidebar";

const ProtectedLayout = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex">
      <Sidebar userLogout={handleLogout} showUsername={user.username} />
      <div className="flex flex-1">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
};

export default ProtectedLayout;