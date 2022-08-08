import React, { useLayoutEffect, useState } from "react";
import { useFormik } from 'formik';
import "../scss/CreateUser.scss";
import { getAllRealms } from '../actions/get/get';
import { addUser } from '../actions/openRemoteAPI/api';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { getRealm } from '../actions/get/get';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { FiAlertTriangle } from "react-icons/fi"


const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.userName) {
        errors.userName = 'Required';
    }
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 10) {
        errors.firstName = 'All input must be 10 characters or less';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length < 2) {
        errors.lastName = 'All input must be 2 characters or less';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be 8 characters or more';
    }
   
 
    return errors;
};

const CreateUser = () => {
    const { user } = useSelector(state => state.auth);
    const { isLoggedIn } = useSelector(state => state.auth);
    const [realmList, setRealmList] = useState([]);
    const [realmName, setRealmName] = useState("");
    const [serviceAccount, setServiceAccount] = useState('')
    const [role, setRole] = useState(true)
    const [message, setMessage] = useState("")
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            userName: '',
            firstName: '',
            lastName: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const dispatch = useDispatch();
    useLayoutEffect(function () {
        if (isLoggedIn) {
            if (user.role_id === 0) {
                dispatch(getAllRealms())
                    .then((data) => {
                        setRealmList([...realmList, ...data.data])
                    })
            } else {
                dispatch(getRealm(user.username))
                    .then(response => {
                        setRealmName(response.data[0].realmName)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
        

    }, []);

    if (isLoggedIn === false) {
        console.log(isLoggedIn)
        return <Navigate to="/login" replace />;
    }
    const createUser = () => {
        let roles;
        if (role) {
            roles = 2;
        } else {
            roles = 3;
        }
        dispatch(addUser(realmName,
            formik.values.email,
            formik.values.firstName,
            formik.values.lastName,
            formik.values.password,
            formik.values.userName,
            roles,
            serviceAccount))
            .then(response => {
                setMessage(response.message)
                console.log(response.message)
            })
    }
    
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#C4C4C4",
            paddingTop: "60px",
        }}>
            <div className="createUser">
                <div className="createUser__title">Create User </div>
                <form onSubmit={formik.handleSubmit}>
                <div className="createUser__sidebyside">
                    <div className="createUser__sidebyside__left">
                        
                        <label htmlFor="email" className='createUser__label'>E-mail (Required):</label>
                        <br />
                        <input
                            className='createUser__input'
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                        />
                            {formik.touched.email ? formik.errors.email ?
                                <div className="message">
                                    <FiAlertTriangle />
                                    {formik.errors.email}
                                </div>
                            : null : null}
                        <label htmlFor="firstName" className='createUser__label'>First Name (Required):</label>
                        <br />
                        <input
                            className='createUser__input'
                            id="firstName"
                            name="firstName"
                            type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                        />
                            {formik.touched.firstName ? formik.errors.firstName ?
                            <div className="message">
                                <FiAlertTriangle />
                                {formik.errors.firstName}
                            </div> : null: null}
                        <label htmlFor="password" className='createUser__label'>Password (Required):</label>
                        <br />
                        <input
                            className='createUser__input'
                            id="password"
                            name="password"
                            type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                            {formik.touched.password ? formik.errors.password ?
                            <div className="message">
                                <FiAlertTriangle />
                                {formik.errors.password}
                            </div> : null: null}
                        <label htmlFor="password" className='createUser__label'>Role:</label>
                        <FormGroup>
                            <FormControlLabel 
                                control={<Switch defaultChecked />}
                                label="Add Insight"
                                onChange={(e) => {
                                    setRole(e.target.checked)
                                }}
                            />
                        </FormGroup>
                        {user.role_id === 0 ?
                            <div>
                                <label className="createUser__label">Select Realm:</label>
                                <br/>
                                <select
                                    className="createUser__input"
                                    id="realm"
                                    onChange={(e) => {
                                        setRealmName(e.target.value)
                                    }}
                                >
                                    <option value="null">Choose a Realm</option>
                                    {realmList.map((realm, index) =>
                                        <option key={index} value={realm.realmName}>{realm.realmName}</option>
                                    )}
                                </select>
                            </div> : null
                        }
                    </div>
                    <div className="createUser__sidebyside__right">
                        <label htmlFor="userName" className='createUser_label'>UserName (Required):</label>
                        <br />
                        <input
                            className='createUser__input'
                            id="userName"
                            name="userName"
                            type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            value={formik.values.userName}
                            />
                            {formik.touched.userName && formik.errors.userName ?
                            <div className="message">
                                <FiAlertTriangle />
                                {formik.errors.userName}
                            </div> : null}
                        <label htmlFor="lastName" className='createUser__label'>Last Name (Required):</label>
                        <br />
                        <input
                            className='createUser__input'
                            id="lastName"
                            name="lastName"
                            type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            />
                            {formik.touched.lastName ? formik.errors.lastName ?
                            <div className="message">
                                <FiAlertTriangle />
                                {formik.errors.lastName}
                            </div> : null: null}
                        <br />
                        <label htmlFor="service" className='createUser__label' style={{ marginTop: '15px' }}>Type of Service (Required):</label>
                        <div className="createUser__checkbox">
                            <input type="radio"
                                name="checkbox"
                                
                                id="Check1"
                                value={true}
                                onChange={(e) => {
                                    setServiceAccount(true)
                                }}
                            /> <label className="createUser__label"> Service Account </label>
                            <br />
                            <input type="radio"
                                name="checkbox"
                                className="createUser_label"
                                id="Check2"
                                value={false}
                                onChange={(e) => {
                                    setServiceAccount(false)
                                }}
                            /> <label className="createUser__label">Regular Account</label>
                        </div>
                        
                    </div>
                </div>
                <div className="createUser__button">
                    <input type="submit"
                        value="CANCLED"
                        className="createUser__button__cancled"
                        variant="secondary"

                    />

                    <input type="submit"
                        variant="primary"
                        value="ADD"
                        className="createUser__button__add"
                        onClick={(e) => createUser()}
                    />

                </div>
                    <div>{message}</div>
                     </form>
                </div>
        </div>
    )
}

export default CreateUser;