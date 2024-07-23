import NavBar from "./NavBar";
import LogoBar from "./LogoBar";

const Header = () => {
  return (
    <header className="bg-gray-800">
      <div className="flex items-center px-4">
        <LogoBar />
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
