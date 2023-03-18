import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css';

const ListMessage = (props) => {
  const counter = props.counter;
  const read = props.read;
  const connect = props.connect;
  const id = props.id;

  return (
    <>
      <ul className={style.listsCard}>
        <li>
          <Link to={`/message/${props.id}`} className={style.listMessage}>
            <div className={style.wrapper}>
              <img src={props.image} alt="img" className={style.imgMessage} />
            </div>

            <div className={style.wrapperName}>
              <div className={style.wrapperNameDate}>
                <p className={style.titleName}>{props.name}</p>
                <p className={style.time}>{props.time}</p>
              </div>

              <div className={`${style.wrapperTime}`}>
                {/* <p className={style.message}>{props.message}</p> */}

                {!connect && id == 1 ? (
                  <>
                    <p className={style.messageDiscon}>Me : {props.message}</p>
                    <span className={style.iconSent}>
                      <i className="bi bi-check2" />
                    </span>
                  </>
                ) : counter > 0 ? (
                  <>
                    <p className={style.message}>{props.message}</p>
                    <span className={style.counter}>{counter}</span>
                  </>
                ) : !read ? (
                  <>
                    <p className={style.messageDiscon}>{props.message}</p>
                    <span className={style.iconSent}>
                      <i className="bi bi-check2-all" />
                    </span>
                  </>
                ) : (
                  <>
                    <p className={style.messageDiscon}>Me : {props.message}</p>
                    <span className={style.iconRead}>
                      <i className="bi bi-check2-all" />
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ListMessage;
