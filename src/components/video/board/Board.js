import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import BoardSearch from './../search/BoardSearch';
import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import Footer from './../Footer';

import './../../../styles/layouts/video-board/board.css';

export default function Board() {
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [order, setOrder] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const boardCollectionRef = useRef();

  useEffect(async () => {
    const res = await axios.get('/video/data');
    setBoardList(res.data);
  }, [boardList]);

  const spliceBoardList = [...boardList].splice(order, 12);
  const spliceSearchBoardList = [...newData].splice(order, 12);

  const board = spliceBoardList.map((boardItem, index) => {
    const date = moment(boardItem.date).format('YYYY.MM.DD');
    return (
      <BoardItem
        date={date}
        eye={boardItem.eye}
        heart={boardItem.heart}
        img={boardItem.img}
        alt={boardItem.alt}
        title={boardItem.title}
        index={index}
      />
    );
  });

  const newBoard = spliceSearchBoardList.map((boardItem, index) => {
    const date = moment(boardItem.date).format('YYYY.MM.DD');
    return (
      <BoardItem
        date={date}
        eye={boardItem.eye}
        heart={boardItem.date}
        img={boardItem.img}
        alt={boardItem.alt}
        title={boardItem.title}
        index={index}
      />
    );
  });

  return (
    <>
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
