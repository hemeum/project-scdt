import React from 'react';

import './../../../styles/layouts/notice-board/info.css';

export default function ArticleInfo(props) {
  return (
    <div className="info">
      <span className="autor">
        <i class="fas fa-volume-up speaker"></i>
        {props.username}
      </span>
      <span className="date">{props.date}</span>
      <span className="counter-eye">
        <i class="far fa-eye eye"></i>
        {props.views}
      </span>
      <span className="counter-like">
        <i class="far fa-heart heart"></i>
        {props.heart}
      </span>
    </div>
  );
}
