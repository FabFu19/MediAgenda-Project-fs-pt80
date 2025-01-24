import React, { useState, useEffect } from "react";

export const Modals = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",   
        phoneNumber: "",
        email: "",
        address: "",
        socialSecurityNumber: "",
        specialty: "",
        medicalLicense: ""
    });

    const [userType, setUserType] = useState("patient");

    useEffect(() => {

        const fetchUserType = async () => {
            try {
                const response = await fetch("https://ejemplo");
                const data = await response.json();
                setUserType(data.type);
            } catch (error) {
                console.error("Error fetching user type:", error);
            }
        };

        fetchUserType();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://api.example.com/save-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Data saved successfully!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    email: "",
                    address: "",
                    socialSecurityNumber: "",
                    officeAddress: ""
                });
            } else {
                alert("Failed to save data");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert("An error occurred");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 shadow" style={{ backgroundColor: "#CDC7ED", width: "400px", borderRadius: "15px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="form-label" style={{color: "#3E2F9C" }}>First Name:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="firstName" 
                              value={formData.firstName} 
                            style={{ backgroundColor: "#CDC7ED", border: "1px solid #3E2F9C", borderRadius: "8px"  }}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                    <label className="form-label" style={{color: "#3E2F9C" }}>Last Name:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="lastName" 
                            value={formData.lastName} 
                            style={{ backgroundColor: "#CDC7ED", border: "1px solid #3E2F9C", borderRadius: "8px" }}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{color: "#3E2F9C" }}>Phone Number:</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            name="phoneNumber" 
                            value={formData.phoneNumber} 
                            style={{ backgroundColor: "#CDC7ED", border: "1px solid #3E2F9C", borderRadius: "8px" }}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                    <label className="form-label" style={{color: "#3E2F9C" }}>Email:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            value={formData.email} 
                            style={{ backgroundColor: "#CDC7ED", border: "1px solid #3E2F9C", borderRadius: "8px" }}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    {userType === "doctor" ? (
                        <>
                            <div className="mb-3">
                            <label className="form-label" style={{color: "#3E2F9C" }}>Office Address:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="medicalLicense" 
                                    value={formData.officeAddress} 
                                    style={{ backgroundColor: "#CDC7ED", border: "1px solid #3E2F9C", borderRadius: "8px" }}
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-3">
                            <label className="form-label" style={{color: "#3E2F9C" }}>Address (Optional):</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="address" 
                                    value={formData.address} 
                                    style={{ backgroundColor: "#CDC7ED", border: "1px solid #3E2F9C", borderRadius: "8px" }}
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="mb-3">
                            <label className="form-label" style={{color: "#3E2F9C" }}>Social Security Number (Optional):</label>
                            <input 
                                 type="text" 
                                 className="form-control" 
                                 name="socialSecurityNumber" 
                                 value={formData.socialSecurityNumber} 
                                 style={{ backgroundColor: "#CDC7ED", border: "1px solid #3E2F9C", borderRadius: "8px" }}
                                 onChange={handleChange} 
                                 />
                            </div>
                        </>
                    )}
                    <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-25 fw-bold">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};