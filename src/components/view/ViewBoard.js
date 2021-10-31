import React, { useState } from 'react';

import Footer from './Footer';
import Board from './board/Board';
import ViewUser from './ViewUser';
import ViewComment from './ViewComment';

import './../../styles/layouts/contents.css';
import './../../styles/layouts/view/view-board.css';

function ViewBoard({ isLogin, username }) {
  const [userComment, setUserComment] = useState([]);
  const [commentLength, setCommentLength] = useState('0');

  return (
    <div className="contents">
      <div className="view-board">
        <ViewUser isLogin={isLogin} username={username} userComment={userComment} commentLength={commentLength} />
        <ViewComment
          isLogin={isLogin}
          username={username}
          userComment={userComment}
          setUserComment={setUserComment}
          commentLength={commentLength}
          setCommentLength={setCommentLength}
        />
        <Board />
        <Footer />
      </div>
    </div>
  );
}

export default ViewBoard;
