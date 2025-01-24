import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
    const [profileType, setProfileType] = useState("");

    const handleProfileTypeChange = (event) => {
        setProfileType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (profileType === "doctor") {
            console.log("Redirecting to Specialist form...");
        } else {
            console.log("Registering as Patient...");
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card register-card">
                <h3 className="card-title">Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="firstName" className="form-label">First Name:</label>
                            <input type="text" className="form-control" id="firstName" placeholder="Harry" />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name:</label>
                            <input type="text" className="form-control" id="lastName" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" className="form-control" id="phone" placeholder="+34 910 86 69 83" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="example@mediagenda.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="********" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profileType" className="form-label">Profile type:</label>
                        <select id="profileType" className="form-select" value={profileType} onChange={handleProfileTypeChange}>
                            <option value="">Select profile type</option>
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </div>
                    {profileType === "Doctor" ? (
                        <Link to="/doctorregister" className="btn btn-primary register-button">
                            Register
                        </Link>
                    ) : (
                        <button type="submit" className="btn btn-primary register-button">
                            Register
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};