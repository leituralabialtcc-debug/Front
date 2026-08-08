import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return { handleLogout };
};