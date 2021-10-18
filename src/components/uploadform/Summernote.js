import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR';
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

import './../../styles/layouts/uploadform/summernote.css';

function Summernote({ username, inputTitle, category, history }) {
  const [textValue, setTextValue] = useState('');

  const onChange = (content) => {
    setTextValue(content);
    console.log('onChange', content);
  };

  const onImageUpload = (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };

      reader.readAsDataURL(images[i]);
    }
  };

  const uploadDataSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
    await axios.post('/upload', {
      username: username,
      title: inputTitle,
      category: category,
      text: textValue,
    });
    history.push('/board_view');
  };

  return (
    <>
      <form className="editor" onSubmit={uploadDataSubmit}>
        <ReactSummernote
          value={textValue}
          options={{
            lang: 'ko-KR',
            height: 420,
            dialogsInBody: true,
            disableResizeEditor: true,
            toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'underline', 'clear']],
              ['fontname', ['fontname']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video']],
              ['view', ['fullscreen', 'codeview']],
            ],
          }}
          onChange={onChange}
          onImageUpload={onImageUpload}
        />
        <div className="uploadform-button-box">
          <button type="button" className="cancel-button">
            취소
          </button>
          <button type="submit" className="register-button">
            등록
          </button>
        </div>
      </form>
    </>
  );
}

export default withRouter(Summernote);
