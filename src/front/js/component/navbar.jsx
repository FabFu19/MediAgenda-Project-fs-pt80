import React, {useState} from "react";
import logo from "../../img/logo-medi-2.png";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const location = useLocation(); 

    
    const isProfilePage = location.pathname === "/profile";
    const ProfileNavbar = () => (
        <nav className="navbar navbar-expand-lg navbar-light pt-0 pb-0 navbar-profile ">
            <div className={`d-flex w-100 ${window.innerWidth > 768 ? "container" : ""}`}>
                <Link to="/" className="nav-content-img">
                    <img src={logo} alt="logo" className="nav-logo" />
                </Link>
                <div className={`align-items-center nav-container-items ${isOpen && "open"}`}>
                    <ul className="navbar-nav nav_links">
                        <div className="nav-btn-container-responsive">
                            <Link to="/" className="btn custom-btn special_margin" type="submit">
                                <p>Logout</p>
                            </Link>
                        </div>
                    </ul>
                </div>
                <li className="nav-btn-container">
                    <Link to="/" className="btn custom-btn special_margin" type="submit">
                        <p>Logout</p>
                    </Link>
                </li>
                <div className={`nav-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span className="bar-special-style"></span>
                </div>
            </div>
        </nav>
    );

 
    const GeneralNavbar = () => (
        <nav className="navbar navbar-expand-lg navbar-light pt-0 pb-0 navbar-principal-classes h-auto">
            <div className="d-flex w-100">
                <Link to="/" className="nav-content-img">
                    <img src={logo} alt="logo" className="nav-logo" />
                </Link>
                <div className={`align-items-center nav-container-items ${isOpen && "open"}`}>
                    <ul className="navbar-nav nav_links">
                        <li className="nav-item me-3 nav-text-content">
                            <Link to="/" className="nav-link nav-text" aria-current="page">
                                About us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link nav-text">
                                Support
                            </Link>
                        </li>
                        <div className="nav-btn-container-responsive">
                            <Link to="/" className="btn custom-btn special_margin" type="submit">
                                <p>Login</p>
                            </Link>
                            <Link to="/" className="btn custom-btn special_margin" type="submit">
                                <p>Register</p>
                            </Link>
                        </div>
                    </ul>
                </div>
                <li className="nav-btn-container">
                    <Link to="/" className="btn custom-btn special_margin" type="submit">
                        <p>Login</p>
                    </Link>
                    <Link to="/" className="btn custom-btn special_margin" type="submit">
                        <p>Register</p>
                    </Link>
                </li>
                <div className={`nav-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span className="bar-special-style"></span>
                </div>
            </div>
        </nav>
    );

    return <>{isProfilePage ? <ProfileNavbar /> : <GeneralNavbar />}</>;
};