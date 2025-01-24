import React, { useState } from "react";

export const DoctorRegister = () => {
    const [profileType, setProfileType] = useState("");

    const handleProfileTypeChange = (event) => {
        setProfileType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (profileType === "Doctor") {
            console.log("Redirecting to Specialist form...");
        } else {
            console.log("Registering as Patient...");
        }
    };

    return (
        <>
        <div className="row">
        <div className="col-6 mb-3">
        <h3 className="doctor-register-title">Doctor Register</h3>
        </div>
        </div>
        <div className="doctor-register-container">
            
            <div className="doctor-register-card">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="firstName" className="doctor-register-label">First Name:</label>
                            <input
                                type="text"
                                className="doctor-register-input"
                                id="firstName"
                                placeholder="First Name"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="lastName" className="doctor-register-label">Last Name:</label>
                            <input
                                type="text"
                                className="doctor-register-input"
                                id="lastName"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="doctor-register-label">Phone:</label>
                        <input
                            type="tel"
                            className="doctor-register-input"
                            id="phone"
                            placeholder="+44 1234 56 78 99"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="doctor-register-label">Email:</label>
                        <input
                            type="email"
                            className="doctor-register-input"
                            id="email"
                            placeholder="example@mediagenda.com"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="doctor-register-label">Password:</label>
                        <input
                            type="password"
                            className="doctor-register-input"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profileType" className="doctor-register-label">Profile Type:</label>
                        <select
                            id="profileType"
                            className="doctor-register-input"
                            value={profileType}
                            onChange={handleProfileTypeChange}
                        >
                            <option value="">Select Profile Type</option>
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </div>

                    {profileType === "Doctor" && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="specialistType" className="doctor-register-label">Specialist type:</label>
                                <select id="specialistType" className="doctor-register-input">
                                    <option value="">Select Speciality</option>
                                    <option value="Dermatologist" className="doctor-register-input-option">Dermatologist</option>
                                    <option value="Pediatrician" className="doctor-register-input-option">Pediatrician</option>
                                    <option value="Psychologist" className="doctor-register-input-option">Psychologist</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="licenseNumber" className="doctor-register-label">Number specialist license:</label>
                                <input
                                    type="text"
                                    className="doctor-register-input"
                                    id="licenseNumber"
                                    placeholder="123456789XXX"
                                />
                            </div>
                        </>
                    )}

                    <button type="submit" className="doctor-register-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};