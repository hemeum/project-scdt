import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import './../../styles/layouts/view/view-comment.css';

function ViewComment({ isLogin, username, history, match }) {
  const [userText, setUserText] = useState('');
  const [isText, setIsText] = useState(false);
  const [userComment, setUserComment] = useState([]);

  const { upload_id } = match.params;

  const textRef = useRef();

  const handleText = (e) => {
    setUserText(e.target.value);
  };

  const registerText = async () => {
    if (isLogin) {
      if (userText.length !== 0) {
        setIsText(true); // 댓글 작성해주세요 or 작성한 댓글 보여주기
        setUserText(''); // 입력창에 쓰인 글

        await axios.post('/comment', { userText: userText, username: username, upload_id: upload_id }).then((res) => {
          setUserComment(userComment.concat(res.data));
        });
      } else {
        alert('댓글을 먼저 작성해주세요.');
        textRef.current.focus();
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
    // 새로고침해도 댓글 유지
    await axios.post('/comment/keep', { upload_id: upload_id }).then((res) => {
      if (res.data.length !== 0) {
        setIsText(true);
        setUserComment(res.data);
      } else {
        return;
      }
    });
  }, [upload_id]);

  const userComments = userComment.map((comment, index) => {
    const date = moment(comment.date).format('YYYY.MM.DD HH:MM');
    return (
      <li key={index} className="comment-item">
        <div className="user-comment-box">
          <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
          <div className="user-comment-data">
            <p className="user-comment-nickname">{comment.username}</p>
            <p className="user-comment">{comment.comment}</p>
            <p className="user-comment-time">
              {date}
              <button type="button">답글 쓰기</button>
            </p>
            <button type="button" className="report-comment-button">
              수정 삭제 신고하기
            </button>
          </div>
        </div>
      </li>
    );
  });

  {
    /* 
            <div className="recomment">
              <div className="user-recomment-box">
                <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
                <div className="user-recomment-data">
                  <p className="user-recomment-nickname">내 닉네임</p>
                  <p className="user-recomment">유저가 쓴 댓글</p>
                  <p className="user-recomment-time">
                    2021.10.17 23:00 <button type="button">답글 쓰기</button>
                  </p>
                  <button type="button" className="report-recomment-button">
                    신고하기
                  </button>
                </div>
              </div>
            </div>
            */
  }

  return (
    <div className="comment-box">
      <div className="user-textarea">
        <textarea
          ref={textRef}
          onChange={handleText}
          value={userText}
          placeholder="정책 위반 댓글은 삭제될 수 있습니다."
        ></textarea>
        <button type="button" onClick={registerText}>
          등록
        </button>
      </div>
      <ul className="comment-list">{!isText ? <p className="not-comment">댓글을 작성해 주세요.</p> : userComments}</ul>
    </div>
  );
}

export default withRouter(ViewComment);
