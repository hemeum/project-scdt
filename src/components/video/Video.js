import React, { useEffect } from 'react';

import Board from './board/Board';

import './../../styles/layouts/contents.css';

export default function Video({ videoList, setVideoList }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contents">
      <Board videoList={videoList} setVideoList={setVideoList} />
    </div>
  );
}
