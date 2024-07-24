import NavBar from "./NavBar";
import LogoBar from "./LogoBar";
import CharacterDisplay from "./CharacterDisplay";

const Header = () => {
	return (
		<header className="bg-gray-950">
			<div className="flex justify-between items-center px-4 py-2">
				<LogoBar />
				<NavBar />
				<CharacterDisplay />
			</div>
		</header>
	);
};

export default Header;
