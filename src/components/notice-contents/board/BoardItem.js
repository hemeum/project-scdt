import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './../../../styles/layouts/notice-board/board-item.css';

import ArticleInfo from './ArticleInfo';

function BoardItem({ uploadId, index, category, title, comment, views, heart, date, username }) {
  return (
    <li key={index} className="notice-list-item">
      <Link to={`/board_view/${uploadId}`}>
        <p>
          <span class="menu-color">[{category}]</span>
          {title}
          <span className="new-icon"></span>
        </p>
        <div className="thumb">
          <img className="thumb-img" alt="주요소식 안내드립니다" />
        </div>
        <div className="comment">
          <i class="far fa-comment-dots comment-icon"></i>
          <p class="comment-number">{comment}</p>
        </div>
      </Link>
      <ArticleInfo views={views} heart={heart} date={date} username={username}></ArticleInfo>
    </li>
  );
}

export default withRouter(BoardItem);
