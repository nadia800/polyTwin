import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { logout } from "../actions/authentification/auth";
import { getRealm } from '../actions/get/get';
import logo from '../images/logoPageUser.png';
import innovatwin from '../images/innovatwin.png';
import vector22 from '../images/Vector-22.png';
import vector25 from '../images/Vector-25.png';
import twin_logo from '../images/Twin_logo.png';
import Notification from '../images/Notification.png';
import profile from '../images/profileImage.png';
import dropDownImg from '../images/dropDown.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import '../scss/NavBar.scss'

const NavBar = () => {
    const dispatch = useDispatch();
    const [realm, setRealm] = useState({})
    const { user } = useSelector(state => state.auth);
    const { isLoggedIn } = useSelector(state => state.auth);
    useEffect(() => {
        if (user) {
            if (user.role_id) {
                dispatch(getRealm(user.username))
                    .then(response => {
                        setRealm(response.data[0])
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
       
    }, [])

    if (isLoggedIn === false) {
        console.log(isLoggedIn)
        return <Navigate to="/login" replace />;
    }
    
    const logoutBtm = () => {
        dispatch(logout())
    }
    return (
            <Navbar className="navbar" >
                <div className="container">
                    <div className="logo">
                        <img className="logo__img" src={logo} alt="logo" />
                        <img className="logo__innovatwin" src={innovatwin} alt="logo" />
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="NavBar">
                        <img className="NavBar__logo" src={twin_logo} alt="logo" />
                        <Link className='NavBar__link' to={{
                            pathname: '/twin'
                        }} state={realm}  >Twin</Link>
                        <img className="NavBar__logo" src={vector22} alt="logo" />
                        <Link className="NavBar__link" to={{
                            pathname: '/map'
                        }} state={realm}>Map</Link>
                        <img className="NavBar__logo" src={vector25} alt="logo" />
                        <Link className='NavBar__link' to={{
                            pathname: '/backEnd'
                        }} state={realm.realmName}  >Back-End</Link>
                        <img className="NavBar__notification" src={Notification} alt="notification" />
                        <Link  to={{
                            pathname: '/profile'
                        }} state={realm.realmName}  >
                            <img className="NavBar__profile" src={profile} alt="profile img" />
                        </Link>
                    </Nav>
                    <NavDropdown
                        title={
                            <img className="dropdown__img" src={dropDownImg} alt='dropDown' />
                        }
                        className="NavBar__dropDown"
                    >
                        {!user.role_id ? <NavDropdown.Item href="/createRealm">Realm</NavDropdown.Item> : null}
                        {user.role_id !== 2 ? <NavDropdown.Item href="/createUser" state={realm}>User</NavDropdown.Item> : null}

                        <NavDropdown.Item href="/login">
                            <input type="button" value="LogOut" onClick={logoutBtm} />
                        </NavDropdown.Item>
                    </NavDropdown>
                    </Navbar.Collapse>
                </div>
            </Navbar>
    );
};
export default NavBar;