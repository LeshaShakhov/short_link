import {Field, Form, Formik, FormikErrors, FormikHelpers} from "formik";
import React, {useState} from "react";
import {login} from "./loginApi";
import cn from "classnames";
import formStyles from './LoginForm.module.css'
import CookieService from "../../cookieService";
import {useNavigate} from "react-router-dom";

export type FormValues = {
    username: string,
    password: string
}

export const LoginForm: React.FC<{  }> = props => {
    const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <h1>Login</h1>
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
                        const loginUserData = await login(values.username, values.password)
                        CookieService.set('access_token', loginUserData.access_token, {path: '/'})
                        navigate('/dashboard')
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
                        <Field
                            id="username"
                            name="username"
                            placeholder="username"
                            className={cn(formStyles.formField, {[formStyles.fieldWithError]: errors.username})}
                        />
                        {errors.username && <div>{errors.username}</div>}

                        <label htmlFor="password">Password</label>
                        <Field
                            id="password"
                            name="password"
                            placeholder="password"
                            className={cn(formStyles.formField, {[formStyles.fieldWithError]: errors.password})}
                        />
                        {errors.password && <div>{errors.password}</div>}

                        <button disabled={isSubmitting} type="submit">Submit</button>
                        {status && <div>{status.cause}</div>}
                    </Form>
                )}

            </Formik>
        </>
    )
};