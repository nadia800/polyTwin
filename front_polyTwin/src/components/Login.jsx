import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../actions/authentification/auth";
import { FiAlertTriangle } from "react-icons/fi"

import '../scss/Login.scss';
import LeftSide from "./LeftSideSignUp";
const required = (value) => {
    if (!value) {
        return (
            <div className="message" role="alert">
                <FiAlertTriangle />
                This field is required!
            </div>
        );
    }
};
const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    let navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    if (isLoggedIn === true) {
        return <Navigate to="/twin" replace />;
    }

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            await dispatch(login(username, password))
                .then(() => {
                    <Navigate to="/twin" replace />;
                    
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };
   
    return (
        <div className='body'>
            <LeftSide className='leftSideSign' />
            <div className="body__center">
                <h1 className="body__center__title"> Log In</h1>
                <div className='body__center__form'>
                    <Form onSubmit={handleLogin} ref={form}>
                        <label className="body__center__form__label">UserName or Email : </label>
                        <Input
                            type="text"
                            className="body__center__form__input"
                            name="username"
                            placeholder='UserName or Email'
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                        <label className="body__center__form__label">Password : </label>
                        <Input
                            type="password"
                            className="body__center__form__input"
                            name="password"
                            placeholder='Password'
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />

                        <div >
                            <button style={{
                                borderRadius: '10px',
                                backgroundColor: '#ffa938'
                            }} className="body__center__form__button" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                                <span>Log In</span>
                            </button>
                        </div>
                        <div className="body__center__pass">
                            <div className='body__center__pass__remember'>
                                <input type="checkbox" id="rememberMe" name='rememberMe' />
                                <label>Remember Me</label>
                            </div>
                            <div className='body__center__pass__forgetPass' onClick={() =>
                                navigate("/forgetpassword")
                            }>
                                Forget password?
                            </div>
                        </div>
                        {message && (
                            <div className="alert">
                                <div className="alert__div">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            </div>
        </div>
    );
};
function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);