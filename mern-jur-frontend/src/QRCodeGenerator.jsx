import React, { useState } from 'react';
import QRCode from 'react-qr-code';

export const QRCodeGenerator=(props)=> {
  const [inputValue, setInputValue] = useState('https://www.example.com');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        style={{display:'none'}}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <QRCode value={props.value} />
    </div>
  );
}

