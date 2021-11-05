import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import Board from './board/Board';
import BoardSearch from './search/BoardSearch.js';
import BoardControll from './board/BoardControll';
import BoardTop from './board-top/BoardTop';
import Footer from './Footer';

import './../../styles/layouts/contents.css';
import './../../styles/layouts/board-list/board.css';

function BoardList({ match }) {
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [order, setOrder] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const { ctg } = match.params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contents">
      <div className="section-top">
        {ctg === 'notice' ? <BoardTop /> : undefined}
        <BoardSearch
          data={boardList}
          setInitialBoard={setInitialBoard}
          setNewData={setNewData}
          newData={newData}
          setOrder={setOrder}
        />
      </div>
      <div className="section-main">
        <Board
          ctg={ctg}
          order={order}
          initialBoard={initialBoard}
          boardList={boardList}
          setBoardList={setBoardList}
          newData={newData}
        />
        <BoardControll order={order} setOrder={setOrder} />
      </div>
      <div className="section-footer">
        <Footer />
      </div>
    </div>
  );
}
export default withRouter(BoardList);
