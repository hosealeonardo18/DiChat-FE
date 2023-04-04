import React, { useState } from 'react';
import style from './style.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const ModalUpdateProfile = ({ id, data }) => {
  const [update, setUpdate] = useState({
    fullname: data?.fullname,
    email: data?.email,
    password: data?.password,
    no_telp: data?.no_telp,
    description: data?.description,
    image: data?.image,
  });

  // upload image
  const handleUpload = (e) => {
    setUpdate((prev) => {
      return { ...prev, image: e.target.files[0] };
    });
  };

  // change form input
  const handleChange = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let attr in update) {
      formData.append(attr, update[attr]);
    }

    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: `${response.data.message}`,
          text: `Profile Updated`,
          icon: 'success',
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(`${err.response}`);
      });
  };

  return (
    <>
      <div className="modal fade" id={`update${id}`} tabIndex={-1} aria-labelledby="updateLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateLabel">
                Update
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <form onSubmit={handleSubmitUpdate}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">
                    Fullname
                  </label>
                  <input type="text" className="form-control" id="fullname" name="fullname" value={update.fullname} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" name="email" value={update.email} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="no_telp" className="form-label">
                    Nomer Telpon
                  </label>
                  <input type="text" className="form-control" id="no_telp" name="no_telp" value={update.no_telp} onChange={handleChange} />
                </div>

                {/* <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Status
                  </label>
                  <input type="text" className="form-control" id="description" name="description" value={update.description} onChange={handleChange} />
                </div> */}

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input type="file" className="form-control" id="image" name="image" value={update.description} onChange={handleUpload} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Pofile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUpdateProfile;
