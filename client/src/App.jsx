import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ValidateUserPage from "./pages/ValidateUserPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";

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
          path="/auth/activate/:registrationCode"
          element={<ValidateUserPage />}
        />
      </Routes>
    </>
  );
}

export default App;
