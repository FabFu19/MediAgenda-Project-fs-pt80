import React from "react";
import circle_1 from "../../img/Circle.png";
import circle_2 from "../../img/Circle_2.png";
import circle_3 from "../../img/Circle_3.png";
import doctor_1 from "../../img/doctor5.png";
import { Link } from "react-router-dom";


export const PatientProfile = () => {
    return(
        <>
            <div className="col-sm-12 col-md-7 col-lg-7">
                <h1 className="prof-pinci-title">Profile</h1>
                <div className="d-flex mb-4">
                    <div className="content-data-profile">
                        <div className="container-info-profile">
                            <div>
                                <p className="require-data-title">Name:</p>
                                <p className="require-data-info">Pepe</p>
                            </div>
                            <div>
                                <p className="require-data-title">Last Name:</p>
                                <p className="require-data-info">El Bueno</p>
                            </div>
                            <div>
                                <p className="require-data-title">Phone Number:</p>
                                <p className="require-data-info">6458889999</p>
                            </div>
                            <div>
                                <p className="require-data-title">Email:</p>
                                <p className="require-data-info">pepebue@geeks.com</p>
                            </div>
                        </div>
                        <div>
                            <span className="fa-regular fa-pen-to-square prof-edit-icon"></span>
                        </div>
                    </div>
                    <div className="dot-states mascara">
                        
                        <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="beautifier"title="Available">
                            <img src={circle_1} alt="circle1"/>
                        </button>
                        {/* <div className="tooltip bs-tooltip-top" role="tooltip">
                            <div className="tooltip-arrow"></div>
                            <div className="tooltip-inner">
                                Some tooltip text!
                            </div>
                        </div> */}
                        {/* <div  className="btn btn-light red-tooltip" data-bs-toggle="tooltip" customClass="tooltip-prof" data-bs-placement="left" title="Available"></div> */}
                        {/* <div className="status-img"><p>Available</p></div> */}
                        <img className="status-img" src={circle_2} alt="circle2" data-status="Cancelled" />
                        <img className="status-img" src={circle_3} alt="circle3" data-status="Available" />
                    </div>
                </div>
                <div className="d-flex content-medical-options">
                    <Link to="/" className="d-flex choose-speci-box text-decoration-none">
                        <img src={doctor_1} alt="especialista" className="esp-pic"/>
                        <p className="select-speciality">Choose a Speciality</p>
                    </Link>
                    <Link to="/" className="comming-s-box text-decoration-none">
                        <h3 className="comming-text">Medical</h3>
                        <h3 className="comming-text">History is</h3>
                        <h3 className="comming-text">Comming soon</h3>
                    </Link>
                    
                    
                </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5">
                <div className="prof-list-container">
                    <h1 className="prof-sec-title">Appointment Status</h1>
                    <ul>
                        <li className="content-appoint-data">
                            <div className="data-text-appoint">
                                <p className="name-appoint">Dr. Orangel Hernandez</p>
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
                                <p className="name-appoint">Dr. Orangel Hernandez</p>
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
                                <p className="name-appoint">Dr. Orangel Hernandez</p>
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
                                <p className="name-appoint">Dr. Orangel Hernandez</p>
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