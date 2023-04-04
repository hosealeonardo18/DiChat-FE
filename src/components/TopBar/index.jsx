import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TopBar = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  console.log(data);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.navbar}>
      <div className={style.wrapperDetail}>
        <img src={data.image} alt="img" className={style.imageDetail} />
        <div className={style.wrapperName}>
          <p className={style.titleName}>{data.fullname}</p>
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
  );
};

export default TopBar;
