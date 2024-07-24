import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CharacterProvider } from "./context/CharacterContext";
import App from "./App.jsx";
import "./input.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<CharacterProvider>
					<App />
				</CharacterProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
