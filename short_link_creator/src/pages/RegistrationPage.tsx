import {RegistrationForm} from "../features/registration-form/RegistrationForm";
import React from "react";
import {Link} from "react-router-dom";

export const RegistrationPage: React.FC<{  }> = props => {
    return (
        <div className='registration-page flex-center-center'>
            <div className='registration '>
                <div className="text-title text-center">Registration</div>
                <RegistrationForm/>
            </div>
            <div>Have account? <Link to={'/login'} className={'link'}>Login</Link></div>

        </div>
    );
};