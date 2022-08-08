import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { register } from "../actions/authentification/auth";
//Phone Input 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../scss/SignUp.scss";

import { FiAlertTriangle } from "react-icons/fi"

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.userName){
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
    errors.lastName = 'All input must be 2 characters or more';
  }
  if (!values.jobTitle) {
    errors.jobTitle = 'Required';
  } else if (values.jobTitle.length < 2) {
    errors.jobTitle = 'All input must be 2 characters or more';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.jobTitle = 'Password must be 8 characters or more';
  }
  if (!values.nameCompany) {
    errors.nameCompany = 'Required';
  }
  if (!values.country) {
    errors.country = 'Required';
    }
  if (!values.realm) {
        errors.realm = 'Required';
    }
    if (!values.licenseAgreement) {
        errors.licenseAgreement = 'Please Accept  License Agreement';
    }
  return errors;
};

function SignUp({ route }) {
   
   const dispatch = useDispatch();
    let navigate = useNavigate();
    const { state } = useLocation();
    const [message, setMessage] = useState("")
    const { isLoggedIn } = useSelector(state => state.auth);

  const formik = useFormik({
    initialValues: {
          email: '',
          password: '',
          userName: '',
          firstName: '',
          lastName: '',
          jobTitle: '',
          phone: '',
          nameCompany: '',
          country: '',
          city: '',
          state: '',
          posteCode: '',
          licenseAgreement: false,
          marketingEmail: false
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

    if (isLoggedIn === false) {
        console.log(isLoggedIn)
        return <Navigate to="/login" replace />;
    }
    const sign = () => {
        console.log(state.realm)
        dispatch(register(formik.values.userName,
                    state.realm,
                    formik.values.email,
                    formik.values.password,
                    formik.values.firstName,
                    formik.values.lastName,
                    formik.values.phone,
                    formik.values.jobTitle,
                    formik.values.nameCompany,
                    formik.values.country,
                    formik.values.city,
                    formik.values.state,
                    formik.values.posteCode
                ))
            .then(response => {
                if (!response.error) {
                    navigate("/createRealm")
                } else {
                    setMessage(response.message)
                }
                  
                })
                .catch((err) => {
                    return err
                });
       
    }
    return (
       
       <div className='Sign'>
          <div className='Sign__box'>
                <div className='Sign__box__title'>Create Account</div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='Sign__box__sidebyside'>
                        <div className='Sign__box__sidebyside__left'>
                            <label htmlFor="email" className='Sign__box__sidebyside__label'>E-mail (Required):</label>
                            <br />
                            <input
                                className='Sign__box__sidebyside__input'
                              id="email"
                              name="email"
                              type="email"
                              onChange={formik.handleChange}
                              value={formik.values.email}
                            />
                            {formik.touched.email ? formik.errors.email ?
                                <div className="message">
                                    <FiAlertTriangle />
                                    {formik.errors.email}
                                </div> : null: null}
                            <label htmlFor="userName" className='Sign__box__sidebyside__label'>UserName (Required):</label>
                            <br/>
                            <input
                                className='Sign__box__sidebyside__input'
                                id="userName"
                                name="userName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.userName}
                            />
                            {formik.touched.userName ? formik.errors.userName ?
                                <div className="message">
                                    <FiAlertTriangle />
                                    {formik.errors.userName}
                                </div> : null: null}
                            <label htmlFor="firstName" className='Sign__box__sidebyside__label'>First Name (Required):</label>
                            <br/>
                            <input
                                className='Sign__box__sidebyside__input'
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                            {formik.touched.firstName ? formik.errors.firstName ?
                                <div className="message">
                                    <FiAlertTriangle />
                                    {formik.errors.firstName}
                                </div> : null: null}
                            <label htmlFor="lastName" className='Sign__box__sidebyside__label'>Last Name (Required):</label>
                            <br/>
                            <input
                                className='Sign__box__sidebyside__input'
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                            />
                            {formik.touched.lastName ? formik.errors.lastName ?
                                <div className="message">
                                    <FiAlertTriangle />
                                    {formik.errors.lastName}
                                </div> : null: null}
                            <label htmlFor="password" className='Sign__box__sidebyside__label'>Password (Required):</label>
                            <br />
                            <input
                                className='Sign__box__sidebyside__input'
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {formik.touched.password ? formik.errors.password ?
                                <div className="message">
                                    <FiAlertTriangle />
                                    {formik.errors.password}
                                </div> : null: null}
                            <label htmlFor="password" className='Sign__box__sidebyside__label'>Repeat Password (Required):</label>
                            <br />
                            <input
                                className='Sign__box__sidebyside__input'
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        <div className='Sign__box__sidebyside__right'>
                            <label htmlFor="jobTitle" className='Sign__box__sidebyside__label'>Job Title (Required):</label>
                            <br />
                            <input
                                className='Sign__box__sidebyside__input'
                                id="jobTitle"
                                name="jobTitle"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.jobTitle}
                            />
                            {formik.touched.jobTitle ? formik.errors.jobTitle ?
                                <div className="message">
                                    <FiAlertTriangle />
                                    {formik.errors.jobTitle}
                                </div> : null: null}
                            <br/>
                            <label htmlFor="phone" className='Sign__box__sidebyside__label'>Phone:</label>
                            <br />
                            <PhoneInput
                                id='phone'
                                country={'tn'}
                                value={formik.values.phone}
                                onChange={e => formik.setFieldValue("phone", e)}
                                onBlur={formik.handleBlur("phone")}

                            />
                            <div className='sousTitle'>Company / Organization</div>
                            <label htmlFor='nameCompany' className='Sign__box__sidebyside__label'>Name (Required):</label>
                            <br />
                            <input
                                className='Sign__box__sidebyside__input'
                                id="nameCompany"
                                name="nameCompany"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.nameCompany}
                            />
                            {formik.touched.nameCompany ? formik.errors.nameCompany ?
                                <div className="message">
                                    <FiAlertTriangle />
                                    {formik.errors.nameCompany}
                                </div> : null: null}
                            <div className='sousTitle'>Address</div>
                            <div className="Sign__sousBox__sidebyside">
                                <div className="Sign__sousBox__sidebyside__left">
                                    <label htmlFor='country' className='Sign__box__sidebyside__label'>Country (Required):</label>
                                    <br />
                                    <input
                                        className='Sign__sousBox__sidebyside__input'
                                        id='country'
                                        name='country'
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.country}
                                    />
                                    {formik.touched.country ? formik.errors.country ?
                                        <div className="message">
                                            <FiAlertTriangle />
                                            {formik.errors.country}
                                        </div> : null: null}
                                    <label htmlFor='state' className='Sign__box__sidebyside__label'>State/Province:</label>
                                    <br />
                                    <input
                                        className='Sign__sousBox__sidebyside__input'
                                        id='state'
                                        name='state'
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.state}
                                    />
                                </div>
                                <div className="Sign__sousBox__sidebyside__right">
                                    <label htmlFor='city' className='Sign__box__sidebyside__label'>City:</label>
                                    <br />
                                    <input
                                        className='Sign__sousBox__sidebyside__input'
                                        id='city'
                                        name='city'
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.city}
                                    />
                                    <br />
                                    <label htmlFor='posteCode' className='Sign__box__sidebyside__label'>Poste Code:</label>
                                    <br />
                                    <input
                                        className='Sign__sousBox__sidebyside__input'
                                        id='posteCode'
                                        name='posteCode'
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.posteCode}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkbox">
                        <input
                            className="checkbox__input"
                            type="checkbox" 
                            id="checkboxliscence"
                            onChange={formik.handleChange}
                            value={formik.values.licenseAgreement}
                        />
                        <label className="checkbox__label">I accept the <a className="checkbox__label__a">End user License Agreement</a></label>
                        <br/>
                        <input 
                            type="checkbox" 
                            id="checkboxemail"
                            onChange={formik.handleChange}
                            value={formik.values.marketingEmail}
                        />
                        <label className="checkbox__label">I would like to receive marketing emails</label>
                    </div>
                <div className="signup__button">
                        <input
                            className='signup__button__cancled'
                            type="button"
                            value="Cancel"
                            onClick={() => {
                                navigate('/')
                            }}
                        />
                        <input
                            className='signup__button__submit'
                            type="submit" 
                            value="Submit" 
                            onClick={() => sign()}
                        />
                    
                </div>
                </form>
                <div>{message}</div>
       </div>
</div>
);
}

export default SignUp;