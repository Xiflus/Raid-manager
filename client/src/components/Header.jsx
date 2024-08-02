import { useContext } from "react";
import NavBar from "./NavBar";
import LogoBar from "./LogoBar";
import CharacterDisplay from "./CharacterDisplay";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
	const { authUser } = useContext(AuthContext);
	return (
		<header className="bg-gray-900 text-white w-full h-[var(--header-height)]">
			<div className="flex justify-between items-center px-4 py-2">
				<LogoBar />
				{authUser ? (
					<>
						<NavBar /> <CharacterDisplay />
					</>
				) : null}
			</div>
		</header>
	);
};

export default Header;
