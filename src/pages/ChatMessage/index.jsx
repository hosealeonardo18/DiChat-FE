import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import SideBarTemplate from '../../components/TemplateComponen/SideBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';

const { v4: uuidv4 } = require('uuid');

const ChatMessage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const idlogin = localStorage.getItem('id');
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  const [detailProfileChat, setDetailProfile] = useState([]);
  const [dataLogin, setDataLogin] = useState([]);

  // Input message
  const [message, setMessage] = useState({
    message: '',
  });

  // State all message
  const [messages, setMessages] = useState([]);

  // socket
  const [socket, setSocket] = useState(null);

  // date now
  const now = new Date();
  const current = now.getHours() + ':' + now.getMinutes();

  // get contact & get detail profile
  useEffect(() => {
    // setContact
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${idlogin}`)
      .then((res) => {
        setContact(res?.data?.data?.contacts);
        setDataLogin(res?.data?.data);
      })
      .catch((err) => console.log(err));

    // cek detail Profile message
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
      .then((res) => {
        setDetailProfile(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // get All message
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // change input
  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  // Hit Button Send Message
  const handleCreateMessage = async (e) => {
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

    socket.emit('sendMessage', { id_sender: idlogin, id_receiver: id, message: message?.message, created_at: current });
    setMessage('');
  };

  // socket io
  useEffect(() => {
    const result = io(process.env.REACT_APP_BACKEND_URL);
    setSocket(result);

    if (socket) {
      socket.off('incoming');
      socket.on('incoming', async (message) => {
        console.log('new Message coming');
        console.log(message);
        if ((message?.id_receiver === id && message?.id_sender === idlogin) || (message?.id_receiver === idlogin && message?.id_sender === id)) {
          const id = uuidv4();
          message.id = id;
          setMessages((current) => [...current, message]);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (socket) {
      console.log('entry user');
      console.log(dataLogin);
      if (dataLogin) {
        socket.emit('present', dataLogin?.id);
      }
      socket.on('online', (data) => {
        console.log('reaching user online');
        dispatch({ type: 'UPDATE_ONLINE', payload: data });
      });
    }
  }, [socket, dataLogin]);

  return (
    <div className={style.flexContainer}>
      <SideBarTemplate contact={contact} data={dataLogin} />

      <div className={style.rightContent}>
        <div className={style.navbar}>
          <div className={style.wrapperDetail}>
            <img src={detailProfileChat.image} alt="img" className={style.imageDetail} />
            <div className={style.wrapperName}>
              <p className={style.titleName}>{detailProfileChat.fullname}</p>
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
            {messages.map((data) =>
              data.id_sender == idlogin ? (
                <li className={style.listMessageMe}>
                  <div className={style.wrapperCardMe}>
                    <p className={`m-0 ${style.messageEx}`}>{data.message}</p>
                    <span className={`mt-2 text-end mb-0 ${style.timeMessage}`}>{data.created_at}</span>
                  </div>
                  <img src={dataLogin.image} alt="img" className={style.imageDetail} />
                </li>
              ) : (
                <li className={style.listMessageEx}>
                  <img src={detailProfileChat.image} alt="img" className={style.imageDetail} />
                  <div className={style.wrapperCard}>
                    <p className={`m-0 ${style.messageEx}`}>{data.message}</p>
                    <span className={`mt-2 text-end mb-0 ${style.timeMessage}`}>{data.created_at}</span>
                  </div>
                </li>
              )
            )}

            {/* me */}
          </ul>
        </div>

        <form onSubmit={handleCreateMessage}>
          <div className={`${style.mainFooter}`}>
            <div className={style.wrapperSubmitMessage}>
              <input className={style.inputMessage} type="text" placeholder="Type a message" name="message" value={message.message} onChange={handleChange} />
            </div>

            <div className="wrapperButton d-flex gap-5">
              <button type="submit" className={style.buttonSend}>
                <i className="bi bi-emoji-smile" />
              </button>
              <button type="submit" className={style.buttonSend}>
                <i className="bi bi-send" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatMessage;
