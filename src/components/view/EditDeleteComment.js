import React, { useEffect } from 'react';

function EditDeleteComment({ index, isEdit, setIsEdit, userComment, setEditText, comment, id, setCommentId }) {
  useEffect(() => {
    setIsEdit(Array(userComment.length).fill(false));
  }, []);

  const handleEdit = () => {
    const edit = [...isEdit];
    edit.splice(index, 1, true);
    setIsEdit(edit);
    setEditText(comment);
    setCommentId(id);
  };

  return (
    <div className="edit-delete-comment-button">
      <button type="button" onClick={handleEdit}>
        수정
      </button>
      <button type="button">삭제</button>
    </div>
  );
}

export default EditDeleteComment;
