import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function EditDeleteButton({ category, text, title, history, uploadId }) {
  const handleEdit = () => {
    history.push({
      pathname: '/uploadform',
      state: { category: category, title: title, text: text, upload_id: uploadId },
    });
  };

  const handleDelete = async () => {
    let yesDelete = window.confirm('정말 삭제하시겠습니까?');
    if (yesDelete) {
      await axios.put('/upload/delete', {
        upload_id: uploadId,
      });
      history.push('/');
    } else {
      return;
    }
  };

  return (
    <>
      <button type="button" onClick={handleEdit}>
        수정
      </button>
      <button type="button" onClick={handleDelete}>
        삭제
      </button>
    </>
  );
}

export default withRouter(EditDeleteButton);
