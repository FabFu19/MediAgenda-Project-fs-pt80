import React from "react";
import { PatientProfile } from "../component/profile.jsx";
import { NavbarProfile } from "../component/navbar-profile.jsx";



export const Profile = () => {

    return(
        <>  
            <div className="profile-body">
                <div className="profile-container container">
                    <div className="row">
                        <PatientProfile />
                    </div>
                </div>
            </div>
        </>

    );
}