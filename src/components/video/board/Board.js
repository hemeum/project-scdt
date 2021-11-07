import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import BoardSearch from './../search/BoardSearch';
import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import Footer from './../Footer';

export default function Board({ videoList, setVideoList }) {
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [order, setOrder] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const boardCollectionRef = useRef();

  useEffect(async () => {
    const res = await axios.get('/video/data');
    setVideoList(res.data);
  }, [videoList]);

  const spliceVideoList = [...videoList].splice(order, 12);
  const spliceSearchVideoList = [...newData].splice(order, 12);

  const board = spliceVideoList.map((boardItem, index) => {
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

  const newBoard = spliceSearchVideoList.map((boardItem, index) => {
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
