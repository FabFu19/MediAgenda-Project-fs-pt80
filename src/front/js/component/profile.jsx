import React, { useContext, useEffect, useState } from "react";
import circle_1 from "../../img/Circle.png";
import circle_2 from "../../img/Circle_2.png";
import circle_3 from "../../img/Circle_3.png";
import doctor_1 from "../../img/doctor5.png";
import { Link } from "react-router-dom";
import { Modals } from "./editinformation.jsx";
import { Context } from "../store/appContext.js";

export const PatientProfile = () => {
    const { store, actions } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [profileData, setProfileData] = useState(() => {
        const storedData = localStorage.getItem("profileData");
        return storedData
            ? JSON.parse(storedData)
            : {
                firstName: "Juan",
                lastName: "Pérez",
                phoneNumber: "123-456-7890",
                email: "juanperez@example.com",
                address: "",
                securityNumber: ""
            };
    });
    useEffect(() => {
        actions.fetchAppointments(); 
    }, []);

    const updateProfileData = (updatedData) => {
        setProfileData(updatedData);
        localStorage.setItem("profileData", JSON.stringify(updatedData));
    };

    
    
    return (
        <>
            <div className="col-sm-12 col-md-7 col-lg-7">
                <h1 className="prof-pinci-title">Profile</h1>
                <div className="d-flex mb-4">
                    <div className="content-data-profile">
                        <div className="container-info-profile">
                            <p className="require-data-title">Name:</p>
                            <p className="require-data-info">{profileData.firstName}</p>
                            <p className="require-data-title">Last Name:</p>
                            <p className="require-data-info">{profileData.lastName}</p>
                            <p className="require-data-title">Phone Number:</p>
                            <p className="require-data-info">{profileData.phoneNumber}</p>
                            <p className="require-data-title">Email:</p>
                            <p className="require-data-info">{profileData.email}</p>
                            <p className="require-data-title">Address:</p>
                            <p className="require-data-info">{profileData.address}</p>
                        </div>
                        <span className="fa-regular fa-pen-to-square prof-edit-icon" onClick={() => setIsModalOpen(true)}></span>
                    </div>
                    <div className="dot-states">

                        <span data-bs-toggle="tooltip" data-bs-custom-class="tool-status" data-bs-placement="bottom" data-bs-title="Available">
                            <img src={circle_1} alt="circle1" />
                        </span>
                        <span data-bs-toggle="tooltip" data-bs-custom-class="tool-status" data-bs-placement="bottom" data-bs-title="Cancelled">
                            <img src={circle_2} alt="circle1" />
                        </span>
                        <span data-bs-toggle="tooltip" data-bs-custom-class="tool-status" data-bs-placement="bottom" data-bs-title="Pending">
                            <img src={circle_3} alt="circle1" />
                        </span>
                    </div>
                </div>
                <div className="d-flex content-medical-options">
                    <Link to="/" className="d-flex choose-speci-box text-decoration-none">
                        <img src={doctor_1} alt="especialista" className="esp-pic" />
                        <p className="select-speciality">Choose a Speciality</p>
                    </Link>
                </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5 pt-5">
                <div className="prof-list-container">
                    <h1 className="prof-sec-title">Appointment Status</h1>
                    <div className="content-scroll-list">
                        <div className="list-scrolled">
                            <ul className="ps-0">
                                {appointments.map((appt, index) => (
                                    <li key={index} className="content-appoint-data">
                                        <div className="data-text-appoint">
                                            <p className="name-appoint">{appt.doctor}</p>
                                            <p className="date-appoint">{appt.date}</p>
                                        </div>
                                        <div className="content-appoint-status">
                                            <img src={circle_1} alt="circle1" className="img-status" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modals
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    profileData={profileData}
                    updateProfileData={updateProfileData}
                />
            )}
        </>
    );
};







