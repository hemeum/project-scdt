import React from 'react';

import './../../../styles/layouts/board-list/info.css';

export default function ArticleInfo(props) {
  return (
    <div className="info">
      <span className="autor">
        <i className="fas fa-volume-up speaker"></i>
        {props.username}
      </span>
      <span className="date">{props.date}</span>
      <span className="counter-eye">
        <i className="far fa-eye eye"></i>
        {props.views ? props.views : 0}
      </span>
      <span className="counter-like">
        <i className="far fa-heart heart"></i>
        {props.heart ? props.heart : 0}
      </span>
    </div>
  );
}
