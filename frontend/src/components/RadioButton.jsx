import React from 'react';
import { Form } from 'react-bootstrap';

const RadioButton = ({ id, label, onChange, value, checked }) => {
  return (
    <div className='d-inline-flex align-items-center p-2'>
      <Form.Check
        type='radio'
        id={id}
        name='type'
        value={value}
        onChange={onChange}
        checked={checked}
        className='me-2'
        style={{
          width: '20px',
          height: '20px',
        }}
      />
      <Form.Check.Label
        htmlFor={id}
        className='font-light text-secondary cursor-pointer select-none'
      >
        {label}
      </Form.Check.Label>
    </div>
  );
};

export default RadioButton;
