import React from 'react';

import './../../styles/layouts/view/user-comment.css';

function UserComment() {
  return (
    <div className="comment-box">
      <p>
        댓글 <span>0</span>
      </p>
      <div className="user-textarea">
        <textarea placeholder="정책 위반 댓글은 삭제될 수 있습니다."></textarea>
        <button type="button">등록</button>
      </div>
      <ul className="comment-list">
        <p className="not-comment">댓글을 작성해 주세요.</p>
        <li className="comment-item">
          <div className="user-comment-box">
            <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
            <div className="user-comment-data">
              <p className="user-comment-nickname">닉네임</p>
              <p className="user-comment">유저가 쓴 댓글</p>
              <p className="user-comment-time">
                2021.10.17 23:00 <span>heart</span> <button type="button">답글 쓰기</button>
              </p>
              <button type="button" className="report-comment-button">
                신고하기
              </button>
            </div>
          </div>
          <div className="recomment">
            <div className="user-recomment-box">
              <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
              <div className="user-recomment-data">
                <p className="user-recomment-nickname">내 닉네임</p>
                <p className="user-recomment">유저가 쓴 댓글</p>
                <p className="user-recomment-time">
                  2021.10.17 23:00 <span>eyes</span> <button type="button">답글 쓰기</button>
                </p>
                <button type="button" className="report-recomment-button">
                  신고하기
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default UserComment;
