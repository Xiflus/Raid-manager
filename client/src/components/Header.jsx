import NavBar from "./NavBar";
import LogoBar from "./LogoBar";

const Header = () => {
	return (
		<header className="bg-gray-950">
			<div className="flex justify-between items-center px-4 py-2">
				<LogoBar />
				<NavBar />
			</div>
		</header>
	);
};

export default Header;
