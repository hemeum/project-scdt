import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import EditDeleteViewBoard from './EditDeleteViewBoard';

import './../../styles/layouts/view/view-user.css';

function ViewUser({
  match,
  history,
  isLogin,
  username,
  commentLength,
  viewUserData,
  setViewUserData,
  order,
  setOrder,
}) {
  const [isHeart, setIsHeart] = useState(false); // 하트를 했나 안했나 체크
  const [heart, setHeart] = useState(0); // 뷰유저데이터의 heart를 이 heart로 바꿔줌.
  const [checkUser, setCheckUser] = useState(false); // 해당 뷰보드를 만든 유저인지 체크
  const [heartColor, setHeartColor] = useState(false);
  // 하트 색깔 변경

  const heartRef = useRef();

  const { upload_id } = match.params;

  const date = moment(viewUserData.date).format('YYYY.MM.DD HH:MM');

  let debouncer;

  const handleHeart = async (e) => {
    // 디바운싱으로 연달아서 하트 클릭하는거 제어해줌.
    if (debouncer) {
      clearTimeout(debouncer);
    }
    debouncer = setTimeout(async () => {
      console.log('하트 클릭 완료');
      if (isLogin) {
        if (heartColor === true) {
          // 하트를 이미 누르고 다시 접속했을 때

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
            // 최초 하트를 클릭했을 때(false에서 true로)

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
            // 하트를  취소하기 위해 다시 클릭했을 때(true에서 false)

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
    }, 1000);
  };

  useEffect(async () => {
    // 해당 보드뷰를 만든 유저의 데이터 가져오기
    await axios.post('/view', { upload_id: upload_id, username: username, order: order }).then((res) => {
      setViewUserData({ ...res.data[0] });
      setCheckUser(res.data[0].checkUser); // 체크유저는 하트와 무관, 해당 뷰보드를 만든 유저인지 확인하는 것. 수정 또는 신고하기
      setOrder(res.data[1]);
    });
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
              <i className="far fa-eye eye"></i> {viewUserData.views}
            </span>
          </p>
        </div>
        <div className="user-button-box">
          {checkUser ? (
            <>
              <EditDeleteViewBoard
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
        {viewUserData.img ? (
          <img className="user-upload-img" src={viewUserData.img} alt="유저 업로드 이미지입니다" />
        ) : undefined}
      </div>
      <div className="user-heart-box">
        <button type="button" className="heart-button"></button>
        <button type="button" className="user-heart" onClick={handleHeart}>
          <i
            ref={heartRef}
            className={heartColor ? 'far fa-heart heart-icon-red' : 'far fa-heart heart-icon-black'}
          ></i>
          <p className="heart-length">{isHeart ? heart : viewUserData.heart ? viewUserData.heart : 0}</p>
        </button>
      </div>
      <p className="comment-length">
        댓글 <span>{commentLength ? commentLength : 0}</span>
      </p>
    </div>
  );
}
export default withRouter(ViewUser);
