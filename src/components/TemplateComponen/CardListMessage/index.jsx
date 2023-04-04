import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './style.module.css';

const ListMessage = (props) => {
  const id = props.id;

  return (
    <>
      <ul className={style.listsCard}>
        <li>
          <Link to={`/message/${id}`} className={style.listMessage}>
            {/* <Link to={`/template/chat/${id}`} className={style.listMessage}> */}
            <div className={style.wrapper}>
              <img src={props.image} alt="img" className={style.imgMessage} />
            </div>

            <div className={style.wrapperName}>
              <div className={style.wrapperNameDate}>
                <p className={style.titleName}>{props.name}</p>
                <p className={style.time}>{props.time}</p>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ListMessage;
