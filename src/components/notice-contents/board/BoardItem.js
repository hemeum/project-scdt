import React from 'react';
import { Link } from 'react-router-dom';

import './../../../styles/layouts/notice-board/board-item.css';

import ArticleInfo from './ArticleInfo';

export default function BoardItem(props) {
  return (
    <li className="notice-list-item">
      <Link to="/board_view">
        <p>
          <span class="menu-color">{props.menu}</span>
          {props.title}
          <span className="new-icon"></span>
        </p>
        <div className="thumb">
          <img className="thumb-img" src={props.thumb} alt="주요소식 안내드립니다" />
        </div>
        <div className="comment">
          <i class="far fa-comment-dots comment-icon"></i>
          <p class="comment-number">{props.cm}</p>
        </div>
      </Link>
      <ArticleInfo eye={props.eye} like={props.like} date={props.date}></ArticleInfo>
    </li>
  );
}
