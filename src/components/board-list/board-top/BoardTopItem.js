import React from 'react';
import { Link } from 'react-router-dom';

import './../../../styles/layouts/board-list/board-top-item.css';

import ArticleInfo from './ArticleInfo';

import eventThumb from './../../../images/event.png';

export default function BoardTopItem(props) {
  console.log(props.uploadId);
  return (
    <li
      key={props.uploadId}
      className="board-top-list-item"
      onClick={() => {
        localStorage.removeItem('order');
        props.setOrder(0);
      }}
    >
      <Link to={`/board_view/${props.uploadId}`}>
        <p>
          <span class="menu-color">{props.category}</span>
          {props.title}
        </p>
        <ArticleInfo eye={props.views} like={props.heart} date={props.date}></ArticleInfo>
      </Link>
      <div className="board-top-thumb">
        <img className="board-top-thumb-img" src={eventThumb} alt="주요소식 안내드립니다" />
      </div>
    </li>
  );
}
