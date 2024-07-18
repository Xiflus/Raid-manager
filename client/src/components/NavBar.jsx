import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const { authLogout, authUser } = useContext(AuthContext);
    return (
        <div className="">
            <i className="" aria-hidden="true"></i>
            <nav className="navbar nav-pos">
                <ul className="">
                    {!authUser ? (
                        <>
                            <li className="">
                                <Link className="" to="/register">
                                    Registrarse
                                </Link>
                            </li>
                            <li className="">
                                <Link className="" to="/login">
                                    Iniciar sesión
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <div className="">
                                <button className="" type="button">
                                    <img className="" src="/menu.svg" alt="" />
                                </button>
                                <ul className="">
                                    <li>
                                        <Link className="" to="/users/profile">
                                            Mi perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className=""
                                            to="/entries/NewEntry"
                                        >
                                            Nueva entrada
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="" to="/guild/create">
                                            Creación de hermandad
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className=""
                                            onClick={authLogout}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* <img className="" src="/grid-3x3-gap.svg" alt="" /> */}
                            {/* <li className="col">
								<Link className="header-link navbar-brand" to="/users/profile">
									Mi perfil
								</Link>
							</li>
							<li className="col">
								<Link className="header-link navbar-brand" to="/entries/NewEntry">
									Nueva entrada
								</Link>
							</li>
							<li className="col">
								<button className="header-btn navbar-toggler" onClick={authLogout}>
									Cerrar sesión
								</button>
							</li> */}
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
