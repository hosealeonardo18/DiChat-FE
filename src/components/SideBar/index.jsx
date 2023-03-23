import React from 'react';
import style from './style.module.css';
import ListMessage from '../CardListMessage';
import img from '../../assets/images/formal.png';

const Sidebar = () => {
  return (
    <>
      <div className={`${style.navbar}`}>
        <div className={style.navbarBrand}>DiChat</div>
        <div className="btn-group">
          <button type="button" className={`btn ${style.btnProfile}`} data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-sliders2" />
          </button>
          <ul className={`dropdown-menu mt-2 ${style.dropdownMenu}`}>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={style.wrapperSearch}>
              <input className={style.searchInput} type="" value="" placeholder="Type your Message" />
              <div className="btn-group">
                <button type="button" className={`btn ${style.btnProfile}`} data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-plus-lg" />
                </button>
                <ul className={`dropdown-menu mt-2 ${style.dropdownMenu}`}>
                  <li>
                    <a className="dropdown-item" href="/adduser">
                      Add User
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* status message */}
            <div className={style.wrapperStatus}>
              <button className={`${style.status} ${style.active}`}>All</button>
              <button className={`${style.status}`}>Important</button>
              <button className={`${style.status}`}>Unread</button>
            </div>

            <div className={style.wrapperList}>
              <ListMessage image={img} name="Hosea Leonardo" message="Hi!, How are you ? i'm miss u somuch" time="12:00" counter={0} read={true} connect={true} id={1} />
            </div>
          </div>
        </div>
      </div>
      {/* search */}
    </>
  );
};

export default Sidebar;
