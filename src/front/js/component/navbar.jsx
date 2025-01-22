import React from "react";
import logo from "../../img/logo-medi.png";
// import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light navbar-principal-classes">
				<div className="container-fluid navb-container">
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo01"
						aria-controls="navbarTogglerDemo01"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
						<a className="navbar-brand" href="#">
							<img src={logo} alt="logo" className="nav-logo img-fluid"/>
						</a>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">Home</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Features</a>
							</li>
							<li className="nav-item">
								<a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
							</li>
						</ul>
						<div className="btn btn-outline-success" type="submit">Search</div>
					</div>
				</div>
			</nav>
		</>
	);
};