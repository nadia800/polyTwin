import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import UserService from "../services/user.service";
const Home = () => {
    const auth = useSelector((state) => state.auth);
    const [content, setContent] = useState("");
    let navigate = useNavigate()
    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    }, []);
    return (
        <div className="container">
            {auth.isLoggedIn ?
                <Navigate to='/boarder' />
                : <Navigate tp='/login'/>
            }

        </div>
    );
};
export default Home;