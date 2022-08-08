import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { logout } from "./actions/authentification/auth";
import EventBus from "./common/EventBus";
//Authentification Interfaces
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgetPass from "./components/ForgetPass";

//Bar
import SlideBar from "./components/SlideBar";
import NavBar from "./components/NavBar";

//Boarder Interfaces
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import Map from "./components/Map";
import BackEnd from "./components/BackEnd";

//Twin Interface
import Twin from "./components/Twin";
import WebMasterTwin from "./components/WebMasterTwin";
import CreateRealm from "./components/CreateRealm";
import CreateUser from "./components/CreateUser";

//Twin  User Interfaces
import ProjectInsights from "./components/twinElements/ProjectInsights";
import Dashboard from "./components/twinElements/Dashboard";
import DataExport from "./components/twinElements/DataExport";
import HistoryLogs from "./components/twinElements/HistoryLogs";
import ProjectDevices from "./components/twinElements/ProjectDevices";
import AddInsight from "./components/twinElements/AddInsight";

import { clearMessage } from "./actions/authentification/message";
import { history } from "./helpers/history";
import { PrivateRoute } from './components/PrivateRoute';
import AuthVerify from "./common/auth-verify";
import SlideBarMaster from "./components/SlideBarMaster";



const App = (props) => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector(state => state.auth);
    useEffect(() => {
        //To create Browser History
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        })
        EventBus.on("logout", () => {
            logOut();
        });
        return () => {
            EventBus.remove("logout");
        }
    }, [dispatch]);

    const logOut= () => {
        dispatch(logout());
    }
    return (
        <div>
        <Router history={history}>
                <div>
                    {isLoggedIn ? < NavBar />: null}
                    {
                        isLoggedIn && user && user.role_id === 0 ? <SlideBarMaster /> : null
                    }

                    {
                        isLoggedIn && user && user.role_id !== 0  ? <SlideBar /> : null
                    }

                    <Routes>
                        <>
                            <Route exact path="/" element={<Twin />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/forgetpassword" element={<ForgetPass />} />
                        </>
                        <>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/boarder" element={<BoardUser />} />
                            <Route path="/map" element={<Map />} />
                            <Route path="/backEnd" element={<BackEnd />} />
                        </>
                        <>
                            <Route path="/twin" element={<Twin />} />
                            <Route path="/twinMaster" element={<WebMasterTwin />} />
                        </>
                        <>
                            <Route path="/twin/projectInsights" element={<ProjectInsights />} />
                            <Route path="/projectDevices" element={<ProjectDevices />} />
                            <Route path="/dataExports" element={<DataExport />} />
                            <Route path="/historyLogs" element={<HistoryLogs />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/createRealm" element={<CreateRealm />} />
                            <Route path="/addInsight" element={<AddInsight />} />
                            <Route path="/createUser" element={<CreateUser />} />
                        </>
                    </Routes>
                    <AuthVerify logOut={logOut} history={history} />
                </div>
                
            </Router>
            
        </div>
    );
};

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}


export default connect(mapStateToProps)(App);
