import React from 'react';
import style from './form.module.css';

const FormInput = (props) => {
  return (
    <>
      <label htmlFor="email" className={`form-label ${style.formLabel}`}>
        {props.label}
      </label>
      <input id={props.id} type={props.type} className={`form-control mb-4 ${style.formControl}`} name={props.name} value={props.value} onChange={props.change} />
    </>
  );
};

export default FormInput;
