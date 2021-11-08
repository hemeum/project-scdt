import React, { useRef } from 'react';
import moment from 'moment';

import BoardTopItem from './BoardTopItem';

import './../../../styles/layouts/board-list/board-top.css';

import eventThumb from './../../../images/event.png';
import updateThumb from './../../../images/update.png';

function BoardTop({ boardList, setBoardList, order, setOrder }) {
  const boardTopCollectionRef = useRef();
  const boardTopOrderRef = useRef();
  const boardTopLeftController = useRef();
  const boardTopRightController = useRef();

  const boardTop = boardList.map((boardTopItem) => {
    const date = moment(boardTopItem.date).format('YYYY.MM.DD HH:mm');
    return (
      <BoardTopItem
        order={order}
        setOrder={setOrder}
        uploadId={boardTopItem.id}
        category={boardTopItem.category}
        title={boardTopItem.title}
        date={date}
        views={boardTopItem.views}
        comment={boardTopItem.comment}
        username={boardTopItem.username}
        heart={boardTopItem.heart}
      />
    );
  });

  const handleRightController = (e) => {
    if (boardTopOrderRef.current.textContent === '1 / 4') {
      boardTopCollectionRef.current.style.transform = 'translateX(-900px)';
      boardTopOrderRef.current.textContent = '2 / 4';
      boardTopLeftController.current.style.color = '#333';
    } else if (boardTopOrderRef.current.textContent === '2 / 4') {
      boardTopCollectionRef.current.style.transform = 'translateX(-1800px)';
      boardTopOrderRef.current.textContent = '3 / 4';
    } else if (boardTopOrderRef.current.textContent === '3 / 4') {
      boardTopCollectionRef.current.style.transform = 'translateX(-2700px)';
      boardTopOrderRef.current.textContent = '4 / 4';
      e.target.style.color = '#ccc';
    }
  };

  const handleLeftController = (e) => {
    if (boardTopOrderRef.current.textContent === '4 / 4') {
      boardTopCollectionRef.current.style.transform = 'translateX(-1800px)';
      boardTopOrderRef.current.textContent = '3 / 4';
      boardTopRightController.current.style.color = '#333';
    } else if (boardTopOrderRef.current.textContent === '3 / 4') {
      boardTopCollectionRef.current.style.transform = 'translateX(-900px)';
      boardTopOrderRef.current.textContent = '2 / 4';
    } else if (boardTopOrderRef.current.textContent === '2 / 4') {
      boardTopCollectionRef.current.style.transform = 'translateX(0px)';
      boardTopOrderRef.current.textContent = '1 / 4';
      e.target.style.color = '#ccc';
    }
  };

  return (
    <div className="board-top">
      <div className="board-top-collection">
        <ul ref={boardTopCollectionRef} className="board-top-list">
          {boardTop}
        </ul>
      </div>
      <div className="board-top-controller">
        <p ref={boardTopOrderRef} className="board-top-order">
          1 / 4
        </p>
        <i
          ref={boardTopLeftController}
          onClick={handleLeftController}
          className="far fa-caret-square-left board-arrow-left"
        ></i>
        <i
          ref={boardTopRightController}
          onClick={handleRightController}
          className="far fa-caret-square-right board-arrow-right"
        ></i>
      </div>
    </div>
  );
}
export default BoardTop;
