import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css';
import axios from 'axios';
import swal from 'sweetalert2';

const CardListContact = (props) => {
  const [contact, setContact] = useState([]);
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user`)
      .then((res) => {
        setContact(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddContact = (idPeople) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/contact`,
        { id_people: idPeople },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message !== 'Contact Added!') {
          swal.fire({
            title: `${res.data.message}`,
            text: `Add Contact Failed`,
            icon: 'error',
          });
        } else {
          swal.fire({
            title: `${res.data.message}`,
            text: `Login Success`,
            icon: 'success',
          });
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('id', res.data.data.id);
          localStorage.setItem('fullname', res.data.data.fullname);
          window.location.replace('/chat');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ul className={style.listsCard}>
        {contact.map((data) => {
          if (data.id !== id) {
            return (
              <li className={`mb-3 ${style.listMessage}`}>
                <div className={style.wrapper}>
                  <img src={props.image} alt="img" className={style.imgMessage} />
                </div>

                <div className={style.wrapperName}>
                  <p className={style.titleName}>{data.fullname}</p>

                  <button
                    type="button"
                    className={style.wrapperAdd}
                    onClick={() => {
                      handleAddContact(data.id);
                    }}
                  >
                    Add Contact
                  </button>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default CardListContact;
