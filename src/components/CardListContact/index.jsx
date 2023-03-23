import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css';
import axios from 'axios';

const CardListContact = (props) => {
  const [contact, setContact] = useState([]);
  const id = localStorage.getItem('id');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`)
      .then((res) => {
        // console.log(res.data.data);
        setContact(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ul className={style.listsCard}>
        {contact.map((data) => {
          if (data._id !== id) {
            return (
              <li className={`mb-3 ${style.listMessage}`}>
                <div className={style.wrapper}>
                  <img src={props.image} alt="img" className={style.imgMessage} />
                </div>

                <div className={style.wrapperName}>
                  <p className={style.titleName}>{data.fullname}</p>

                  <button className={style.wrapperAdd}>Add Contact</button>
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
