import {Field, Form, Formik, FormikErrors, FormikHelpers} from "formik";
import React, {useState} from "react";
import {register} from "./registrationApi";
import cn from "classnames";
import formStyles from './RegistrationForm.module.css'
import {login} from "../login-form/loginApi";
import CookieService from "../../cookieService";

export type FormValues = {
    username: string,
    password: string
}

export const RegistrationForm: React.FC<{  }> = props => {
    const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
    return (
        <>
            <h1>Registration</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validateOnChange={validateAfterSubmit}
                validateOnBlur={validateAfterSubmit}
                validate={values => {
                    const errors:FormikErrors<FormValues> = {};
                    if (!values.username) {
                        errors.username = 'Username is required';
                    }
                    if (!values.password) {
                        errors.password = 'Password is required';
                    }
                    return errors;
                }}
                onSubmit={async (
                    values: FormValues,
                    { setSubmitting, setStatus}: FormikHelpers<FormValues>,
                ) => {
                    try {
                        const registeredUserName = await register(values.username, values.password)
                        const loginUserData = await login(values.username, values.password)
                        console.log(loginUserData)
                        CookieService.set('access_token', loginUserData.access_token, {path: '/'})
                        console.log(CookieService.get('access_token'))
                    } catch (err){
                        setStatus(err)
                    } finally {
                        setSubmitting(false)
                    }

                }}
            >
                {({ errors, isSubmitting, handleSubmit, status}) => (
                    <Form className={'form'} onSubmit={(e) => {
                            setValidateAfterSubmit(true)
                            e.preventDefault()
                            handleSubmit()
                            return false
                        }
                    }>
                        <label htmlFor="username">Username</label>
                        <Field id="username" name="username" placeholder="username" className={cn(formStyles.formField, {[formStyles.fieldWithError]: errors.username})} />
                        {errors.username && <div>{errors.username}</div>}

                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" placeholder="password" className={cn(formStyles.formField, {[formStyles.fieldWithError]: errors.password})} />
                        {errors.password && <div>{errors.password}</div>}

                        <button disabled={isSubmitting} type="submit">Submit</button>
                        {status && <div>{status.cause}</div>}
                    </Form>
                )}

            </Formik>
        </>
    )
};