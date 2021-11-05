import React, { useRef } from 'react';

import BoardTopItem from './BoardTopItem';

import './../../../styles/layouts/board-list/board-top.css';

import eventThumb from './../../../images/event.png';
import updateThumb from './../../../images/update.png';

export default function BoardTop() {
  const boardTopCollectionRef = useRef();
  const boardTopOrderRef = useRef();
  const boardTopLeftController = useRef();
  const boardTopRightController = useRef();

  const boardList = [
    {
      id: 1,
      title: '[공지사항]',
      desc: '9.8(수) 카페 업데이트 점검 안내 (08:00 ~ 09:00)',
      date: '2021.09.08',
      eye: '3560',
      like: '25',
      cm: '15',
      thumb: updateThumb,
    },
    {
      id: 2,
      title: '[공지사항]',
      desc: '스타벅스에서 쿠폰쏜다! (08.30 ~ 9.30)',
      date: '2021.08.30',
      eye: '15600',
      like: '356',
      cm: '32',
      thumb: eventThumb,
    },
    {
      id: 3,
      title: '[공지사항]',
      desc: '카페지기의 라이브 방송 사전 안내 및 쿠폰 이벤트 (09.07)',
      date: '2021.08.28',
      eye: '1900',
      like: '56',
      cm: '72',
      thumb: eventThumb,
    },
    {
      id: 4,
      title: '[공지사항]',
      desc: '08.15(화) 메가커피 쿠폰 이벤트 당첨자 안내',
      date: '2021.08.25',
      eye: '782',
      like: '16',
      cm: '22',
      thumb: updateThumb,
    },
    {
      id: 5,
      title: '[공지사항]',
      desc: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
    },
  ];

  const boardTop = boardList.map((boardTopItem) => {
    return (
      <BoardTopItem
        title={boardTopItem.title}
        desc={boardTopItem.desc}
        thumb={boardTopItem.thumb}
        date={boardTopItem.date}
        eye={boardTopItem.eye}
        like={boardTopItem.like}
        cm={boardTopItem.cm}
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
