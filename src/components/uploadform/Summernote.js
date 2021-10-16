import React from 'react';

import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR';
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

import './../../styles/layouts/uploadform/summernote.css';

export default function Summernote() {
  const onChange = (content) => {
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

  return (
    <>
      <div className="editor">
        <ReactSummernote
          value="내용을 입력하여주세요"
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
      </div>
    </>
  );
}
