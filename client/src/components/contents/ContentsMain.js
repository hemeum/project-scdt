import React from 'react';

import MainNews from './MainNews';
import VideoContents from './VideoContents';

import './../../styles/layouts/contents.css';

export default function ContentsMain({ order, setOrder }) {
  return (
    <div className="section-middle">
      <MainNews order={order} setOrder={setOrder}></MainNews>
      <VideoContents order={order} setOrder={setOrder}></VideoContents>
    </div>
  );
}
