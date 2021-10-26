import React, { useRef, useEffect } from 'react';
import axios from 'axios';

function EditTextarea({
  userComment,
  setUserComment,
  setEditText,
  index,
  upload_id,
  comment_id,
  setIsEdit,
  editText,
  isEdit,
}) {
  const editRef = useRef();

  const handleCommentEdit = async () => {
    await axios
      .put('/comment/edit', { upload_id: upload_id, comment_id: comment_id, newText: editText })
      .then((res) => {
        const data = { ...userComment[index] };
        data.comment = res.data.comment;
        data.date = res.data.date;
        const editData = [...userComment];
        editData.splice(index, 1, data);
        setUserComment(editData);
      });
    setIsEdit([]);
  };

  const cancelEdit = () => {
    setIsEdit([]);
  };

  useEffect(() => {
    if (
      isEdit.filter((data) => {
        return data === true;
      }).length !== 0
    ) {
      editRef.current.focus();
    } else {
      return;
    }
  }, [isEdit]);

  return (
    <>
      <div className="edit-box">
        <textarea
          ref={editRef}
          className="edit-comment-input"
          value={editText}
          onChange={(e) => {
            setEditText(e.target.value);
          }}
        ></textarea>
        <button type="button" className="edit-comment-button" onClick={handleCommentEdit}>
          수정
        </button>
      </div>
      <button type="button" className="edit-delete-comment-button" onClick={cancelEdit}>
        수정취소
      </button>
    </>
  );
}

export default EditTextarea;
