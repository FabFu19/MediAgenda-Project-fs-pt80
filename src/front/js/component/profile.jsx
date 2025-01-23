import React from "react";
import circle_1 from "../../img/Circle.png";
import circle_2 from "../../img/Circle_2.png";
import circle_3 from "../../img/Circle_3.png";
import doctor_1 from "../../img/doctor5.png";


export const PatientProfile = () => {
    return(
        <>
            <div className="col-sm-12 col-md-8 col-lg-8">
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
                    <div className="dot-states">
                        <img src={circle_1}  alt="circle1"/>
                        <img src={circle_2}  alt="circle1"/>
                        <img src={circle_3}  alt="circle1"/>
                        {/* <div></div> */}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex choose-speci-box">
                        <img src={doctor_1} alt="especialista" className="esp-pic"/>
                        <p className="select-speciality">Choose a Speciality</p>
                    </div>
                    <div className="comming-s-box">
                        <h3 className="comming-text">Medical</h3>
                        <h3 className="comming-text">History is</h3>
                        <h3 className="comming-text">Comming soon</h3>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
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