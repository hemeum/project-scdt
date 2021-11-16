import React, { useState, useEffect } from 'react';
import axios from 'axios';

import VideoList from './VideoList';

import './../../styles/layouts/video-contents.css';

export default function VideoContents({ order, setOrder }) {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios.get('/board/video_contents').then((res) => {
      setBoardList(res.data);
    });
  }, []);

  return (
    <div className="video-contents">
      <h2>영상콘텐츠</h2>
      <VideoList boardList={boardList}></VideoList>
    </div>
  );
}
