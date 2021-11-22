import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './../../styles/layouts/video-contents.css';

import ArticleInfo from './ArticleInfo';

export default function VideoListItem(props) {
  const videoData = props.data;

  const videoList = videoData.map((videoItem, index) => {
    let video;
    videoItem.text.replace(/<iframe [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
      video = capture;
    });

    const date = moment(videoItem.date).format('YYYY.MM.DD HH:mm');

    return (
      <li
        key={videoItem.id}
        className="video-contents-list-item"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <Link to={`/board_view/${videoItem.id}`}>
          <div className="video-thumb">
            <img
              src={`https://img.youtube.com/vi/${video.substr(24)}/mqdefault.jpg`}
              alt="유저 업로드 영상입니다"
              className="thumb-img"
            />
            <i className="far fa-play-circle play-icon"></i>
          </div>
          <p>
            <span className="menu-color">[영상콘텐츠]</span>
            {videoItem.title}
          </p>
          <div className="video-overay" aria-hidden></div>
        </Link>
        <ArticleInfo eye={videoItem.views} like={videoItem.heart} date={date} />
      </li>
    );
  });

  return <ul className="video-collection">{videoList}</ul>;
}
