import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import './../../../styles/layouts/board-list/board.css';

function BoardControll({ order, setOrder, match, history, categoryData }) {
  const [buttonValue, setButtonValue] = useState([1, 2, 3, 4, 5]);

  const listPagingRef = useRef();
  const pagingLeftController = useRef();
  const pagingRightController = useRef();
  const buttonRef1 = useRef();
  const buttonRef2 = useRef();
  const buttonRef3 = useRef();
  const buttonRef4 = useRef();
  const buttonRef5 = useRef();

  const { ctg } = match.params;

  useEffect(() => {
    if (order === (buttonValue[0] - 1) * 10) {
      buttonRef1.current.classList.add('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      if (order !== 0) {
        localStorage.setItem('keepOrder', (buttonValue[0] - 1) * 10);
      }
    } else if (order === (buttonValue[1] - 1) * 10) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.add('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      localStorage.setItem('keepOrder', (buttonValue[1] - 1) * 10);
    } else if (order === (buttonValue[2] - 1) * 10) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.add('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      localStorage.setItem('keepOrder', (buttonValue[2] - 1) * 10);
    } else if (order === (buttonValue[3] - 1) * 10) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.add('on');
      buttonRef5.current.classList.remove('on');
      localStorage.setItem('keepOrder', (buttonValue[3] - 1) * 10);
    } else if (order === (buttonValue[4] - 1) * 10) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.add('on');
      localStorage.setItem('keepOrder', (buttonValue[4] - 1) * 10);
    }
  }, [order, buttonValue]);

  const handlePaging = (e) => {
    if (!ctg) {
      window.scrollTo(0, 0);
      const newCtg = () => {
        if (categoryData === '자유게시판') {
          return 'free';
        } else if (categoryData === '공지사항') {
          return 'notice';
        } else if (categoryData === '추천게시판') {
          return 'recommend';
        }
      };
      history.push({ pathname: `/board_list/${newCtg()}`, state: { newOrder: (e.target.id - 1) * 10 } });
      return;
    }
    localStorage.removeItem('keepOrder'); // 1페이지일 때만 삭제 됌 나머진 useEffect로 다시 생성
    setOrder((e.target.id - 1) * 10);
    if (e.target.id === String(buttonValue[1])) {
      buttonRef1.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      e.target.classList.add('on');
    } else if (e.target.id === String(buttonValue[2])) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      e.target.classList.add('on');
    } else if (e.target.id === String(buttonValue[3])) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      e.target.classList.add('on');
    } else if (e.target.id === String(buttonValue[4])) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      e.target.classList.add('on');
    } else if (e.target.id === String(buttonValue[0])) {
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      e.target.classList.add('on');
    }
  };

  const handlePagingRight = () => {
    const newButtonValue = buttonValue.map((value) => {
      return value + 5;
    });
    setButtonValue(newButtonValue);
    setOrder((newButtonValue[0] - 1) * 10);
    buttonRef5.current.classList.remove('on');
    buttonRef4.current.classList.remove('on');
    buttonRef3.current.classList.remove('on');
    buttonRef2.current.classList.remove('on');
    buttonRef1.current.classList.add('on');
    pagingLeftController.current.style.opacity = '1';
    pagingLeftController.current.style.visibility = 'visible';
  };

  const handlePagingLeft = () => {
    const newButtonValue = buttonValue.map((value) => {
      return value - 5;
    });
    setButtonValue(newButtonValue);
    setOrder((newButtonValue[4] - 1) * 10);
    buttonRef5.current.classList.add('on');
    buttonRef4.current.classList.remove('on');
    buttonRef3.current.classList.remove('on');
    buttonRef2.current.classList.remove('on');
    buttonRef1.current.classList.remove('on');
    if (newButtonValue[0] === 1) {
      pagingLeftController.current.style.opacity = '0';
      pagingLeftController.current.style.visibility = 'hidden';
    }
  };

  return (
    <div className="board-controller">
      <i
        ref={pagingLeftController}
        className="far fa-caret-square-left list-paging-left"
        onClick={handlePagingLeft}
      ></i>
      <div ref={listPagingRef} className="list-paging">
        <button ref={buttonRef1} type="button" id={buttonValue[0]} className="on" onClick={handlePaging}>
          {buttonValue[0]}
        </button>
        <button ref={buttonRef2} type="button" id={buttonValue[1]} onClick={handlePaging}>
          {buttonValue[1]}
        </button>
        <button ref={buttonRef3} type="button" id={buttonValue[2]} onClick={handlePaging}>
          {buttonValue[2]}
        </button>
        <button ref={buttonRef4} type="button" id={buttonValue[3]} onClick={handlePaging}>
          {buttonValue[3]}
        </button>
        <button ref={buttonRef5} type="button" id={buttonValue[4]} onClick={handlePaging}>
          {buttonValue[4]}
        </button>
      </div>
      <i
        ref={pagingRightController}
        className="far fa-caret-square-right list-paging-right"
        onClick={handlePagingRight}
      ></i>
    </div>
  );
}

export default withRouter(BoardControll);
