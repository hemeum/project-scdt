import React from 'react';

import './../../styles/layouts/view/user-upload.css';

export default function UserUpload() {
  return (
    <div className="user-upload-box">
      <p>자유게시판</p>
      <h3>유저가 쓴 제목입니다</h3>
      <div className="user-box">
        <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
        <div className="user-upload-data">
          <p>내 닉네임</p>
          <p>
            2021.10.17 23:00
            <span className="user-views">
              <i class="far fa-eye eye"></i> 1
            </span>
          </p>
        </div>
        <div className="user-button-box">
          <button type="button">수정</button>
          <button type="button">삭제</button>
          <button type="button">신고하기</button>
        </div>
      </div>
      <div className="user-text">
        <p>안녕하세요 텍스트입니다. 여기다가 유저가 쓴 글이 올라와요</p>
      </div>
      <div className="user-heart-box">
        <button type="button" className="heart-button"></button>
        <div className="user-heart">
          <i class="far fa-heart heart"></i>
          <p className="heart-length">11111</p>
        </div>
      </div>
    </div>
  );
}
