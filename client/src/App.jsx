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
import NewPostPage from "./pages/NewPostPage";
import Footer from "./components/Footer";
import GuildPage from "./pages/GuildPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                    <Toaster
                        position="top-center"
                        toastOption={{ duration: 10000 }}
                    />
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
                        <Route
                            path="/guilds/create"
                            element={<CreateGuildPage />}
                        />
                        <Route
                            path="/guilds/:guildId"
                            element={<GuildPage />}
                        />
                        <Route
                            path="/guilds/:guildId/edit"
                            element={<EditGuildPage />}
                        />
                        <Route
                            path="/characters/create"
                            element={<CreateCharacterPage />}
                        />
                        <Route
                            path="/guilds/:guildId/posts/create"
                            element={<NewPostPage />}
                        />
                        <Route
                            path="/change-password/:recoverPassCode"
                            element={<ChangePasswordPage />}
                        />
                        <Route
                            path="/users/profile"
                            element={<ProfilePage />}
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default App;
