import React from 'react';
import FormInput from '../../../components/FormInput';
import style from './style.module.css';

const Login = () => {
  return (
    <body>
      <div className={`container-fluid ${style.fluid}`}>
        <div className="container">
          <div className="row vh-100 d-flex justify-content-center align-items-center">
            <div className={`col-lg-4 col-md-6 p-5 ${style.wrapperCol}`}>
              <h4 className="text-center mb-5 fw-bold">Login DiChat</h4>
              <span className={style.subtitle}>Hi, Welcome back!</span>
              <form className="mt-4">
                <FormInput type="email" name="email" label="Email" />
                <FormInput type="password" name="password" label="password" />

                <a href="/forgotPassword" className={style.btnPassword}>
                  Forgot Password ?
                </a>

                <button type="button" className={style.btnLogin}>
                  Login
                </button>

                <p className={`mb-4 ${style.titleSSO}`}>Login With</p>

                <button type="button" className={style.btnLoginSSO}>
                  <i className="bi bi-google me-3" /> Google
                </button>

                <p className={`${style.titleRegister}`}>
                  Don’t have an account?{' '}
                  <a href="/register" className={style.btnRegister}>
                    Sign Up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
