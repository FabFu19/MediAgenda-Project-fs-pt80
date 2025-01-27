import React from "react";
import circle_1 from "../../img/Circle.png";
import circle_2 from "../../img/Circle_2.png";
import circle_3 from "../../img/Circle_3.png";
import doctor_3 from "../../img/doctor6.png";
import { Link } from "react-router-dom";



export const Doctor = () => {
    
    return(
        <>
            <div className="col-sm-12 col-md-7 col-lg-7 doctor-profile">
                <h1 className="prof-pinci-title">Profile</h1>
                <div className="d-flex mb-4">
                    <div className="content-data-profile">
                        <div className="container-info-profile">
                            <div>
                                <p className="require-data-title">First Name:</p>
                                <p className="require-data-info">Harry</p>
                            </div>
                            <div>
                                <p className="require-data-title">Last Name:</p>
                                <p className="require-data-info">Postres</p>
                            </div>
                            <div>
                                <p className="require-data-title">Medical Registration Number:</p>
                                <p className="require-data-info">444555DDY</p>
                            </div>
                            <div>
                                <p className="require-data-title">Specility:</p>
                                <p className="require-data-info">Cardiologist</p>
                            </div>
                        </div>
                        <div>
                            <span className="fa-regular fa-pen-to-square prof-edit-icon"></span>
                        </div>
                    </div>
                    <div className="dot-states">
                        <span data-bs-toggle="tooltip" data-bs-custom-class="tool-status" data-bs-placement="bottom" data-bs-title="Available">
                            <img src={circle_1} alt="circle1" />
                        </span>
                        <span data-bs-toggle="tooltip" data-bs-custom-class="tool-status" data-bs-placement="bottom" data-bs-title="Cancelled">
                            <img src={circle_2}  alt="circle1" />
                        </span>
                        <span data-bs-toggle="tooltip" data-bs-custom-class="tool-status" data-bs-placement="bottom" data-bs-title="Pending">
                            <img src={circle_3} alt="circle1" />
                        </span>
                    </div>
                </div>
                <div className="d-flex content-medical-options">
                    <Link to="/" className="d-flex choose-speci-box text-decoration-none">
                        <img src={doctor_3} alt="especialista" className="esp-pic"/>
                        <p className="select-speciality">Manage Availability</p>
                    </Link>
                    <Link to="/" className="comming-s-box text-decoration-none">
                        <h3 className="comming-text">Medical</h3>
                        <h3 className="comming-text">History is</h3>
                        <h3 className="comming-text">Comming soon</h3>
                    </Link>
                    
                    
                </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5 pt-5">
                <div className="prof-list-container">
                    <h1 className="prof-sec-title">Appointment Status</h1>
                    <ul>
                        <li className="content-appoint-data">
                            <div className="data-text-appoint">
                                <p className="name-appoint">Harry Postres</p>
                                <p className="date-appoint">February 24 at 09:00</p>
                            </div>
                            <div className="content-appoint-status">
                                <img src={circle_1}  alt="circle1" className="img-status"/>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li className="content-appoint-data">
                            <div className="data-text-appoint">
                                <p className="name-appoint">Harry Postres</p>
                                <p className="date-appoint">February 24 at 09:00</p>
                            </div>
                            <div className="content-appoint-status">
                                <img src={circle_1}  alt="circle1" className="img-status"/>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li className="content-appoint-data">
                            <div className="data-text-appoint">
                                <p className="name-appoint">Harry Postres</p>
                                <p className="date-appoint">February 24 at 09:00</p>
                            </div>
                            <div className="content-appoint-status">
                                <img src={circle_1}  alt="circle1" className="img-status"/>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li className="content-appoint-data">
                            <div className="data-text-appoint">
                                <p className="name-appoint">Harry Postres</p>
                                <p className="date-appoint">February 24 at 09:00</p>
                            </div>
                            <div className="content-appoint-status">
                                <img src={circle_1}  alt="circle1" className="img-status"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}