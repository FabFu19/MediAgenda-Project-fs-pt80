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
        <div 
            className="d-flex justify-content-center align-items-center vh-100"
        >
                <div 
                className="card p-3 shadow" 
                style={{ 
                    width: "100%", 
                    maxWidth: "600px",
                    borderRadius: "15px", 
                    backgroundColor: "rgba(111, 76, 176, 0.33)",
                    margin: "25px",
                    padding: "1px 1px",
                }}
            >
                 <h3 
                    className="text-left" 
                    style={{ 
                        color: "#4a148c", 
                        position: "absolute", 
                        top: "-32px", 
                        left: "15px", 
                        fontSize: "24px"
                    }}
                >
                    Doctor Register
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label 
                                htmlFor="firstName" 
                                className="form-label" 
                                style={{ color: "#3E2F9C", fontSize: "16px", }}
                            >First Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="firstName" 
                                placeholder="Name" 
                                style={{ 
                                    backgroundColor: "rgba(111, 76, 176, 0.00)", 
                                    border: "1px solid #4a148c", 
                                    borderRadius: "8px",
                                    color: "white",
                                    fontSize: "12px"
                                }} 
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label 
                                htmlFor="lastName" 
                                className="form-label" 
                                style={{ color: "#3E2F9C", fontSize: "16px", }}
                            >Last Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="lastName" 
                                placeholder="Last Name" 
                                style={{ 
                                    backgroundColor: "rgba(111, 76, 176, 0.00)", 
                                    border: "1px solid #4a148c", 
                                    borderRadius: "8px",
                                    color: "white",
                                    fontSize: "12px"
                                }} 
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label 
                            htmlFor="phone" 
                            className="form-label" 
                            style={{ color: "#3E2F9C", fontSize: "16px", }}
                        >Phone:</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="phone" 
                            placeholder="+34 910 86 69 83" 
                            style={{ 
                                backgroundColor: "rgba(111, 76, 176, 0.00)", 
                                border: "1px solid #4a148c", 
                                borderRadius: "8px",
                                color: "white",
                                fontSize: "12px"
                            }} 
                        />
                    </div>
                    <div className="mb-3">
                        <label 
                            htmlFor="email" 
                            className="form-label" 
                            style={{ color: "#3E2F9C", fontSize: "16px" }}
                        >Email:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="example@mediagenda.com" 
                            style={{ 
                                backgroundColor: "rgba(111, 76, 176, 0.00)", 
                                border: "1px solid #4a148c", 
                                borderRadius: "8px",
                                color: "white",
                                fontSize: "12px"
                            }} 
                        />
                    </div>
                    <div className="mb-3">
                        <label 
                            htmlFor="password" 
                            className="form-label" 
                            style={{ color: "#3E2F9C", fontSize: "16px", }}
                        >Password:</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="password" 
                            style={{ 
                                backgroundColor: "rgba(111, 76, 176, 0.00)", 
                                border: "1px solid #4a148c", 
                                borderRadius: "8px",
                                color: "white",
                                fontSize: "12px"
                            }} 
                        />
                    </div>
                    <div className="mb-3">
                        <label 
                            htmlFor="profileType" 
                            className="form-label" 
                            style={{ color: "#3E2F9C", fontSize: "16px", }}
                        >Profile Type</label>
                        <select 
                            id="profileType" 
                            className="form-select" 
                            value={profileType} 
                            onChange={handleProfileTypeChange} 
                            style={{ 
                                backgroundColor: "rgba(111, 76, 176, 0.00)", 
                                border: "1px solid #4a148c", 
                                borderRadius: "8px", 
                                color: "white",
                                fontSize: "12px"
                            }}
                        >
                            <option value="" style={{
                                backgroundColor: "rgba(111, 76, 176, 0.33)", 
                            }}>Select profile type</option>
                            <option value="Patient" style={{
                                backgroundColor: "rgba(111, 76, 176, 0.33)", 
                            }}>Patient</option>
                            <option value="Doctor" style={{
                                backgroundColor: "rgba(111, 76, 176, 0.33)", 
                            }}>Doctor</option>
                        </select>
                    </div>
                 
                        <>
                            <div className="mb-3">
                                <label 
                                    htmlFor="specialistType" 
                                    className="form-label" 
                                    style={{ color: "#3E2F9C", fontSize: "16px" }}
                                >Specialist type:</label>
                                <select 
                            id="profileType" 
                            className="form-select" 
                            value={profileType} 
                            onChange={handleProfileTypeChange} 
                            style={{ 
                                backgroundColor: "rgba(111, 76, 176, 0.00)", 
                                border: "1px solid #4a148c", 
                                borderRadius: "8px", 
                                color: "white",
                                fontSize: "12px"
                            }}
                        >
                                 <option value="" style={{
                                 backgroundColor: "rgba(111, 76, 176, 0.33)", 
                                 }}>Select Speciality</option>
                                 <option value="Patient" style={{
                                 backgroundColor: "rgba(111, 76, 176, 0.33)", 
                                 }}>Dermatologist</option>
                                 <option value="Doctor" style={{
                                 backgroundColor: "rgba(111, 76, 176, 0.33)", 
                                 }}>Pediatrician</option>
                                 <option value="Doctor" style={{
                                 backgroundColor: "rgba(111, 76, 176, 0.33)", 
                                 }}>Psychologist</option>
                            </select>
                            </div>
                            <div className="mb-3">
                                <label 
                                    htmlFor="licenseNumber" 
                                    className="form-label" 
                                    style={{ color: "#3E2F9C", fontSize: "16px", }}
                                >Number specialist license:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="licenseNumber" 
                                    placeholder="123456789XXX" 
                                    style={{ 
                                        backgroundColor: "rgba(111, 76, 176, 0.00)", 
                                        border: "1px solid #4a148c", 
                                        borderRadius: "8px",
                                        color: "white",
                                        fontSize: "12px"
                                    }} 
                                />
                            </div>
                        </>
                    
                        <button 
                            type="submit"  
                            style={{ 
                                backgroundColor: "#4a148c", 
                                borderRadius: "8px", 
                                padding: "10px", 
                                marginTop: "10px",
                                fontSize: "16px",
                                width: "35%",
                                color: "white",
                            }}
                        >
                            Register
                        </button>
                </form>
            </div>
        </div>
    );
};
