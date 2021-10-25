import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Footer from './Footer';
import Categorys from './Categorys';
import Summernote from './Summernote';

import './../../styles/layouts/uploadform/uploadform.css';

function UpLoadForm({ username, location }) {
  const [inputTitle, setInputTitle] = useState(location.state ? location.state.title : '');
  const [category, setCategory] = useState(location.state ? location.state.category : '자유게시판');

  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  });

  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };

  return (
    <div className="uploadform">
      <Categorys category={category} setCategory={setCategory} />
      <input
        ref={titleRef}
        className="title-input"
        type="text"
        placeholder="제목"
        name="inputTitle"
        value={inputTitle}
        onChange={handleInputTitle}
      />
      <Summernote username={username} inputTitle={inputTitle} category={category} location={location} />
      <Footer />
    </div>
  );
}

export default withRouter(UpLoadForm);
