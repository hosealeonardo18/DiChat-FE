import React, { useState } from 'react';
import style from './style.module.css';
import FormInput from '../../../components/FormInput';
import axios from 'axios';
import swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useUserRegisterMutation } from '../../../features/auth/authApi';
import { setCredentials } from '../../../redux/reducer/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [userRegister, { isLoading, isError, isSuccess, error }] = useUserRegisterMutation();
  const [register, setRegister] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/auth/register`, register)
      .then((response) => {
        if (response.data.message !== 'Register Users Success!') {
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
          window.location.replace('/login');
        }
      })
      .catch((err) => console.log(err));

    // await userRegister(register)
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data.message !== 'Register Users Success!') {
    //       swal.fire({
    //         title: `${response.data.message}`,
    //         text: `Login Failed`,
    //         icon: 'error',
    //       });
    //     } else {
    //       swal.fire({
    //         title: `${response.data.message}`,
    //         text: `Login Success`,
    //         icon: 'success',
    //       });
    //       window.location.replace('/login');
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

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
            <form className="mt-4" onSubmit={handleSubmit}>
              <FormInput id="fullname" type="text" name="fullname" label="Fullname" change={handleChange} />

              <FormInput id="email" type="email" name="email" label="Email" change={handleChange} />

              <FormInput id="password" type="password" name="password" label="Password" change={handleChange} />

              <button type="submit" className={`mt-3 ${style.btnLogin}`}>
                Regiter
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
