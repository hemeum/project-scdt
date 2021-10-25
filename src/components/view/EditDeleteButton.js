import React from 'react';
import { withRouter } from 'react-router-dom';

function EditDeleteButton({ category, text, title, history }) {
  const handleEdit = () => {
    history.push({
      pathname: '/uploadform',
      state: { category: category, title: title, text: text, isEdit: true },
    });
  };
  return (
    <>
      <button type="button" onClick={handleEdit}>
        수정
      </button>
      <button type="button">삭제</button>
    </>
  );
}

export default withRouter(EditDeleteButton);
