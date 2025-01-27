import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { PatientProfile } from "../component/profile.jsx";
import { Doctor } from "../component/doctor_profile.jsx";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    // useEffect(() => {
    //     actions.getProfile();
    // }, [actions]);

    // if (store.loading) {
    //     return <p>Loading profile...</p>;
    // }

    // if (store.error) {
    //     return <p>Error loading profile: {store.error}</p>;
    // }

    // if (!store.user || !store.profile) {
    //     return <p>No profile data available.</p>;
    // }


    return (
        <div className="profile-body">
            <div className="profile-container container">
                <div className="row">
                    {store.role === "paciente" ? (
                        <PatientProfile profile={store.profile} />
                    ) : (
                        <Doctor profile={store.profile} />
                    )}
                </div>
            </div>
        </div>
    );
};