import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ValidateUserPage from "./pages/ValidateUserPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import CreateGuildPage from "./pages/CreateGuildPage";
import EditGuildPage from "./pages/EditGuildPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import CreateCharacterPage from "./pages/CreateCharacterPage";


function App() {
    return (
        <>
            <Header />
            <Toaster position="top-center" toastOption={{ duration: 6000 }} />
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/recover-password"
                    element={<RecoverPasswordPage />}
                />
                <Route
                    path="/auth/activate/:registrationCode"
                    element={<ValidateUserPage />}
                />
                <Route path="/guild/create" element={<CreateGuildPage />} />
                <Route
                    path="/guild/:guildId/edit"
                    element={<EditGuildPage />}
                />
                <Route path="/api/characters" element={<CreateCharacterPage/>}/>
            </Routes>
        </>
    );
}

export default App;
