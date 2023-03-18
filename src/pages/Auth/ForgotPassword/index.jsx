import React from 'react';
import FormInput from '../../../components/FormInput';
import style from './style.module.css';

const ForgotPassword = () => {
  return (
    <div className={`container-fluid ${style.fluid}`}>
      <div className="container">
        <div className="row vh-100 d-flex justify-content-center align-items-center">
          <div className={`col-lg-4 col-md-6 p-5 ${style.wrapperCol}`}>
            <div className="col-lg-12 col-md-12  position-relative">
              <button type="button" className={style.buttonBack} onClick={() => window.location.replace('/login')}>
                <i className="bi bi-chevron-left" />
              </button>
              <h4 className="text-center mb-5 fw-bold">Forgot Password</h4>
            </div>
            <span className={style.subtitle}>You’ll get messages soon on your e-mail </span>
            <form className="mt-4">
              <FormInput type="text" name="email" label="Email" />

              <button type="button" className={`mt-3 ${style.btnLogin}`}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
