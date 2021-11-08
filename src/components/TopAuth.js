import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopAuth({ isLogin, setIsLogin, username }) {
  /*const handleLogout = () => {
    const yesLogout = window.confirm('정말 로그아웃 하시겠습니까?');
    setLogin({ ...login, checkLogin: !yesLogout });
  };
*/

  const handleLogout = async () => {
    const yesLogout = window.confirm('정말 로그아웃 하시겠습니까?');
    if (yesLogout === true) {
      await axios.get('/logout');
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
            <a href="/" className="profile" aria-label="유저 프로필">
              <i className="far fa-user-circle user-icon"></i>
              <span className="nickname">{username}</span>
            </a>
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
              <Link to="/user">로그인</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TopAuth;
