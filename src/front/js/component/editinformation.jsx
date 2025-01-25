import React, { useState } from "react";

export const Modals = ({ isOpen, onClose, profileData, updateProfileData }) => {
    const [formData, setFormData] = useState(profileData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfileData(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content p-4 shadow" style={{ backgroundColor: "#CDC7ED", borderRadius: "15px" }}>
                <button
                    className="btn-close"
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick={onClose}
                ></button>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: "#3E2F9C" }}>First Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            style={{ backgroundColor: "#CDC7ED", border: "1px solid #3E2F9C", borderRadius: "8px" }}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: "#3E2F9C" }}>Last Name:</label>
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
                        <label className="form-label" style={{ color: "#3E2F9C" }}>Phone Number:</label>
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
                        <label className="form-label" style={{ color: "#3E2F9C" }}>Email:</label>
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
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary w-50 fw-bold">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};