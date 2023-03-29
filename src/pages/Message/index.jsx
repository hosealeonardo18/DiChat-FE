import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import style from './style.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Message = () => {
  const { id } = useParams();
  const idSender = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const image = localStorage.getItem('image');
  const [detailProfile, setDetailProfile] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    message: '',
  });

  // change input
  const handleChangeMessage = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  // create Message
  const handleCreateMessage = (e) => {
    e.preventDefault();

    if (!message.message) {
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/message/${id}`, message, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    // get detail user
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
      .then((res) => {
        setDetailProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // get message
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/message/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <body className={style.colBg}>
      <div className="container-fluid vh-100">
        <div className="row">
          <div className={`col-md-3 vh-100 ${style.col}`}>
            <Sidebar />
            {/* chat list */}
          </div>

          <div className="col-md-9 p-0">
            <div className={style.navbar}>
              <div className={style.wrapperDetail}>
                <img src={detailProfile.image} alt="" className={style.imageDetail} />
                <div className={style.wrapperName}>
                  <p className={style.titleName}>{detailProfile.fullname}</p>
                  <span className={style.statusDetail}>Online</span>
                </div>
              </div>

              <div className={style.wrapperButtonNavbar}>
                <button className={style.buttonOption}>
                  <i className="bi bi-camera-video" />
                </button>
                <button className={style.buttonOption}>
                  <i className="bi bi-telephone" />
                </button>
              </div>
            </div>

            <div className={style.mainContent}>
              <ul className={style.listsMessageEx}>
                {/* sender */}
                {messages?.map((data) => {
                  if (data.id_sender == idSender) {
                    return (
                      <li className={style.listMessageMe}>
                        <div className={style.wrapperCardMe}>
                          <span className={style.messageEx}>{data.message}</span>
                          <hr className="my-2" />
                          <p className={`mt-1 text-end mb-0 ${style.timeMessage}`}>{data.created_at}</p>
                        </div>
                        <img src={image} alt="img" className={style.imageDetail} />
                      </li>
                    );
                  } else {
                    return (
                      <li className={style.listMessageEx}>
                        <img src={detailProfile.image} alt="img" className={style.imageDetail} />
                        <div className={style.wrapperCard}>
                          <span className={style.messageEx}>{data.message}</span>
                          <hr className="my-2" />
                          <p className={`mt-1 text-end mb-0 ${style.timeMessage}`}>{data.created_at}</p>
                        </div>
                      </li>
                    );
                  }
                })}

                {/* me */}
              </ul>
            </div>
            <div className={style.footerMain}>
              <form onSubmit={handleCreateMessage}>
                <input className={style.inputMessage} type="text" placeholder="Type a message" name="message" value={message.message} onChange={handleChangeMessage} />
                <button type="submit" className={style.buttonSend}>
                  <i className="bi bi-send" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Message;
