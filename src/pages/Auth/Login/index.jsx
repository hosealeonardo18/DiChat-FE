import React, { useState } from 'react';
import FormInput from '../../../components/FormInput';
import style from './style.module.css';
import swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useUserLoginMutation } from '../../../features/auth/authApi';
import { setCredentials } from '../../../redux/reducer/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [userLogin, { isLoading, isError, isSuccess, error }] = useUserLoginMutation();

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await userLogin(login)
      .then((response) => {
        const { token, refreshToken, ...user } = response.data.data;
        dispatch(setCredentials({ user: user, token: response?.data?.data?.token }));

        if (response.data.message !== 'Login Successfull') {
          swal.fire({
            title: `${response.data.message}`,
            text: `Login Failed`,
            icon: 'error',
          });
        } else {
          swal.fire({
            title: `${response.data.message}`,
            text: `Login Success`,
            icon: 'success',
          });
          localStorage.setItem('id', response.data.data.id);
          window.location.replace('/chat');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <body>
      <div className={`container-fluid ${style.fluid}`}>
        <div className="container">
          <div className="row vh-100 d-flex justify-content-center align-items-center">
            <div className={`col-lg-4 col-md-6 p-5 ${style.wrapperCol}`}>
              <h4 className="text-center mb-5 fw-bold">Login DiChat</h4>
              <span className={style.subtitle}>Hi, Welcome back!</span>
              <form className="mt-4" onSubmit={handleSubmit}>
                <FormInput type="email" name="email" label="Email" change={handleChange} />
                <FormInput type="password" name="password" label="password" change={handleChange} />

                <a href="/forgotPassword" className={style.btnPassword}>
                  Forgot Password ?
                </a>

                <button type="submit" className={style.btnLogin}>
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
