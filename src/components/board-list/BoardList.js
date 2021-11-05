import React, { useEffect } from 'react';

import Board from './board/Board';
import Footer from './Footer';

import './../../styles/layouts/contents.css';
import './../../styles/layouts/board-list/board.css';

function BoardList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contents">
      <div className="section">
        <Board />
      </div>
      <Footer />
    </div>
  );
}
export default BoardList;
