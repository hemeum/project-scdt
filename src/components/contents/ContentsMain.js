import React from 'react';

import MainNews from './MainNews';
import VideoContents from './VideoContents';

import './../../styles/layouts/contents.css';

export default function ContentsMain({ order, setOrder, videoList, setVideoList }) {
  return (
    <div className="section-bottom">
      <MainNews order={order} setOrder={setOrder}></MainNews>
      <VideoContents videoList={videoList} setVideoList={setVideoList}></VideoContents>
    </div>
  );
}
