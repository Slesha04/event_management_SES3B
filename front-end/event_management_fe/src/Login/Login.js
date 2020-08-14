import React from 'react';

import './Login.css'
import HomePage from '../HomePage/HomePage';

const Login =(props) =>{
    return(
        <div className= "Login">
            <button onClick={HomePage}>Login</button>
        </div>
    )
}
export default Login;