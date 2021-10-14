import React, { useRef, useState, useEffect } from 'react';

import BoardSearch from './../search/BoardSearch';
import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import Footer from './../Footer';
import axios from 'axios';

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

  {
    /*const boardList = [
    {
      id: 1,
      date: '1',
      eye: '2',
      heart: '3',
      img: cafeLatte,
      alt: '카페라떼 만들기',
      desc: 'hi',
      title: '누구나 쉽게 만드는 스타벅스 카페라떼?!(feat.블핑지수)',
    },
    {
      id: 2,
      date: '4',
      eye: '5',
      heart: '6',
      img: grinLatte,
      alt: '그린티라떼 만들기',
      desc: 'hi',
      title: '나, 그린띠라떼 좋아하네?? 드루와 쉬워',
    },
    {
      id: 3,
      date: '7',
      eye: '8',
      heart: '9',
      img: caramelLatte,
      alt: '카라멜라떼 만들기',
      desc: 'hi',
      title: '슈퍼에 파는 500원짜리 카라멜로 마끼아또를?!',
    },

    {
      id: 4,
      date: '10',
      eye: '11',
      heart: '12',
      img: mintLatte,
      alt: '민트라떼 만들기',
      desc: 'hi',
      title: '민초단 다 드루와! 내가 해냈어!',
    },
    {
      id: 5,
      date: '13',
      eye: '14',
      heart: '15',
      img: persimmonLatte,
      alt: '홍시라떼 만들기',
      desc: 'hi',
      title: '달달한 홍시 좋아하는 사람 여기 모여라~',
    },
    {
      id: 6,
      date: '16',
      eye: '17',
      heart: '18',
      img: chocoLatte,
      alt: '초코라떼 만들기',
      desc: 'hi',
      title: '가나초콜릿으로 만드는 겁나 쉬운 초코라떼',
    },
    {
      id: 7,
      date: '1',
      eye: '2',
      heart: '3',
      img: cafeLatte,
      alt: '카페라떼 만들기',
      desc: 'hi',
      title: '누구나 쉽게 만드는 스타벅스 카페라떼?!(feat.블핑지수)',
    },
    {
      id: 8,
      date: '4',
      eye: '5',
      heart: '6',
      img: grinLatte,
      alt: '그린티라떼 만들기',
      desc: 'hi',
      title: '나, 그린띠라떼 좋아하네?? 드루와 쉬워',
    },
    {
      id: 9,
      date: '7',
      eye: '8',
      heart: '9',
      img: caramelLatte,
      alt: '카라멜라떼 만들기',
      desc: 'hi',
      title: '슈퍼에 파는 500원짜리 카라멜로 마끼아또를?!',
    },

    {
      id: 10,
      date: '10',
      eye: '11',
      heart: '12',
      img: mintLatte,
      alt: '민트라떼 만들기',
      desc: 'hi',
      title: '민초단 다 드루와! 내가 해냈어!',
    },
    {
      id: 11,
      date: '13',
      eye: '14',
      heart: '15',
      img: persimmonLatte,
      alt: '홍시라떼 만들기',
      desc: 'hi',
      title: '달달한 홍시 좋아하는 사람 여기 모여라~',
    },
    {
      id: 12,
      date: '16',
      eye: '17',
      heart: '18',
      img: chocoLatte,
      alt: '초코라떼 만들기',
      desc: 'hi',
      title: '가나초콜릿으로 만드는 겁나 쉬운 초코라떼',
    },
    {
      id: 13,
      date: '13',
      eye: '14',
      heart: '15',
      img: persimmonLatte,
      alt: '홍시라떼 만들기',
      desc: 'hi',
      title: '달달한 홍시 좋아하는 사람 여기 모여라~',
    },
    {
      id: 14,
      date: '16',
      eye: '17',
      heart: '18',
      img: chocoLatte,
      alt: '초코라떼 만들기',
      desc: 'hi',
      title: '가나초콜릿으로 만드는 겁나 쉬운 초코라떼',
    },
    {
      id: 15,
      date: '13',
      eye: '14',
      heart: '15',
      img: persimmonLatte,
      alt: '홍시라떼 만들기',
      desc: 'hi',
      title: '달달한 홍시 좋아하는 사람 여기 모여라~',
    },
    {
      id: 16,
      date: '16',
      eye: '17',
      heart: '18',
      img: chocoLatte,
      alt: '초코라떼 만들기',
      desc: 'hi',
      title: '가나초콜릿으로 만드는 겁나 쉬운 초코라떼',
    },
  ]; */
  }

  const spliceBoardList = [...boardList].splice(order, 12);
  const spliceSearchBoardList = [...newData].splice(order, 12);

  const board = spliceBoardList.map((boardItem, index) => {
    return (
      <BoardItem
        date={boardItem.date}
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
    return (
      <BoardItem
        date={boardItem.date}
        eye={boardItem.eye}
        heart={boardItem.heart}
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
