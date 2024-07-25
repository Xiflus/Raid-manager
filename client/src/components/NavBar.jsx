import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const { authLogout, authUser } = useContext(AuthContext);
    return (
        <nav className="ml-auto">
            <ul className="flex flex-wrap justify-center md:justify-start items-center p-4 space-x-4 md:space-x-6">
                {authUser && (
                    <>
                        <li>
                            <Link
                                className="text-white font-bold hover:text-[#49bae1] block px-4 py-2 rounded-lg"
                                to="/users/profile"
                            >
                                Mi perfil
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-white font-bold hover:text-[#49bae1] block px-4 py-2 rounded-lg"
                                to="/guilds/create"
                            >
                                Creación de hermandad
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-white font-bold hover:text-[#49bae1] block px-4 py-2 rounded-lg"
                                to="/characters/create"
                            >
                                Crear personaje
                            </Link>
                        </li>
                        <li>
                            <button
                                className="text-white font-bold hover:text-[#49bae1] block px-4 py-2 rounded-lg focus:outline-none"
                                onClick={authLogout}
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
