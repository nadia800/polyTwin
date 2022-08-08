import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NavBar from "./NavBar";

const BoardUser = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    console.log(isLoggedIn)
    let navigate = useNavigate()
    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div>
            welcome
        </div>
    );
};
export default BoardUser;