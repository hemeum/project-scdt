import React from 'react';

import Footer from './Footer';
import Board from './board/Board';
import ViewUser from './ViewUser';
import ViewComment from './ViewComment';

import './../../styles/layouts/contents.css';
import './../../styles/layouts/view/view-board.css';

function ViewBoard({ isLogin, username }) {
  return (
    <div className="contents">
      <div className="view-board">
        <ViewUser isLogin={isLogin} username={username} />
        <ViewComment isLogin={isLogin} username={username} />
        <Board />
        <Footer />
      </div>
    </div>
  );
}

export default ViewBoard;
