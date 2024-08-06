/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import UserInfo from "../components/UserInfo.jsx";
import Button from "../components/jsxComponents/Button.jsx";
import UserGuildListComponent from "../components/UserGuildListComponent.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";

const ProfilePage = () => {
	const { authUser } = useContext(AuthContext);
	!authUser && window.location.replace("/login");
	const navigate = useNavigate();

	// if (!authUser) {
	// 	navigate("/login");
	// }
	const handlePasswordClick = () => {
		navigate("/change/password");
	};
	const handleProfileClick = () => {
		navigate("/users/profile/change");
	};

	return (
		<>
			<PageContainer>
				<FormContainer>
					<div className="my-2">
						<UserInfo />
					</div>
					<div className="flex flex-col items-center">
						<div className="w-2/3">
							<Button onClick={handlePasswordClick} text="Cambiar contraseña" />
						</div>
						<div className="w-2/3 mt-2">
							<Button onClick={handleProfileClick} text="Actualizar perfil" />
						</div>
					</div>
					<UserGuildListComponent />
				</FormContainer>
			</PageContainer>
		</>
	);
};

export default ProfilePage;
