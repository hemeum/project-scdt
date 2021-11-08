import React from 'react';
import moment from 'moment';

import './../../styles/layouts/video-contents.css';

import ArticleInfo from './ArticleInfo';

export default function VideoListItem(props) {
  const videoData = props.data;

  const videoList = videoData.map((videoItem, index) => {
    const date = moment(videoItem.date).format('YYYY.MM.DD HH:mm');
    return (
      <>
        <li key={videoItem.id} className="video-contents-list-item">
          <a href="/">
            <div class="video-thumb">
              <img src={videoItem.img} alt={videoItem.alt} />
              <i class="far fa-play-circle play-icon"></i>
            </div>
            <p>
              <span class="menu-color">[영상콘텐츠]</span>
              {videoItem.title}
            </p>
            <div className="video-overay" aria-hidden></div>
          </a>
          <ArticleInfo eye={videoItem.views} like={videoItem.heart} date={date} />
        </li>
      </>
    );
  });

  return <ul className="video-collection">{videoList}</ul>;
}
