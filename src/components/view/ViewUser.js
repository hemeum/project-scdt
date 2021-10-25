import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import EditDeleteButton from './EditDeleteButton';

import './../../styles/layouts/view/view-user.css';

function ViewUser({ match, history, isLogin, username, userComment, comment }) {
  const [viewUserData, setViewUserData] = useState({}); // DB에 저장된 해당 뷰보드 만든 유저의 데이터
  const [isHeart, setIsHeart] = useState(false); // 하트를 했나 안했나 체크
  const [heart, setHeart] = useState(0); // 뷰유저데이터의 heart를 이 heart로 바꿔줌.
  const [checkUser, setCheckUser] = useState(false); // 해당 뷰보드를 만든 유저인지 체크
  const [heartColor, setHeartColor] = useState(false);
  // 하트 색깔 변경

  const heartRef = useRef();

  const { upload_id } = match.params;

  const date = moment(viewUserData.date).format('YYYY.MM.DD HH:MM');

  const handleHeart = async () => {
    // 하트를 클릭했을 때
    if (isLogin) {
      if (heartColor === true) {
        await axios
          .post('/heartCheck', {
            username: username,
            upload_id: upload_id,
            isHeart: true,
            heartLength: heart,
          })
          .then((res) => {
            setIsHeart(res.data.isHeart);
            setHeart(res.data.heart);
            setHeartColor(res.data.heartColor);
          });
      } else {
        if (isHeart === false) {
          await axios
            .post('/heart', {
              username: username,
              upload_id: upload_id,
              isHeart: false,
              heartLength: viewUserData.heart,
            })
            .then((res) => {
              setIsHeart(res.data.isHeart);
              setHeart(res.data.heart);
              setHeartColor(res.data.heartColor);
            });
        } else if (isHeart === true) {
          await axios
            .post('/heart', {
              username: username,
              upload_id: upload_id,
              isHeart: true,
              heartLength: heart,
            })
            .then((res) => {
              setIsHeart(res.data.isHeart);
              setHeart(res.data.heart);
              setHeartColor(res.data.heartColor);
            });
        }
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
    // 해당 보드뷰를 만든 유저의 데이터 가져오기
    await axios.post('/view', { upload_id: upload_id, username: username }).then((res) => {
      setViewUserData({ ...res.data });
      setCheckUser(res.data.checkUser); // 체크유저는 하트와 무관, 해당 뷰보드를 만든 유저인지 확인하는 것. 수정 또는 신고하기
    });
    if (heartColor) {
      heartRef.current.style.color = 'red';
    } else {
      heartRef.current.style.color = '#999';
    }
  }, [checkUser, heartColor, upload_id, username]);

  useEffect(async () => {
    // 좋아요 유지 로직
    await axios.post('/heartColor', { username: username, upload_id: upload_id }).then((res) => {
      setHeartColor(res.data.heartColor);
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
              <EditDeleteButton
                category={viewUserData.category}
                title={viewUserData.title}
                text={viewUserData.text}
                uploadId={upload_id}
              />
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
        댓글 <span>{comment}</span>
      </p>
    </div>
  );
}
export default withRouter(ViewUser);
