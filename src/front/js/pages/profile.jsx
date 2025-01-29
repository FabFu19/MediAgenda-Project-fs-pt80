import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PatientProfile } from "../component/profile.jsx";
import { Doctor } from "../component/doctor_profile.jsx";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        
        if (!store.user) {
            actions.getProfile();
        }
    }, []);

    return (
        <>
            <div className="profile-body">
                <div className="profile-container container">
                    <div className="row">
                        {store.role === "paciente" ? <PatientProfile /> : <Doctor />}
                    </div>
                </div>
            </div>
        </>
    );
};
