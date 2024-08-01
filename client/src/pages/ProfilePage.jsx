/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import UserInfo from "../components/UserInfo.jsx";
import Button from "../components/jsxComponents/Button.jsx";
import UserGuildListComponent from "../components/UserGuildListComponent.jsx";

const ProfilePage = () => {
  const { authUser } = useContext(AuthContext);
 
  const navigate = useNavigate();
  if(!authUser) {
    navigate("/login")
  }
  const handlePasswordClick = ()=>{
    navigate("/change/password")
  }
  const handleProfileClick = ()=> {
    navigate("/users/profile/change")
  }

  return (
    <>
    <UserInfo/>
    <Button onClick={handlePasswordClick} text="Cambiar contraseña" />
    <Button onClick={handleProfileClick} text="Actualizar perfil" />
    <UserGuildListComponent/>
    </>
  );
};

export default ProfilePage;
