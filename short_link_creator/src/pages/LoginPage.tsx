import {LoginForm} from "../features/login-form/LoginForm";
import React from "react";
import {Link} from "react-router-dom";

export const LoginPage: React.FC<{  }> = props => {
    return (
        <div className='login-page flex-center-center'>
            <div className='login '>
                <div className="text-title text-center">Login</div>
                <LoginForm/>
            </div>
            <div>Don't have account? <Link to={'/registration'} className={'link'}>Register</Link></div>
        </div>
    )
};