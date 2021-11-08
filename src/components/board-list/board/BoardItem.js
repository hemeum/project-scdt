import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import './../../../styles/layouts/board-list/board-item.css';

import ArticleInfo from './ArticleInfo';

function BoardItem({ ctg, order, uploadId, index, category, title, comment, views, heart, date, username, alt, img }) {
  const listClick = () => {
    // 클릭하면 조회수 1 증가
    axios.post('/increase/views', { upload_id: uploadId });
    window.scrollTo(0, 0);
    localStorage.setItem('order', order);
  };

  // 뷰보드에선 ctg는 undefined

  return (
    <li key={index} className={ctg === 'video' ? 'video-list-item' : 'board-list-item'} onClick={listClick}>
      <Link to={`/board_view/${uploadId}`}>
        {ctg === 'video' ? undefined : (
          <p>
            <span class="menu-color">[{category}]</span>
            {title}
            <span className="new-icon"></span>
          </p>
        )}
        <div className={ctg === 'video' ? 'video-item-thumb' : 'thumb'}>
          {ctg === 'video' ? (
            <>
              <img src={process.env.PUBLIC_URL + img} alt={alt} />
              <i class="far fa-play-circle video-play-icon"></i>
            </>
          ) : (
            <img className="thumb-img" alt="주요소식 안내드립니다" />
          )}
        </div>
        {ctg === 'video' ? (
          <>
            <p className="video-item-text">
              <span class="menu-item-color">[{category}]</span>
              {title}
            </p>
            <div className="video-item-overay" aria-hidden></div>
          </>
        ) : undefined}
        {ctg === 'video' ? undefined : (
          <div className="comment">
            <i class="far fa-comment-dots comment-icon"></i>
            <p class="comment-number">{comment ? comment : 0}</p>
          </div>
        )}
      </Link>
      <ArticleInfo views={views} heart={heart} date={date} username={username} ctg={ctg}></ArticleInfo>
    </li>
  );
}

export default withRouter(BoardItem);
