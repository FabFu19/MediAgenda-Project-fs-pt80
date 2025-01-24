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
        <div className="container vh-100">
            <div className="card p-3 shadow doctor-register-card">
                <h3 className="card-title">Doctor Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="firstName" className="form-label">First Name:</label>
                            <input type="text" className="form-control" id="firstName" placeholder="Name" />
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
                        <input type="password" className="form-control" id="password" placeholder="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profileType" className="form-label">Profile Type</label>
                        <select id="profileType" className="form-select" value={profileType} onChange={handleProfileTypeChange}>
                            <option value="">Select profile type</option>
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </div>

                    {profileType === "Doctor" && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="specialistType" className="form-label">Specialist type:</label>
                                <select id="specialistType" className="form-select">
                                    <option value="">Select Speciality</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatrician">Pediatrician</option>
                                    <option value="Psychologist">Psychologist</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="licenseNumber" className="form-label">Number specialist license:</label>
                                <input type="text" className="form-control" id="licenseNumber" placeholder="123456789XXX" />
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn btn-primary register-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

