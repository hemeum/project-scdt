import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './../../../styles/layouts/notice-board/board-item.css';

import ArticleInfo from './ArticleInfo';

function BoardItem({ title, cm, eye, like, date }) {
  return (
    <li className="notice-list-item">
      <Link to={`/board_view/2`}>
        <p>
          <span class="menu-color">[공지사항]</span>
          {title}
          <span className="new-icon"></span>
        </p>
        <div className="thumb">
          <img className="thumb-img" alt="주요소식 안내드립니다" />
        </div>
        <div className="comment">
          <i class="far fa-comment-dots comment-icon"></i>
          <p class="comment-number">{cm}</p>
        </div>
      </Link>
      <ArticleInfo eye={eye} like={like} date={date}></ArticleInfo>
    </li>
  );
}

export default withRouter(BoardItem);
