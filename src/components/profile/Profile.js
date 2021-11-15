import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './../../styles/layouts/profile/profile.css';

function Profile({ username, setBoardList, profileImg, setProfileImg, isLogin, history }) {
  const [userInfo, setUserInfo] = useState({ name: '', gender: '', profile_img: '' });
  const [imgEdit, setImgEdit] = useState(false);
  const [writeLength, setWriteLength] = useState(0);
  const [commentLength, setCommentLength] = useState(0);
  const [files, setFiles] = useState('');
  const [imgBase, setImgBase] = useState('');

  const writeRef = useRef();
  const commentRef = useRef();
  const heartRef = useRef();
  const previewRef = useRef();

  useEffect(() => {
    if (imgBase !== '') {
      previewRef.current.style.backgroundImage = `url(${imgBase})`;
      previewRef.current.style.backgroundSize = 'cover';
      previewRef.current.style.backgroundPosition = 'center center';
    }
  }, [imgBase]);

  useEffect(async () => {
    if (isLogin) {
      await axios.post('/profile/info', { username: username }).then((res) => {
        setUserInfo(res.data.info);
      });
    } else {
      setUserInfo({ name: '', gender: '', profile_img: '' });
      setFiles('');
      setImgBase('');
      setProfileImg('');
    }
  }, [username]);

  useEffect(async () => {
    await axios.post('/profile/length', { username: username }).then((res) => {
      setWriteLength(res.data.writeLength);
      setCommentLength(res.data.commentLength);
    });
  }, [writeLength, commentLength, username]);

  const commentedClick = async () => {
    await axios.post('/list', { comment_click: true, username: username }).then((res) => {
      setBoardList(res.data);
    });
    writeRef.current.classList.remove('on-hit');
    heartRef.current.classList.remove('on-hit');
    commentRef.current.classList.add('on-hit');
  };

  const writedClick = async () => {
    await axios.post('/list', { write_click: true, username: username }).then((res) => {
      setBoardList(res.data);
    });
    commentRef.current.classList.remove('on-hit');
    heartRef.current.classList.remove('on-hit');
    writeRef.current.classList.add('on-hit');
  };

  const heartedClick = async () => {
    await axios.post('/list', { heart_click: true, username: username }).then((res) => {
      setBoardList(res.data);
    });
    commentRef.current.classList.remove('on-hit');
    writeRef.current.classList.remove('on-hit');
    heartRef.current.classList.add('on-hit');
  };

  const selectFile = (e) => {
    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      setImgBase(reader.result.toString());
    };

    setFiles(e.target.files);
  };

  const uploadFile = async () => {
    const formData = new FormData();

    formData.append('imgFile', files[0]);
    formData.append('username', username);

    await axios.post('/profile/img', formData).then((res) => {
      setUserInfo(res.data);
      setImgEdit(false);
      setProfileImg(res.data.profile_img);
    });
  };

  return (
    <>
      {imgEdit ? (
        <>
          <div className="profile-img-modal">
            <h3>SCDT : 커피 공유 커뮤니티</h3>
            <p>scdt 커뮤니티에서 사용할 프로필 이미지를 업로드할 수 있습니다.</p>
            <form encType="multipart/form-data" className="img-box">
              <div ref={previewRef} className="img-view"></div>
              <input type="file" name="imgFile" onChange={selectFile}></input>
            </form>
            <div className="profile-img-button">
              <button
                type="button "
                onClick={() => {
                  setImgEdit(false);
                }}
              >
                취소
              </button>
              <button onClick={uploadFile}>확인</button>
            </div>
          </div>
          <div className="profile-overay"></div>
        </>
      ) : undefined}
      <div className="profile-box">
        {profileImg ? (
          <img
            src={`/${userInfo.profile_img}`}
            alt="유저 프로필 이미지입니다"
            className="profile-img"
            onClick={() => {
              setImgEdit(true);
            }}
          ></img>
        ) : (
          <img
            src={process.env.PUBLIC_URL + '/img/cafelatte.png'}
            className="profile-img"
            onClick={() => {
              setImgEdit(true);
            }}
          />
        )}
        <div className="user-info">
          <h3>{username}</h3>
          <span>{userInfo.name === '' ? undefined : userInfo.name}</span>
          <span>{userInfo.gender === '' ? undefined : userInfo.gender}</span>
          <div className="list-comment-length">
            <span>작성글 갯수 {writeLength}</span>
            <span>댓글 쓴 갯수 {commentLength}</span>
          </div>
        </div>
      </div>
      <div className="tab-box">
        <button ref={writeRef} type="button" className="on-hit" onClick={writedClick}>
          작성글
        </button>
        <button ref={commentRef} type="button" onClick={commentedClick}>
          댓글 단 글
        </button>
        <button ref={heartRef} type="button" onClick={heartedClick}>
          좋아요 한 글
        </button>
      </div>
    </>
  );
}

export default withRouter(Profile);
