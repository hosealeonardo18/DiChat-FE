import React, { useState } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const Test = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const resultSocket = io('http://localhost:4000');
    setSocket(resultSocket);
    resultSocket.on('messageBe', (data) => {
      setMessages((currentData) => [...currentData, data]);
    });
  }, []);

  const handleClick = () => {
    socket.emit('messageAll', message);
    setMessage('');
  };

  return (
    <>
      <input type="text" name="" value={message} placeholder="Typing Message" onChange={(e) => setMessage(e.target.value)} />
      <button type="button" onClick={handleClick}>
        Send
      </button>
      <ul>
        {messages?.map((data) => (
          <li>{data}</li>
        ))}
      </ul>
    </>
  );
};

export default Test;
