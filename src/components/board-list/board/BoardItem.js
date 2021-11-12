import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import './../../../styles/layouts/board-list/board-item.css';

import ArticleInfo from './ArticleInfo';

function BoardItem({ ctg, order, uploadId, index, category, title, comment, views, heart, date, username, text }) {
  const listClick = () => {
    // 클릭하면 조회수 1 증가
    axios.post('/increase/views', { upload_id: uploadId });
    window.scrollTo(0, 0);
    localStorage.setItem('order', order);
  };

  let img;
  let video;

  text.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
    img = capture;
  }); // img태그에서 src만 추출
  text.replace(/<iframe [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
    video = capture;
  }); // iframe태그에서 src만 추출

  // 뷰보드에선 ctg는 undefined
  return (
    <li key={uploadId} className={ctg === 'video' ? 'video-list-item' : 'board-list-item'} onClick={listClick}>
      <Link to={`/board_view/${uploadId}`}>
        {ctg === 'video' ? undefined : (
          <p>
            <span className="menu-color">[{category}]</span>
            {title}
            <span className="new-icon"></span>
          </p>
        )}
        <div className={ctg === 'video' ? 'video-item-thumb' : 'thumb'}>
          {ctg === 'video' ? (
            <>
              <img
                src={`https://img.youtube.com/vi/${video ? video.substr(24) : undefined}/mqdefault.jpg`}
                alt="유저 업로드 영상입니다"
                className="thumb-img"
              />
              <i className="far fa-play-circle video-play-icon"></i>
            </>
          ) : img ? (
            <img className="thumb-img" src={img} alt="유저 업로드 이미지 썸네일입니다" />
          ) : video ? (
            <img
              src={`https://img.youtube.com/vi/${video ? video.substr(24) : undefined}/mqdefault.jpg`}
              alt="유저 업로드 영상입니다"
              className="thumb-img"
            />
          ) : undefined}
        </div>
        {ctg === 'video' ? (
          <>
            <p className="video-item-text">
              <span className="menu-item-color">[{category}]</span>
              {title}
            </p>
            <div className="video-item-overay" aria-hidden></div>
          </>
        ) : undefined}
        {ctg === 'video' ? undefined : (
          <div className="comment">
            <i className="far fa-comment-dots comment-icon"></i>
            <p className="comment-number">{comment ? comment : 0}</p>
          </div>
        )}
      </Link>
      <ArticleInfo views={views} heart={heart} date={date} username={username} ctg={ctg}></ArticleInfo>
    </li>
  );
}

export default withRouter(BoardItem);
