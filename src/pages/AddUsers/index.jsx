import React from 'react';
import SidebarListUser from '../../components/SidebarListUser';
import style from './style.module.css';

const AddUsers = () => {
  return (
    <body className={style.colBg}>
      <div className="container-fluid vh-100">
        <div className="row">
          <div className={`col-md-3 vh-100 ${style.col}`}>
            <SidebarListUser />
            {/* chat list */}
          </div>

          <div className="col-md-9 d-flex align-items-center justify-content-center">
            <div className="wrapper">
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
    </body>
  );
};

export default AddUsers;
