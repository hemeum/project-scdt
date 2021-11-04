import React from 'react';

import './../../../styles/layouts/view/board/info.css';

export default function ArticleInfo(props) {
  return (
    <div className="info">
      <span className="autor">
        <i class="fas fa-volume-up speaker"></i>
        SCDT
      </span>
      <span className="date">{props.date}</span>
      <span className="counter-eye">
        <i class="far fa-eye eye"></i>
        {props.eye ? props.eye : 0}
      </span>
      <span className="counter-like">
        <i class="far fa-heart heart"></i>
        {props.like ? props.like : 0}
      </span>
    </div>
  );
}
