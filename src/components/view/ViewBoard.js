import React from 'react';

import Footer from './Footer';
import Board from './board/Board';
import UserUpload from './UserUpload';
import UserComment from './UserComment';

import './../../styles/layouts/contents.css';
import './../../styles/layouts/view/view-board.css';

function ViewBoard() {
  return (
    <div className="contents">
      <div className="view-board">
        <UserUpload />
        <UserComment />
        <Board />
        <Footer />
      </div>
    </div>
  );
}

export default ViewBoard;
