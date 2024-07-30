import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  getPrivateProfileService,
  singUpService,
  loginService,
  resetPasswordService,
  changePasswordService,
} from "../../services/userService.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getPrivateProfileService(authToken);
        setAuthUser(user);
      } catch (err) {
        toast.error(err.message);
      }
    };
    if (authToken) fetchUser();
  }, [authToken]);
  const authRegister = async (username, email, password) => {
    try {
      const message = await singUpService(username, email, password);
      toast.success(message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const authLogin = async (username, password) => {
    const token = await loginService(username, password);
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    const user = await getPrivateProfileService(token);
    setAuthUser(user);
  };
  const authLogout = () => {
    setAuthToken(null);
    setAuthUser(null);
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("React::DevTools::lastSelection");
    sessionStorage.removeItem("selectedCharacter");
    navigate("/");
  };

  const authResetPassword = async (recoverPassCode, newPassword) => {
    try {
      await resetPasswordService(recoverPassCode, newPassword);
      toast.success("contraseña actualizada");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const authChangePassword = async (currentPassword, newPassword) => {
    try {
      await changePasswordService(currentPassword, newPassword);
      authLogout();
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authRegister,
        authLogin,
        authLogout,
        authToken,
        authUser,
        authResetPassword,
        authChangePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
