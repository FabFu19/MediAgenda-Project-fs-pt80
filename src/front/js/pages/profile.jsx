import React from "react";



export const Profile = () => {
    return(
        <>
            <div className="profile-container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <h1 className="text-dark">Profile</h1>
                        <div className="d-flex">
                            <div className="content-data-profile">
                                <div className="container-info-profile">
                                    <div>
                                        <p>Name:</p>
                                        <p>Pepe</p>
                                    </div>
                                    <div>
                                        <p>Last Name:</p>
                                        <p>El Bueno</p>
                                    </div>
                                    <div>
                                        <p>Phone Number:</p>
                                        <p>6458889999</p>
                                    </div>
                                    <div>
                                        <p>Email:</p>
                                        <p>pepebue@geeks.com</p>
                                    </div>
                                </div>
                                <div>
                                    <span className="fa-regular fa-pen-to-square"></span>
                                </div>
                            </div>
                            <div className="dot-states">
                                <span>X</span>
                                <span>X</span>
                                <span>X</span>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="d-flex">
                                <img />
                                <p></p>
                            </div>
                            <div>
                                <h3>Medical</h3>
                                <h3>History is</h3>
                                <h3>Comming soon</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <div>
                            <h1></h1>
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        
        </>

    );
}