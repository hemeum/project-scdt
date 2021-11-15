import React, { useEffect } from 'react';
import axios from 'axios';

function EditDeleteComment({
  upload_id,
  index,
  isEdit,
  setIsEdit,
  userComment,
  setUserComment,
  setEditText,
  comment,
  commentLength,
  id,
  setCommentId,
  setCommentLength,
}) {
  const handleEdit = () => {
    const edit = [...Array(userComment.length).fill(false)];
    edit.splice(index, 1, true);
    setIsEdit(edit);
    setEditText(comment);
    setCommentId(id);
  };

  const handleDelete = async () => {
    let yesDelete = window.confirm('정말 삭제하시겠습니까?');
    if (yesDelete) {
      await axios
        .put('/comment/delete', {
          upload_id: upload_id,
          comment_id: id,
          comment_length: Number(commentLength),
        })
        .then((res) => {
          setUserComment(res.data);
          setCommentLength(res.data[1]);
        });
      window.scrollTo(0, 0);
    } else {
      return;
    }
  };

  return (
    <div className="edit-delete-comment-button">
      <button type="button" onClick={handleEdit}>
        수정
      </button>
      <button type="button" onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
}

export default EditDeleteComment;
