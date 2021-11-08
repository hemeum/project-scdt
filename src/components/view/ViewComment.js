import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import EditDeleteComment from './EditDeleteComment';
import EditTextarea from './EditTextarea';
import ViewReply from './ViewReply';

import './../../styles/layouts/view/view-comment.css';
import './../../styles/layouts/view/view-reply.css';

function ViewComment({
  isLogin,
  username,
  history,
  match,
  userComment,
  setUserComment,
  setCommentLength,
  commentLength,
}) {
  const [userText, setUserText] = useState(''); // 유저가 쓴 댓글 인풋창
  const [isText, setIsText] = useState(false); // 유저가 댓글을 쓴게 하나라도 있나 없나

  const [isEdit, setIsEdit] = useState([]); // 편집 중인 댓글만 트루이며, 댓글 갯수만큼 false가 채워지고 수정 누르는 댓글만 true로 바뀜
  const [editText, setEditText] = useState(''); // 편집중인 인풋 댓글
  const [commentId, setCommentId] = useState(''); // 수정할 때 수정할 댓글의 DB 고유 id값

  const [clickReply, setClickReply] = useState([]); // 답글쓰기 클릭했을 때 트루, 펄스 토글
  const [replys, setReplys] = useState([]); // 댓글 별 답글 모음
  const [inputReply, setInputReply] = useState(''); // 텍스트창에서 입력하는 답글 ..

  const [replyExist, setReplyExist] = useState(false);

  const { upload_id } = match.params;

  const textRef = useRef();
  const replyRef = useRef();

  const handleText = (e) => {
    setUserText(e.target.value);
  };

  const registerText = async () => {
    if (isLogin) {
      if (userText.length !== 0) {
        setIsText(true); // 댓글 작성해주세요 or 작성한 댓글 보여주기
        setUserText(''); // 입력창에 쓰인 텍스트

        // 댓글 전체
        await axios
          .post('/comment', {
            userText: userText,
            username: username,
            upload_id: upload_id,
            comment_length: Number(commentLength),
          })
          .then((res) => {
            setUserComment(userComment.concat(res.data));
          });

        // 댓글 개수 추가
        await axios
          .post('/comment/addlength', { upload_id: upload_id, commentLength: Number(commentLength) })
          .then((res) => {
            setCommentLength(res.data.comment);
          });

        setClickReply([]);
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
    // 댓글 개수 가져오면서 댓글 유지하기
    await axios.post('/comment/length', { upload_id: upload_id, comment_length: Number(commentLength) }).then((res) => {
      setCommentLength(res.data.comment);
    });
  }, [commentLength]);

  useEffect(async () => {
    await axios.post('/reply/keep', { upload_id: upload_id }).then((res) => {
      if (res.data.length !== 0) {
        setIsText(true);
        setUserComment(res.data);
        setReplyExist(true);
      } else {
        return;
      }
    });
  }, [upload_id, isText, replyExist]);

  const userComments = userComment.map((comment, index) => {
    // 댓글 리스트 반복
    const date = moment(comment.date).format('YYYY-MM-DD HH:mm');
    console.log(comment.id);
    return (
      <li key={comment.id} className="comment-item">
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
                      const reply = [...Array(userComment.length).fill(false)];
                      reply.splice(index, 1, true);
                      setClickReply(reply);
                      if (replys.length === 0) {
                        // 이 부분이 문제야 replys가 유저커멘트가 늘어나게 되면 그걸 인지를 못하네.
                        setReplys([...Array(userComment.length).fill([])]);
                      } else if (replys.length !== 0) {
                        // 그래서 여기서 0개가 아닐 때는 빈 배열 하나씩 추가해줬다. 왜냐 userComment가 바뀐걸 눈치를 못채서.
                        setReplys([...replys, []]);
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
                    id={comment.id} // 댓글의 id값
                    setCommentId={setCommentId}
                    comment={comment.comment}
                    setEditText={setEditText}
                    userComment={userComment}
                    setUserComment={setUserComment}
                    index={index}
                    setIsEdit={setIsEdit}
                    isEdit={isEdit}
                    commentLength={commentLength}
                    setCommentLength={setCommentLength}
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
        {clickReply[index] ? (
          <div className="reply-input-box">
            <textarea
              placeholder="정책 위반 댓글은 삭제될 수 있습니다."
              className="reply-input"
              value={inputReply}
              onChange={(e) => {
                setInputReply(e.target.value);
              }}
            ></textarea>
            <button
              type="button"
              className="reply-register-button"
              onClick={async () => {
                await axios
                  .post('/reply/add', {
                    reply: inputReply,
                    upload_id: upload_id,
                    username: username,
                    comment_id: comment.id,
                  })
                  .then((res) => {
                    const replyComment = res.data;
                    const newUserComment = [...userComment];
                    newUserComment.splice(index, 1, replyComment);
                    setUserComment(newUserComment);
                    setClickReply([]);
                    setInputReply('');
                    setReplyExist(true);
                  });

                await axios
                  .post('/reply/addlength', { upload_id: upload_id, comment_length: commentLength })
                  .then((res) => {
                    setCommentLength(res.data.comment);
                  });
              }}
            >
              등록
            </button>
          </div>
        ) : undefined}
        {replyExist ? (
          <ViewReply
            upload_id={upload_id}
            username={username}
            userComment={userComment}
            index={index}
            setUserComment={setUserComment}
            commentLength={commentLength}
            setCommentLength={setCommentLength}
          ></ViewReply>
        ) : undefined}
      </li>
    );
  });

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
