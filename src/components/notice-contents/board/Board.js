import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import BoardSearch from './../search/BoardSearch.js';
import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import BoardTop from './../board-top/BoardTop';
import Footer from './../Footer';

import './../../../styles/layouts/notice-board/board.css';

export default function Board() {
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [order, setOrder] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const boardCollectionRef = useRef();

  useEffect(async () => {
    await axios.get('/list').then((res) => {
      setBoardList(res.data);
    });
  }, [boardList]);

  const spliceBoardList = [...boardList].splice(order, 10);
  const spliceSearchBoardList = [...newData].splice(order, 10);

  const board = spliceBoardList.map((boardItem) => {
    const date = moment(boardItem.date).format('YYYY:MM:DD HH:DD');
    return (
      <BoardItem title={boardItem.title} date={date} eye={boardItem.eye} like={boardItem.like} cm={boardItem.cm} />
    );
  });

  const newBoard = spliceSearchBoardList.map((boardItem) => {
    const date = moment(boardItem.date).format('YYYY:MM:DD HH:DD');
    return (
      <BoardItem title={boardItem.title} date={date} eye={boardItem.eye} like={boardItem.like} cm={boardItem.cm} />
    );
  });

  return (
    <>
      <BoardTop />
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
