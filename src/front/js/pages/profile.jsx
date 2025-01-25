import React from "react";
import { PatientProfile } from "../component/profile.jsx";
import { Doctor } from "../component/doctor_profile.jsx";



export const Profile = () => {

    return(
        <>  
            <div className="profile-body">
                <div className="profile-container container">
                    <div className="row">
                        <PatientProfile /> 
                        {/* <Doctor /> */}
                    </div>
                </div>
            </div>
        </>

    );
}