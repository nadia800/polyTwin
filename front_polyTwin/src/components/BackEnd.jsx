import React from 'react';
import { useDispatch, useSelector } from "react-redux";

function BackEnd() {
    const { user } = useSelector(state => state.auth);
    var realmName = user.role_id ? user.realmName : null
    if (realmName) {
        const URL = 'https://34.154.90.86/manager/?realm=' + realmName
        window.open(URL, "_self");
    } else {
        const URL = 'https://34.154.90.86/manager/?realm=master'
        window.open(URL, "_self");
    }
    
    return null
}
 
export default BackEnd;