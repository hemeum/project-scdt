import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import EditDeleteComment from './EditDeleteComment';
import EditTextarea from './EditTextarea';
import ViewRecomment from './ViewRecomment';

import './../../styles/layouts/view/view-comment.css';
import './../../styles/layouts/view/view-recomment.css';

function ViewComment({ isLogin, username, history, match, userComment, setUserComment, setComment, comment }) {
  const [userText, setUserText] = useState(''); // 유저가 쓴 댓글 인풋창
  const [isText, setIsText] = useState(false); // 유저가 댓글을 쓴게 하나라도 있나 없나
  const [isEdit, setIsEdit] = useState([]); // 편집 중인 댓글만 트루이며, 댓글 갯수만큼 false가 채워지고 수정 누르는 댓글만 true로 바뀜
  const [editText, setEditText] = useState(''); // 편집중인 인풋 댓글
  const [commentId, setCommentId] = useState(''); // 댓글의 DB 고유 id값
  const [isRecomment, setIsRecomment] = useState([]); // 답글쓰기를 어떤 댓글에서 눌렀는가, 답글쓰기를 누른 댓글에서만 트루
  const [recomment, setRecomment] = useState(''); // 답글
  const [yesRecomment, setYesRecomment] = useState(false); // 답글을 등록했는가

  const { upload_id } = match.params;

  const textRef = useRef();

  const handleText = (e) => {
    setUserText(e.target.value);
  };

  const handleRecomment = () => {
    setYesRecomment(true);
  };

  const registerText = async () => {
    if (isLogin) {
      if (userText.length !== 0) {
        setIsText(true); // 댓글 작성해주세요 or 작성한 댓글 보여주기
        setUserText(''); // 입력창에 쓰인 글

        // 댓글 전체
        await axios
          .post('/comment', {
            userText: userText,
            username: username,
            upload_id: upload_id,
            commentLength: userComment.length,
          })
          .then((res) => {
            setUserComment(userComment.concat(res.data));
          });

        // 댓글 개수 추가
        await axios.post('/comment/length', { upload_id: upload_id, commentLength: userComment.length }).then((res) => {
          setComment(res.data.comment);
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

  useEffect(async () => {
    // 댓글 개수 가져오면서 유지하기
    await axios.post('/comment/length', { upload_id: upload_id, commentLength: userComment.length }).then((res) => {
      setComment(res.data.comment);
    });
  }, [comment]);

  const userComments = userComment.map((comment, index) => {
    // 댓글 리스트 반복
    const date = moment(comment.date).format('YYYY-MM-DD HH:mm');
    return (
      <li key={index} className="comment-item">
        <div className="user-comment-box">
          <img src={process.env.PUBLIC_URL + '/img/cafelatte.png'} className="user-profile-img" />
          <div className="user-comment-data">
            <p className="user-comment-nickname">{comment.username}</p>
            {isEdit[index] ? (
              <EditTextarea
                isEdit={isEdit}
                userComment={userComment}
                setUserComment={setUserComment}
                setEditText={setEditText}
                index={index}
                upload_id={upload_id}
                comment_id={commentId}
                setIsEdit={setIsEdit}
                editText={editText}
              />
            ) : (
              <>
                <p className="user-comment">{comment.comment}</p>
                <p className="user-comment-time">
                  {date}
                  <button
                    type="button"
                    onClick={() => {
                      if (isLogin) {
                        const reply = [...Array(userComment.length).fill(false)];
                        reply.splice(index, 1, true);
                        setIsRecomment(reply);
                      } else {
                        const yesLogin = window.confirm('로그인이 필요합니다.');
                        if (yesLogin) {
                          history.push('/user');
                        } else {
                          return;
                        }
                      }
                    }}
                  >
                    답글 쓰기
                  </button>
                </p>

                {comment.username === username ? (
                  <EditDeleteComment
                    history={history}
                    upload_id={upload_id}
                    id={comment.id}
                    setCommentId={setCommentId}
                    comment={comment.comment}
                    setEditText={setEditText}
                    userComment={userComment}
                    setUserComment={setUserComment}
                    index={index}
                    setIsEdit={setIsEdit}
                    isEdit={isEdit}
                    setComment={setComment}
                  />
                ) : (
                  <button type="button" className="report-comment-button">
                    신고하기
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {isRecomment[index] ? (
          <div className="recomment-box">
            {yesRecomment ? (
              <ViewRecomment />
            ) : (
              <>
                <textarea
                  className="recomment-input"
                  placeholder="정책 위반 댓글은 삭제될 수 있습니다."
                  value={recomment}
                  onChange={(e) => {
                    setRecomment(e.target.value);
                  }}
                ></textarea>
                <button type="button" className="recomment-register-button" onClick={handleRecomment}>
                  등록
                </button>
              </>
            )}
          </div>
        ) : undefined}
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
