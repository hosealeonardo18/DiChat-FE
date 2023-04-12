import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const ListMessage = (props) => {
  const id = props.id;
  const token = localStorage.getItem('token');

  const handleDelete = (idUser) => {
    Swal.fire({
      title: 'Are you sure Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_BACKEND_URL}/contact/${idUser}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            console.log(res.data.data);
            Swal.fire('Deleted!', `${res.data.message}`, 'success');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <>
      <ul className={style.listsCard}>
        <li className={style.listMessage}>
          {/* <Link to={`/template/chat/${id}`} className={style.listMessage}> */}
          <div className={style.wrapper}>
            <img src={props.image} alt="img" className={style.imgMessage} />
          </div>
          <div className={style.wrapperName}>
            <Link to={`/message/${id}`} className={style.cardList}>
              <div className={style.wrapperNameDate}>
                <p className={style.titleName}>{props.name}</p>
                <p className={style.time}>{props.time}</p>
              </div>
            </Link>

            <div className="btn-group">
              <button className={`${style.buttonDelete}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-three-dots-vertical" />
              </button>
              <ul className="dropdown-menu text-center">
                <button className={`${style.buttonDelete}`} type="button" onClick={() => handleDelete(props.id_contact)}>
                  <i className="bi bi-trash-fill" />
                </button>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ListMessage;
