import React from 'react';
import style from './style.module.css';
import FormInput from '../../../components/FormInput';

const Register = () => {
  return (
    <div className={`container-fluid ${style.fluid}`}>
      <div className="container">
        <div className="row vh-100 d-flex justify-content-center align-items-center">
          <div className={`col-lg-4 col-md-6 p-5 ${style.wrapperCol}`}>
            <div className="col-lg-12 col-md-12  position-relative">
              <button type="button" className={style.buttonBack} onClick={() => window.location.replace('/login')}>
                <i className="bi bi-chevron-left" />
              </button>
              <h4 className="text-center mb-5 fw-bold">Register DiChat</h4>
            </div>
            <span className={style.subtitle}>Let’s create your account!</span>
            <form className="mt-4">
              <FormInput type="text" name="Fullname" label="Fullname" />

              <FormInput type="email" name="email" label="Email" />

              <FormInput type="password" name="password" label="Password" />

              <button type="button" className={`mt-3 ${style.btnLogin}`}>
                Login
              </button>

              <p className={`mb-4 ${style.titleSSO}`}>Register With</p>

              <button type="button" className={style.btnLoginSSO}>
                <i className="bi bi-google me-3" /> Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
