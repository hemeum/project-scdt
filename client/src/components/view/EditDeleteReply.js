import React from 'react';

import axios from 'axios';

function EditDeleteReply({
  id,
  upload_id,
  setIsEdit,
  userComment,
  setUserComment,
  comment_index,
  reply_index,
  reply,
  setEditReply,
  commentLength,
  setCommentLength,
}) {
  const userReply = userComment[comment_index].reply;

  const handleEdit = () => {
    const edit = [...Array(userReply.length).fill(false)];
    edit.splice(reply_index, 1, true);
    setIsEdit(edit);
    setEditReply(reply);
  };

  const handleDelete = async () => {
    let yesDelete = window.confirm('정말 삭제하시겠습니까?');
    if (yesDelete) {
      await axios
        .post('/reply/delete', {
          upload_id: upload_id,
          reply_id: id,
          comment_length: commentLength,
        })
        .then((res) => {
          setUserComment(res.data[0]);
          setCommentLength(Number(res.data[1]));
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

export default EditDeleteReply;
