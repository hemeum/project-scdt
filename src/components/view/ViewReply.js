import React from 'react';

import moment from 'moment';

function ViewReply({ userReply }) {
  const userReplys = userReply.map((reply) => {
    const date = moment(reply.date).format('YYYY.MM.DD HH:mm');
    return (
      <li className="reply-item">
        <div className="user-reply-box">
          <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
          <div className="user-reply-data">
            <p className="user-reply-nickname">{reply.username}</p>
            <p className="user-reply">{reply.reply}</p>
            <p className="user-reply-time">{date}</p>
            <button type="button" className="report-reply-button">
              신고하기
            </button>
          </div>
        </div>
      </li>
    );
  });

  return <ul className="reply-list">{userReply.length !== 0 ? userReplys : undefined}</ul>;
}

ViewReply.defaultProps = {
  userReply: [],
};

export default ViewReply;
