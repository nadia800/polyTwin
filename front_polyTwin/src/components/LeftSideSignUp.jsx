import React  from 'react';
import image from '../images/image.png';
import facebook from '../images/Facebook.png';
import google from '../images/Google_plus.png';
import instagram from '../images/Instagram.png';
import linkedin from '../images/Linkedin.png';
import playStore from '../images/Play_store.png';
import whatsapp from '../images/Whatsapp.png';
import youtube from '../images/youtube.png';
import logo from '../images/logo.png';

import "../scss/leftSide.scss";
function LeftSide() {
    return (
        <div className='leftSide'>
            <img className="leftSide__logo" src={logo} alt="this is innovatwin logo" />
            <div className='leftSide__welcome'>Welcome !</div>
            <div className='leftSide__title'>Sign up for your account on <b>INNOVATWIN</b> platforme </div>
            <img className="leftSide__image" src={image} alt="this is innovatwin logo" />
            <div className='leftSide__copyright'>Copyright 2022- INNOVATWIN SARL- All Rights Reserved</div>
            <div className='leftSide__frame'>
                <a href="default.asp">
                    <img src={facebook} alt="Facebook" />
                </a>
                <a href="default.asp">
                    <img src={google} alt="google" />
                </a>
                <a href="default.asp">
                    <img src={instagram} alt="instagram" />
                </a>
                <a href="default.asp">
                    <img src={linkedin} alt="linkedin" />
                </a>
                <a href="default.asp">
                    <img src={playStore} alt="play_store" />
                </a>
                <a href="default.asp">
                    <img src={whatsapp} alt="whatsapp" />
                </a>
                <a href="default.asp">
                    <img src={youtube} alt="youtube" />
                </a>
            </div>
        </div>
     )
}

export default LeftSide;