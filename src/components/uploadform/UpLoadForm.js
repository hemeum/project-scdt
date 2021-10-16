import React, { useState } from 'react';

import Footer from './Footer';
import Categorys from './Categorys';
import Summernote from './Summernote';

import './../../styles/layouts/uploadform/uploadform.css';

function UpLoadForm() {
  const [inputTitle, setInputTitle] = useState('');

  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };

  return (
    <div className="uploadform">
      <Categorys />
      <input
        className="title-input"
        type="text"
        placeholder="제목"
        name="inputTitle"
        value={inputTitle}
        onChange={handleInputTitle}
      />
      <Summernote />
      <div className="uploadform-button-box">
        <button type="button" className="cancel-button">
          취소
        </button>
        <button type="button" className="register-button">
          등록
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default UpLoadForm;
