import React, { useRef } from 'react';

import axios from 'axios';

import './../../styles/layouts/view/view-reply.css';

function EditReply({ id, upload_id, editReply, setEditReply, setIsEdit, setUserComment }) {
  const textRef = useRef();

  const cancelEdit = () => {
    setIsEdit([]);
  };

  const handleSubmit = async () => {
    await axios.post('/reply/edit', { reply_id: id, upload_id: upload_id, newReply: editReply }).then((res) => {
      setUserComment(res.data);
      setIsEdit([]);
    });
  };
  return (
    <>
      <div className="edit-reply-box">
        <textarea
          placeholder="정책 위반 댓글은 삭제될 수 있습니다."
          ref={textRef}
          className="edit-reply-input"
          value={editReply}
          onChange={(e) => {
            setEditReply(e.target.value);
          }}
        ></textarea>
        <button type="button" className="edit-reply-button" onClick={handleSubmit}>
          수정
        </button>
      </div>
      <button type="button" className="edit-delete-reply-button" onClick={cancelEdit}>
        수정취소
      </button>
    </>
  );
}

export default EditReply;
