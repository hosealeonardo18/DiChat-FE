import React from 'react';
import Sidebar from '../../components/SideBar';
import style from './style.module.css';
import img from '../../assets/images/formal.png';

const Message = () => {
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
                <img src={img} alt="" className={style.imageDetail} />
                <div className={style.wrapperName}>
                  <p className={style.titleName}>Hosea Leonardo</p>
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
                <li className={style.listMessageEx}>
                  <img src={img} alt="" className={style.imageDetail} />
                  <div className={style.wrapperCard}>
                    <span className={style.messageEx}>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam expedita voluptatem quaerat consectetur ea quibusdam neque adipisci eius, libero iste debitis fugit nam! Accusamus aspernatur modi explicabo
                      aliquid? Optio, dignissimos iste. Itaque reprehenderit nostrum laudantium aut ad dolor nihil optio. Maxime at quo rerum alias. Nam, iure. Et, voluptate.
                    </span>
                    <p className={`text-end mb-0 ${style.timeMessage}`}>12:00</p>
                  </div>
                </li>

                {/* me */}
                <li className={style.listMessageMe}>
                  <div className={style.wrapperCardMe}>
                    <span className={style.messageEx}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut velit, at quia optio dolorem atque debitis, dolor voluptate a corporis beatae officia minima recusandae veritatis tenetur veniam similique minus dolore,
                      necessitatibus expedita in architecto. Enim amet perferendis minus ipsa consequuntur molestiae incidunt earum ex tempore.
                    </span>
                    <p className={`text-end mb-0 ${style.timeMessage}`}>12:00</p>
                  </div>
                  <img src={img} alt="" className={style.imageDetail} />
                </li>
              </ul>
            </div>
            <div className={style.footerMain}>
              <input className={style.inputMessage} type="text" placeholder="Type a message  " />
              <button type="submit" className={style.buttonSend}>
                <i className="bi bi-send" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Message;
