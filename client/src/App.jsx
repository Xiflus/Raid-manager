import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ValidateUserPage from "./pages/ValidateUserPage";

function App() {
	return (
		<>
			<Toaster position="top-center" toastOption={{ duration: 6000 }} />
			<Routes>
				<Route path="*" element={<NotFoundPage />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/auth/activate/:registrationCode" element={<ValidateUserPage />} />
			</Routes>
		</>
	);
}

export default App;
