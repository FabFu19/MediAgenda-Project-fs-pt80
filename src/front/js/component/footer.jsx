import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer>
		<div className="bg-primary text-white py-5  d-flex justify-content-between align-items-center text-opacity-75"
		style={{ fontFamily: 'Gantari, sans-serif', fontSize: '16px', background: 'linear-gradient(180deg, #6F4CB0 20%, #4632A5 100%)'}}>
			<div className="container ps-4">
				LOGO
			</div>
			<div className="container">
			    <Link to="/about" className="text-white text-decoration-none text-opacity-75">
					<span className="mb-0"style={{ fontFamily: 'Gantari, sans-serif', fontSize: '16px' }}>About us</span>
				</Link>
			</div>
			<div className="container">
			<Link to="/support" className="text-white text-decoration-none text-opacity-75">
			<span className="mb-0"style={{ fontFamily: 'Gantari, sans-serif', fontSize: '16px' }}>Support</span>
				</Link>
			</div>
			<div className="container">
			© 2025 MediAgenda. All rights reserved.
			</div>
        
		</div>
	</footer>
);
