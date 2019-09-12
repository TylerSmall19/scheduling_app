import React from 'react';
import { Field } from 'formik';

export const FormInput = (props) => { 
  return (
    <div className='col-sm-4'>
      <label
        htmlFor={props.id || props.name}
        className='formLabel'
      >
        {typeof props.label === 'function' ? props.label() : props.label}
      </label>
      
      <Field
        id={props.id || props.name}
        type='text'
        className={props.className || 'form-control'}
        name={props.name}
      />
    </div>
  );
};