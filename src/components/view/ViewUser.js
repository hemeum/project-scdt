import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import './../../styles/layouts/view/view-user.css';

function ViewUser({ match, history, isLogin, username }) {
  const [viewUserData, setViewUserData] = useState({});
  const [isHeart, setIsHeart] = useState(false);
  const [heart, setHeart] = useState(0);
  const [checkUser, setCheckUser] = useState(false);

  const heartRef = useRef();

  const { upload_id } = match.params;

  const date = moment(viewUserData.date).format('YYYY.MM.DD HH:MM');

  const handleHeart = async () => {
    if (isLogin) {
      if (isHeart === false) {
        await axios.post('/heart', { heart: viewUserData.heart, upload_id: upload_id, isHeart: false }).then((res) => {
          setIsHeart(res.data.isHeart);
          setHeart(res.data.heart);
        });
      } else if (isHeart === true) {
        await axios.post('/heart', { heart: viewUserData.heart, upload_id: upload_id, isHeart: true }).then((res) => {
          setIsHeart(res.data.isHeart);
          setHeart(res.data.heart);
        });
      }
    } else {
      const yesLogin = window.confirm('로그인이 필요합니다.');
      if (yesLogin) {
        history.push('/user');
      } else {
        return;
      }
    }
  };

  useEffect(async () => {
    if (isHeart) {
      heartRef.current.style.color = 'red';
    } else {
      heartRef.current.style.color = '#999';
    }
    await axios.post('/view', { upload_id: upload_id, username: username }).then((res) => {
      setViewUserData({ ...res.data });
      setCheckUser(res.data.checkUser);
      console.log(res.data);
      console.log(res.data.checkUser);
    });
  }, [upload_id, isHeart, username, checkUser]);

  useEffect(async () => {
    await axios.post('/heartCheck', { upload_id: upload_id }).then((res) => {
      setIsHeart(res.data.checkHeart);
      setHeart(res.data.heart);
    });
  });

  return (
    <div className="user-upload-box">
      <p>{viewUserData.category}</p>
      <h3>{viewUserData.title}</h3>
      <div className="user-box">
        <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
        <div className="user-upload-data">
          <p>{viewUserData.username}</p>
          <p>
            {date}
            <span className="user-views">
              <i class="far fa-eye eye"></i> {viewUserData.views}
            </span>
          </p>
        </div>
        <div className="user-button-box">
          {checkUser ? (
            <>
              <button type="button">수정</button>
              <button type="button">삭제</button>
            </>
          ) : (
            <button type="button">신고하기</button>
          )}
        </div>
      </div>
      <div className="user-text">
        <p>{viewUserData.text}</p>
      </div>
      <div className="user-heart-box">
        <button type="button" className="heart-button"></button>
        <div className="user-heart" onClick={handleHeart}>
          <i ref={heartRef} class="far fa-heart heart-icon"></i>
          <p className="heart-length">{isHeart ? heart : viewUserData.heart}</p>
        </div>
      </div>
      <p className="comment-length">
        댓글 <span>{viewUserData.comment}</span>
      </p>
    </div>
  );
}
export default withRouter(ViewUser);
