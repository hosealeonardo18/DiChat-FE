import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import style from './style.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import { useGetAllUserQuery } from '../../features/users/userApi';
import { useCreateMessageMutation } from '../../features/messages/messageApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/reducer/authSlice';

const { v4: uuidv4 } = require('uuid');

const Message = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const idSender = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const image = localStorage.getItem('image');
  const [detailProfile, setDetailProfile] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    message: '',
  });

  const { data: user } = useGetAllUserQuery();
  const { data: userLogin, isSuccess } = useGetUserProfileQuery();
  const [createMessage] = useCreateMessageMutation();

  const [socket, setSocket] = useState(null);

  const now = new Date();
  const current = now.getHours() + ':' + now.getMinutes();
  // change input
  const handleChangeMessage = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  // create Message
  const handleCreateMessage = async (e) => {
    e.preventDefault();

    if (!message.message) {
    } else {
      await createMessage(message, id)
        .then((res) => {
          const { token, refreshToken, ...user } = res.data.data;
          dispatch(setCredentials({ user: user, token: res?.data?.data?.token }));
          console.log(res);
        })
        .catch((err) => console.log(err));
      // axios
      //   .post(`${process.env.REACT_APP_BACKEND_URL}/message/${id}`, message, { headers: { Authorization: `Bearer ${token}` } })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => console.log(err));
    }

    socket.emit('sendMessage', { id_sender: idSender, id_receiver: id, message: message?.message, created_at: current });
    setMessage('');
  };

  // getUser & get message
  useEffect(() => {
    // get detail user
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
      .then((res) => {
        setDetailProfile(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // get message
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/message/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setMessages(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // socket io
  useEffect(() => {
    const result = io(process.env.REACT_APP_BACKEND_URL);
    setSocket(result);
    if (socket) {
      socket.off('incoming');
      result.on('incoming', async (message) => {
        console.log('new Message coming');
        console.log(message);
        if ((message?.id_receiver === id && message?.id_sender === idSender) || (message?.id_receiver === idSender && message?.id_sender === id)) {
          const id = uuidv4();
          message.id = id;
          setMessages((current) => [...current, message]);
        }
        setMessage('');
      });
    }
  }, []);

  useEffect(() => {
    if (socket) {
      console.log('entry user');
      console.log(userLogin);
      if (userLogin) {
        socket.emit('present', userLogin?.id);
      }
      socket.on('online', (data) => {
        console.log('reaching user online');
        dispatch({ type: 'UPDATE_ONLINE', payload: data });
      });
    }
  }, [socket, userLogin]);

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
                  if (data?.id_sender == idSender) {
                    return (
                      <li className={style.listMessageMe}>
                        <div className={style.wrapperCardMe}>
                          <span className={style.messageEx}>{data?.message}</span>
                          <hr className="my-2" />
                          <p className={`mt-1 text-end mb-0 ${style.timeMessage}`}>{data?.created_at}</p>
                        </div>
                        <img src={image} alt="img" className={style.imageDetail} />
                      </li>
                    );
                  } else {
                    return (
                      <li className={style.listMessageEx}>
                        <img src={detailProfile.image} alt="img" className={style.imageDetail} />
                        <div className={style.wrapperCard}>
                          <span className={style.messageEx}>{data?.message}</span>
                          <hr className="my-2" />
                          <p className={`mt-1 text-end mb-0 ${style.timeMessage}`}>{data?.created_at}</p>
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
