import React from 'react';
import { Link } from 'react-router-dom';

import './../../styles/layouts/board-item.css';

import ArticleInfo from './ArticleInfo';

export default function BoardItem(props) {
  return (
    <li
      key={props.uploadId}
      className="main-news-list-item"
      onClick={() => {
        window.scrollTo(0, 0);
        localStorage.setItem('order', props.order);
      }}
    >
      <Link to={`/board_view/${props.uploadId}`}>
        <p>
          <span className="menu-color">{`[${props.category}]`}</span>
          {props.title}
          <span className="new-icon"></span>
        </p>
        <div className="thumb">
          <img className="thumb-img" src={props.thumb} alt="주요소식 안내드립니다" />
        </div>
        <div className="comment">
          <i className="far fa-comment-dots comment-icon"></i>
          <p className="comment-number">{props.comment}</p>
        </div>
      </Link>
      <ArticleInfo eye={props.views} like={props.heart} date={props.date}></ArticleInfo>
    </li>
  );
}
