import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import SideBarTemplate from '../../components/TemplateComponen/SideBar';
import axios from 'axios';

const Template = () => {
  const id = localStorage.getItem('id');
  const [users, setUsers] = useState([]);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
      .then((res) => {
        setUsers(res.data.data);
        setContact(res.data.data.contacts);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className={style.flexContainer}>
      <SideBarTemplate contact={contact} data={users} />

      <div className={style.rightContent}>
        <div className="wrapper vh-100 d-flex d-flex align-items-center justify-content-center text-center">
          <div className="">
            <h3 className="mb-5">Welcome Back, Hosea Leonardo</h3>
            <p className=" text-center">Please select a chat to start messaging</p>
            <div className={style.wrapperButton}>
              <button type="button" className={style.buttonJoin}>
                Join Group
              </button>
              <button type="button" className={style.buttonNewChat}>
                New Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
