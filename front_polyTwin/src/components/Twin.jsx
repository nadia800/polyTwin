//import useState hook to create menu collapse state
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const Twin = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    if (isLoggedIn === false) {
        console.log(isLoggedIn)
        return <Navigate to="/login" replace />;
    }

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            backgroundColor:"#C4C4C4"
        }}>
            
        </div>
    );
};


export default Twin;