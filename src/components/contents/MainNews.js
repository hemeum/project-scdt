import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import BoardItem from './BoardItem';

import './../../styles/layouts/main-news.css';

import eventThumb from './../../images/event.png';
import updateThumb from './../../images/update.png';

export default function MainNews() {
  const [boardList, setBoardList] = useState([]); // 가장 최신 20개만 가져오기
  const [order, setOrder] = useState(0);

  const newsCollectionRef = useRef();
  const newsOrderRef = useRef();
  const leftController = useRef();
  const rightController = useRef();

  const handleRightController = (e) => {
    if (newsOrderRef.current.textContent === '1 / 4') {
      setOrder(0);
      newsCollectionRef.current.style.transform = 'translateX(-900px)';
      newsOrderRef.current.textContent = '2 / 4';
      leftController.current.style.color = '#333';
      axios.post('/main_news', { controll: 5 }).then((res) => {
        setBoardList(res.data);
      });
    } else if (newsOrderRef.current.textContent === '2 / 4') {
      setOrder(10);
      newsCollectionRef.current.style.transform = 'translateX(-1800px)';
      newsOrderRef.current.textContent = '3 / 4';
      axios.post('/main_news', { controll: 10 }).then((res) => {
        setBoardList(res.data);
      });
    } else if (newsOrderRef.current.textContent === '3 / 4') {
      setOrder(10);
      newsCollectionRef.current.style.transform = 'translateX(-2700px)';
      newsOrderRef.current.textContent = '4 / 4';
      e.target.style.color = '#ccc';
      axios.post('/main_news', { controll: 15 }).then((res) => {
        setBoardList(res.data);
      });
    }
  };

  const handleLeftController = (e) => {
    if (newsOrderRef.current.textContent === '4 / 4') {
      setOrder(10);
      newsCollectionRef.current.style.transform = 'translateX(-1800px)';
      newsOrderRef.current.textContent = '3 / 4';
      rightController.current.style.color = '#333';
      axios.post('/main_news', { controll: 10 }).then((res) => {
        setBoardList(res.data);
      });
    } else if (newsOrderRef.current.textContent === '3 / 4') {
      setOrder(0);
      newsCollectionRef.current.style.transform = 'translateX(-900px)';
      newsOrderRef.current.textContent = '2 / 4';
      axios.post('/main_news', { controll: 5 }).then((res) => {
        setBoardList(res.data);
      });
    } else if (newsOrderRef.current.textContent === '2 / 4') {
      setOrder(0);
      newsCollectionRef.current.style.transform = 'translateX(0px)';
      newsOrderRef.current.textContent = '1 / 4';
      e.target.style.color = '#ccc';
      axios.post('/main_news', { controll: 0 }).then((res) => {
        setBoardList(res.data);
      });
    }
  };

  useEffect(async () => {
    await axios.post('/main_news', { controll: 0 }).then((res) => {
      setBoardList(res.data);
    });
  }, []);

  const board = boardList.map((boardItem) => {
    const date = moment(boardItem.date).format('YYYY.MM.DD HH:mm');
    return (
      <BoardItem
        order={order}
        uploadId={boardItem.id}
        category={boardItem.category}
        title={boardItem.title}
        text={boardItem.text}
        thumb={boardItem.thumb}
        date={date}
        views={boardItem.views}
        heart={boardItem.heart}
        comment={boardItem.comment}
      />
    );
  });

  return (
    <div className="main-news">
      <h2>주요소식</h2>
      <div ref={newsCollectionRef} className="news-collection">
        <ul className="main-news-list">{board}</ul>
        <ul className="main-news-list">{board}</ul>
        <ul className="main-news-list">{board}</ul>
        <ul className="main-news-list">{board}</ul>
      </div>
      <div className="main-news-controller">
        <p ref={newsOrderRef} className="main-news-order">
          1 / 4
        </p>
        <i
          ref={leftController}
          onClick={handleLeftController}
          className="far fa-caret-square-left square-arrow-left"
        ></i>
        <i
          ref={rightController}
          onClick={handleRightController}
          className="far fa-caret-square-right square-arrow-right"
        ></i>
      </div>
    </div>
  );
}
