import React, { useState, useEffect } from 'react';
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

function Summernote({ username, inputTitle, category, history, location }) {
  const [value, setValue] = useState(location.state ? location.state.text : '');

  const onChange = (content) => {
    setValue(content);
  };
  /*for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };

      reader.readAsDataURL(images[i]);
    } */

  const onImageUpload = async (images, insertImage) => {
    console.log(images);
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('image', images[i]);
    }
    await axios.post('/upload/image', formData).then((res) => {
      insertImage(res.data);
    });
  };

  const uploadDataSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('/upload', {
        username: username,
        title: inputTitle,
        category: category,
        text: value,
      })
      .then((res) => {
        history.push(`/board_view/${res.data.upload_id}`);
        window.scrollTo(0, 0);
      });
  };

  const editUploadData = async (e) => {
    e.preventDefault();
    await axios.put('/upload/update', {
      title: inputTitle,
      category: category,
      text: value,
      upload_id: location.state.upload_id,
    });
    history.goBack();
  };

  return (
    <>
      <form
        className="editor"
        onSubmit={location.state ? editUploadData : uploadDataSubmit}
        encType="multipart/form-data"
      >
        <ReactSummernote
          children={location.state ? location.state.ptag : value}
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
        ></ReactSummernote>
        <div className="uploadform-button-box">
          <button type="button" className="cancel-button">
            취소
          </button>
          <button type="submit" className="register-button">
            {location.state ? '수정' : '등록'}
          </button>
        </div>
      </form>
    </>
  );
}

export default withRouter(Summernote);
