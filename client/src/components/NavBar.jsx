import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import LogoBar from "./LogoBar";

const NavBar = () => {
  const { authLogout, authUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="relative ml-auto">
      {authUser && (
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={toggleMenu} className="text-white z-50 relative">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      )}

      <ul
        ref={menuRef}
        className={`fixed top-0 left-0 w-1/2 h-full bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center space-y-4 transform transition-transform duration-300 ease-in-out  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:static md:bg-transparent md:flex md:flex-row md:justify-center md:space-y-0 md:space-x-6 md:translate-x-0 z-40`}
        style={{ borderRadius: "0 1rem 1rem 0" }}
      >
        {authUser && (
          <>
            {isOpen && (
              <>
                <div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white z-50"
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </button>
                </div>
                <div className="flex justify-between items-center w-full p-4">
                  <div className="flex-1 flex justify-center">
                    <LogoBar onClick={() => setIsOpen(false)} />
                  </div>
                </div>
              </>
            )}
            <li className="w-full text-center">
              <Link
                className="text-white font-bold hover:text-[#49bae1] block px-4 py-2 rounded-lg"
                to="/users/profile"
                onClick={() => setIsOpen(false)}
              >
                Mi perfil
              </Link>
            </li>
            <li className="w-full text-center">
              <Link
                className="text-white font-bold hover:text-[#49bae1] block px-4 py-2 rounded-lg"
                to="/guilds/create"
                onClick={() => setIsOpen(false)}
              >
                Crear hermandad
              </Link>
            </li>
            <li className="w-full text-center">
              <Link
                className="text-white font-bold hover:text-[#49bae1] block px-4 py-2 rounded-lg"
                to="/characters/create"
                onClick={() => setIsOpen(false)}
              >
                Crear personaje
              </Link>
            </li>
            <li >
              <button
                className="text-white font-bold hover:text-[#49bae1] block px-4 py-2 rounded-lg focus:outline-none"
                onClick={() => {
                  authLogout();
                  setIsOpen(false);
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
