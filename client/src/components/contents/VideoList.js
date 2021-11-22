import React from 'react';

import './../../styles/layouts/video-contents.css';

import VideoListItem from './VideoListItem';

export default function VideoList({ boardList }) {
  return (
    <div className="video-contents-list">
      <VideoListItem data={boardList}></VideoListItem>
    </div>
  );
}
