import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

function TopAuth({ isLogin, setIsLogin, username, profileImg, setProfileImg }) {
  useEffect(async () => {
    await axios.post('/user/profile_img', { username: username }).then((res) => {
      if (res.data.profile_img) {
        setProfileImg(res.data.profile_img);
      }
    });
  }, [profileImg, username]);

  const handleLogout = async () => {
    const yesLogout = window.confirm('정말 로그아웃 하시겠습니까?');

    if (yesLogout === true) {
      await axios.get('/user/logout');
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  return (
    <>
      {isLogin ? (
        <div className="top-auth">
          <div className="inner">
            <Link to="/board_List/profile" className="profile" aria-label="유저 프로필">
              {profileImg === '' ? (
                <i className="far fa-user-circle user-icon"></i>
              ) : (
                <img src={`/${profileImg}`} alt="유저프로필이미지입니다" className="top-profile-img" />
              )}
              <span className="nickname">{username}</span>
            </Link>
            <button type="button" className="logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>
      ) : (
        <div className="top-auth">
          <div className="inner">
            <button type="text" aria-label="유저 로그인 버튼">
              <i className="far fa-user user-icon"></i>
            </button>
            <button type="text" className="login">
              <Link
                to="/user"
                onClick={() => {
                  setProfileImg('');
                }}
              >
                로그인
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TopAuth;
