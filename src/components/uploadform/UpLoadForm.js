import React, { useState } from 'react';

import Footer from './Footer';
import Categorys from './Categorys';
import Summernote from './Summernote';

import './../../styles/layouts/uploadform/uploadform.css';

function UpLoadForm({ username }) {
  const [inputTitle, setInputTitle] = useState('');
  const [category, setCategory] = useState('자유게시판');

  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };

  return (
    <div className="uploadform">
      <Categorys category={category} setCategory={setCategory} />
      <input
        className="title-input"
        type="text"
        placeholder="제목"
        name="inputTitle"
        value={inputTitle}
        onChange={handleInputTitle}
      />
      <Summernote username={username} inputTitle={inputTitle} category={category} />
      <Footer />
    </div>
  );
}

export default UpLoadForm;
