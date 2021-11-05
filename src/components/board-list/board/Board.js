import React, { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import BoardSearch from './../search/BoardSearch';
import BoardTop from './../board-top/BoardTop';

function Board({ match, categoryData }) {
  // categoryData는 viewboard에서 viewuserdata의 category를 의미함
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [order, setOrder] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const { ctg } = match.params; // board_list에서 free, notice 등 의미함

  const boardCollectionRef = useRef();

  useEffect(async () => {
    await axios.post('/list', { ctg: ctg, category_data: categoryData }).then((res) => {
      setBoardList(res.data);
    });
  }, [ctg, categoryData]);

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
      {ctg ? (
        <BoardSearch
          data={boardList}
          setInitialBoard={setInitialBoard}
          setNewData={setNewData}
          newData={newData}
          setOrder={setOrder}
        />
      ) : undefined}
      <div className="board">
        {categoryData ? <h3>{categoryData}</h3> : undefined}
        <div ref={boardCollectionRef} className="board-collection">
          <ul className="board-list">
            {initialBoard ? board : newData.length === 0 ? <div className="not-search">검색 결과 - 0</div> : newBoard}
          </ul>
        </div>
        <BoardControll order={order} setOrder={setOrder} />
      </div>
    </>
  );
}

export default withRouter(Board);
