import React from 'react';
import { Field } from 'formik';

export const FormInput = (props) => { 
  return (
    <div className='col-xs-8 col-sm-7 col-md-4'>
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