import NavBar from "./NavBar";
import LogoBar from "./LogoBar";

const Header = () => {
	return (
		<header className="bg-gray-950">
			<div className="flex justify-between items-center">
				<NavBar />
				<LogoBar />
			</div>
		</header>
	);
};

export default Header;
