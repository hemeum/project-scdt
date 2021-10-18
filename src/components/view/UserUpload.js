import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './../../styles/layouts/view/user-upload.css';

export default function UserUpload() {
  const [boardList, setBoardList] = useState([]);

  useEffect(async () => {
    await axios.get('/list').then((res) => {
      setBoardList(res.data);
    });
  }, [boardList]);

  return (
    <div className="user-upload-box">
      <p>{boardList[0].category}</p>
      <h3>{boardList[0].title}</h3>
      <div className="user-box">
        <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
        <div className="user-upload-data">
          <p>{boardList[0].username}</p>
          <p>
            {boardList[0].date}
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
        <p>{boardList[0].text}</p>
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
