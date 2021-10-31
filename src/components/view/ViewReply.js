import React, { useState } from 'react';

import moment from 'moment';

import EditDeleteReply from './EditDeleteReply';
import EditReply from './EditReply';

function ViewReply({ upload_id, userComment, username, index, setUserComment, commentLength, setCommentLength }) {
  const [isEdit, setIsEdit] = useState([]);
  const [editReply, setEditReply] = useState('');

  const userReply = userComment[index].reply;

  const userReplys = userReply.map((reply, i) => {
    const date = moment(reply.date).format('YYYY.MM.DD HH:mm');
    return (
      <li key={reply.id} className="reply-item">
        <div className="user-reply-box">
          <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
          <div className="user-reply-data">
            <p className="user-reply-nickname">{reply.username}</p>
            {isEdit[i] ? (
              <>
                <EditReply
                  id={reply.id}
                  upload_id={upload_id}
                  editReply={editReply}
                  setEditReply={setEditReply}
                  setIsEdit={setIsEdit}
                  setUserComment={setUserComment}
                />
              </>
            ) : (
              <>
                <p className="user-reply">{reply.reply}</p>
                <p className="user-reply-time">{date}</p>
                {reply.username === username ? (
                  <EditDeleteReply
                    id={reply.id}
                    upload_id={upload_id}
                    setIsEdit={setIsEdit}
                    userComment={userComment}
                    comment_index={index}
                    reply_index={i}
                    reply={reply.reply}
                    setEditReply={setEditReply}
                    commentLength={commentLength}
                    setCommentLength={setCommentLength}
                    setUserComment={setUserComment}
                  />
                ) : (
                  <button type="button" className="report-reply-button">
                    신고하기
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </li>
    );
  });
  return <ul className="reply-list">{userReplys}</ul>;
}

export default ViewReply;
