import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import BoardItem from './BoardItem';

function Board({ order, initialBoard, boardList, setBoardList, newData, ctg }) {
  const boardCollectionRef = useRef();

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
      <div className="board">
        <div ref={boardCollectionRef} className="board-collection">
          <ul className="board-list">
            {initialBoard ? board : newData.length === 0 ? <div className="not-search">검색 결과 - 0</div> : newBoard}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Board;
