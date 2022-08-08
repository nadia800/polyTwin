import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import "../scss/Profile.scss"
const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    return (
        <div className="profile">
            <div className="profile__box">
                <div className="profile__box__title">Profile</div>
            </div>
        </div>
    );
};
export default Profile;