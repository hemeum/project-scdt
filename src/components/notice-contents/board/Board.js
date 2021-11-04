import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { withRouter, useParams } from 'react-router-dom';

import BoardSearch from './../search/BoardSearch.js';
import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import BoardTop from './../board-top/BoardTop';
import Footer from './../Footer';

import './../../../styles/layouts/notice-board/board.css';

function Board({ match }) {
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [order, setOrder] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const boardCollectionRef = useRef();

  const { ctg } = match.params;

  useEffect(async () => {
    await axios.post('/list', { ctg: ctg }).then((res) => {
      setBoardList(res.data);
    });
  }, [ctg]);

  const spliceBoardList = [...boardList].splice(order, 10);
  const spliceSearchBoardList = [...newData].splice(order, 10);

  const board = spliceBoardList.map((boardItem, index) => {
    const date = moment(boardItem.date).format('YYYY.MM.DD');
    return (
      <BoardItem
        uploadId={boardItem.id}
        index={index}
        category={boardItem.category}
        title={boardItem.title}
        date={date}
        views={boardItem.views}
        comment={boardItem.comment}
        username={boardItem.username}
        heart={boardItem.heart}
      />
    );
  });

  const newBoard = spliceSearchBoardList.map((boardItem, index) => {
    const date = moment(boardItem.date).format('YYYY.MM.DD');
    return (
      <BoardItem
        uploadId={boardItem.id}
        index={index}
        title={boardItem.title}
        date={date}
        views={boardItem.views}
        comment={boardItem.comment}
        username={boardItem.username}
        heart={boardItem.heart}
      />
    );
  });

  return (
    <>
      {ctg === 'notice' ? <BoardTop /> : undefined}
      <BoardSearch
        data={boardList}
        setInitialBoard={setInitialBoard}
        setNewData={setNewData}
        newData={newData}
        setOrder={setOrder}
      ></BoardSearch>
      <div className="board">
        <div ref={boardCollectionRef} className="board-collection">
          <ul className="board-list">
            {initialBoard ? board : newData.length === 0 ? <div className="not-search">검색 결과 - 0</div> : newBoard}
          </ul>
        </div>
      </div>
      <BoardControll order={order} setOrder={setOrder}></BoardControll>
      <Footer></Footer>
    </>
  );
}

export default withRouter(Board);
