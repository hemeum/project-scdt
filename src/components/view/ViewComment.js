import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import EditDeleteComment from './EditDeleteComment';

import './../../styles/layouts/view/view-comment.css';

function ViewComment({ isLogin, username, history, match, userComment, setUserComment, setComment, comment }) {
  const [userText, setUserText] = useState('');
  const [isText, setIsText] = useState(false);
  const [isEdit, setIsEdit] = useState([]);
  const [editText, setEditText] = useState('');
  const [commentId, setCommentId] = useState('');

  const { upload_id } = match.params;

  const textRef = useRef();
  const editRef = useRef();

  const handleText = (e) => {
    setUserText(e.target.value);
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

  const cancelEdit = () => {
    setIsEdit([]);
  };

  useEffect(() => {
    if (
      isEdit.filter((data) => {
        return data === true;
      }).length !== 0
    ) {
      editRef.current.focus();
    } else {
      return;
    }
  }, [isEdit]);

  const handleCommentEdit = async () => {
    await axios.post('/edit', { upload_id: upload_id, comment_id: commentId, newText: editText });
  };

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
              <>
                <div className="edit-box">
                  <textarea
                    ref={editRef}
                    className="edit-comment-input"
                    value={editText}
                    onChange={(e) => {
                      setEditText(e.target.value);
                    }}
                  ></textarea>
                  <button type="button" className="edit-comment-button" onClick={handleCommentEdit}>
                    수정
                  </button>
                </div>
                <button type="button" className="edit-delete-comment-button" onClick={cancelEdit}>
                  수정취소
                </button>
              </>
            ) : (
              <>
                <p className="user-comment">{comment.comment}</p>
                <p className="user-comment-time">
                  {date}
                  <button type="button">답글 쓰기</button>
                </p>

                {comment.username === username ? (
                  <EditDeleteComment
                    id={comment.id}
                    setCommentId={setCommentId}
                    comment={comment.comment}
                    setEditText={setEditText}
                    userComment={userComment}
                    index={index}
                    setIsEdit={setIsEdit}
                    isEdit={isEdit}
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
