import React from 'react';

import './../../../styles/layouts/board-list/board-top-item.css';

import ArticleInfo from './ArticleInfo';

export default function BoardTopItem(props) {
  return (
    <li className="board-top-list-item">
      <a href="/">
        <p>
          <span class="menu-color">{props.title}</span>
          {props.desc}
        </p>
        <ArticleInfo eye={props.eye} like={props.like} date={props.date}></ArticleInfo>
      </a>
      <div className="board-top-thumb">
        <img className="board-top-thumb-img" src={props.thumb} alt="주요소식 안내드립니다" />
      </div>
    </li>
  );
}
