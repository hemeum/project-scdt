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
    // 바뀐 buttonValue 유지하기
    if (localStorage.getItem('keepButtonValue')) {
      setButtonValue(JSON.parse(localStorage.getItem('keepButtonValue')));
      if (JSON.parse(localStorage.getItem('keepButtonValue'))[0] !== 1) {
        pagingLeftController.current.style.opacity = '1';
        pagingLeftController.current.style.visibility = 'visible';
      }
    }
  }, []);

  useEffect(() => {
    if (order === (buttonValue[0] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10)) {
      buttonRef1.current.classList.add('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      if (order !== 0) {
        localStorage.setItem(
          'keepOrder',
          (buttonValue[0] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10),
        );
      }
    } else if (order === (buttonValue[1] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10)) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.add('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      localStorage.setItem(
        'keepOrder',
        (buttonValue[1] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10),
      );
    } else if (order === (buttonValue[2] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10)) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.add('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.remove('on');
      localStorage.setItem(
        'keepOrder',
        (buttonValue[2] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10),
      );
    } else if (order === (buttonValue[3] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10)) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.add('on');
      buttonRef5.current.classList.remove('on');
      localStorage.setItem(
        'keepOrder',
        (buttonValue[3] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10),
      );
    } else if (order === (buttonValue[4] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10)) {
      buttonRef1.current.classList.remove('on');
      buttonRef2.current.classList.remove('on');
      buttonRef3.current.classList.remove('on');
      buttonRef4.current.classList.remove('on');
      buttonRef5.current.classList.add('on');
      localStorage.setItem(
        'keepOrder',
        (buttonValue[4] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10),
      );
    }
  }, [order, buttonValue, categoryData, ctg]);

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
        } else if (categoryData === '영상콘텐츠') {
          return 'video';
        }
      };
      history.push({
        pathname: `/board_list/${newCtg()}`,
        state: { newOrder: (e.target.id - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10) },
      });
      return;
    }
    localStorage.removeItem('keepOrder'); // 1페이지일 때만 삭제 됌 나머진 useEffect로 다시 생성
    setOrder((e.target.id - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10));

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
      return Number(value + 5);
    });
    localStorage.removeItem('keepOrder');
    localStorage.setItem('keepButtonValue', JSON.stringify(newButtonValue));
    console.log(localStorage.getItem('keepButtonValue'));
    setButtonValue(newButtonValue);
    setOrder((newButtonValue[0] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10));
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
      return Number(value - 5);
    });
    localStorage.removeItem('keepOrder');
    localStorage.setItem('keepButtonValue', JSON.stringify(newButtonValue));
    console.log(localStorage.getItem('keepButtonValue'));
    setButtonValue(newButtonValue);
    setOrder((newButtonValue[4] - 1) * (ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10));
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
    <div
      className={
        ctg === 'video'
          ? 'video-board-controller'
          : categoryData === '영상콘텐츠'
          ? 'view-video-board-controller'
          : 'board-controller'
      }
    >
      <i
        ref={pagingLeftController}
        className="far fa-caret-square-left list-paging-left"
        onClick={handlePagingLeft}
      ></i>
      <div ref={listPagingRef} className="list-paging">
        <button key={1} ref={buttonRef1} type="button" id={buttonValue[0]} className="on" onClick={handlePaging}>
          {buttonValue[0]}
        </button>
        <button key={2} ref={buttonRef2} type="button" id={buttonValue[1]} onClick={handlePaging}>
          {buttonValue[1]}
        </button>
        <button key={3} ref={buttonRef3} type="button" id={buttonValue[2]} onClick={handlePaging}>
          {buttonValue[2]}
        </button>
        <button key={4} ref={buttonRef4} type="button" id={buttonValue[3]} onClick={handlePaging}>
          {buttonValue[3]}
        </button>
        <button key={5} ref={buttonRef5} type="button" id={buttonValue[4]} onClick={handlePaging}>
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
