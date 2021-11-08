import React from 'react';

import './../../styles/layouts/video-contents.css';

import VideoListItem from './VideoListItem';

import cafeLatte from './../../images/카페라떼.png';
import grinLatte from './../../images/녹차라떼.png';
import caramelLatte from './../../images/카라멜마끼아또.png';
import mintLatte from './../../images/민트라떼.png';
import persimmonLatte from './../../images/홍시라떼.png';
import chocoLatte from './../../images/초코라떼.png';

export default function VideoList() {
  const videoInfo = [
    [
      {
        id: 1,
        date: '1',
        eye: '2',
        like: '3',
        img: cafeLatte,
        alt: '카페라떼 만들기',
        desc: 'hi',
        title: '누구나 쉽게 만드는 스타벅스 카페라떼?!(feat.블핑지수)',
      },
      {
        id: 2,
        date: '4',
        eye: '5',
        like: '6',
        img: grinLatte,
        alt: '그린티라떼 만들기',
        desc: 'hi',
        title: '나, 그린띠라떼 좋아하네?? 드루와 쉬워',
      },
      {
        id: 3,
        date: '7',
        eye: '8',
        like: '9',
        img: caramelLatte,
        alt: '카라멜라떼 만들기',
        desc: 'hi',
        title: '슈퍼에 파는 500원짜리 카라멜로 마끼아또를?!',
      },
    ],
    [
      {
        id: 4,
        date: '10',
        eye: '11',
        like: '12',
        img: mintLatte,
        alt: '민트라떼 만들기',
        desc: 'hi',
        title: '민초단 다 드루와! 내가 해냈어!',
      },
      {
        id: 5,
        date: '13',
        eye: '14',
        like: '15',
        img: persimmonLatte,
        alt: '홍시라떼 만들기',
        desc: 'hi',
        title: '달달한 홍시 좋아하는 사람 여기 모여라~',
      },
      {
        id: 6,
        date: '16',
        eye: '17',
        like: '18',
        img: chocoLatte,
        alt: '초코라떼 만들기',
        desc: 'hi',
        title: '가나초콜릿으로 만드는 겁나 쉬운 초코라떼',
      },
    ],
  ];

  return (
    <div className="video-contents-list">
      <VideoListItem data={videoInfo[0]}></VideoListItem>
      <VideoListItem data={videoInfo[1]}></VideoListItem>
    </div>
  );
}
