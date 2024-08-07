import { useContext } from "react";
import NavBar from "./NavBar";
import LogoBar from "./LogoBar";
import CharacterDisplay from "./CharacterDisplay";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <header className="bg-gray-900 text-white w-full fixed top-0 left-0 z-10 h-[var(--header-height)] flex items-center">
      <div className="flex justify-between items-center w-full px-4 py-2">
        <LogoBar />
        {authUser && (
          <>
            <NavBar />
            <CharacterDisplay />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
