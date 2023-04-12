import React from 'react';
import style from './style.module.css';
import ListMessage from '../CardListMessage';
import Swal from 'sweetalert2';
import ModalUpdateProfile from '../../ModalUpdateProfile';
import image from '../../../assets/images/default.png';

const SideBarTemplate = ({ contact, data }) => {
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire('Logout!', 'Your Account has been Logout.', 'success');
        window.location.reload();
      }
    });
  };
  return (
    <div className={style.leftContent}>
      <ModalUpdateProfile id={data?.id} data={data} />
      <div className={style.navBarLeft}>
        <div className={style.navLeft}>
          <a className={style.navBrand} href="">
            DiChat
          </a>

          <div className={style.navSetting}>
            <button className={style.buttonSetting} type="button" data-bs-toggle="offcanvas" data-bs-target="#canvasSetting" aria-controls="canvasSetting">
              <i className="bi bi-sliders2" />
            </button>

            {/* offcanvas */}
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="canvasSetting" aria-labelledby="canvasSettingLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="canvasSettingLabel">
                  Profile
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
              </div>
              <div className="offcanvas-body text-center">
                <div className="wrapper">
                  <img className={style.imageProfile} src={data?.image?.length < 1 ? { image } : data?.image} alt="profile" />
                </div>

                <button type="button" className={style.btnUpdate} data-bs-toggle="modal" data-bs-target={`#update${data?.id}`}>
                  <i className="bi bi-pencil-square" />
                </button>
                <h5 className="mt-3">{data?.fullname}</h5>
                <span className={style.notelp}>{data?.no_telp}</span>

                <p className={style.status}>"{data?.description}"</p>

                <hr />

                <button type="button" className={style.btnLogout} onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={style.row}>
          <div className={style.wrapperSearch}>
            <input className={style.searchInput} type="" value="" placeholder="Type your Message" />
            <div className="btn-group">
              <button type="button" className={`${style.btnProfile}`} data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-plus-lg" />
              </button>
              <ul className={`dropdown-menu mt-2 ${style.dropdownMenu}`}>
                <li className={style.list}>
                  <a className="dropdown-item" href="/adduser">
                    Add User
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={style.wrapperStatus}>
        <button className={`${style.status} ${style.active}`}>All</button>
        <button className={`${style.status}`}>Important</button>
        <button className={`${style.status}`}>Unread</button>
      </div>

      <div className={style.wrapperList}>
        {contact?.map((data) => (
          <ListMessage image={data?.image?.length < 1 ? `${image}` : data.image} name={data.fullname} counter={0} read={true} connect={true} id={data.id_people} id_contact={data.id} />
        ))}
      </div>
    </div>
  );
};

export default SideBarTemplate;
