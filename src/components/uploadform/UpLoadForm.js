import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Footer from './Footer';
import Categorys from './Categorys';
import Summernote from './Summernote';

import './../../styles/layouts/uploadform/uploadform.css';

function UpLoadForm({ username, location }) {
  const isEdit = location.state.isEdit;
  const ctg = location.state.category;
  const tit = location.state.title;
  const tx = location.state.text;

  const [inputTitle, setInputTitle] = useState(isEdit ? tit : '');
  const [category, setCategory] = useState(isEdit ? ctg : '자유게시판');

  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };

  return (
    <div className="uploadform">
      <Categorys category={category} setCategory={setCategory} />
      {isEdit ? (
        <input
          className="title-input"
          type="text"
          placeholder="제목"
          name="inputTitle"
          value={inputTitle}
          onChange={handleInputTitle}
        />
      ) : (
        <input
          className="title-input"
          type="text"
          placeholder="제목"
          name="inputTitle"
          value={inputTitle}
          onChange={handleInputTitle}
        />
      )}
      <Summernote username={username} inputTitle={inputTitle} category={category} tx={tx} isEdit={isEdit} />
      <Footer />
    </div>
  );
}

export default withRouter(UpLoadForm);
