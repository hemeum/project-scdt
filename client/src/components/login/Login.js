import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

import './../../styles/layouts/login/login.css';

function Login({ isLogin, setIsLogin, history, username, setUsername, location }) {
  const [user_id, setUser_id] = useState('');
  const [pwd, setPwd] = useState('');
  const [reLogin, setReLogin] = useState(false);
  const pwdRef = useRef();

  const handleUser_id = (e) => {
    setUser_id(e.target.value);
  };
  const hanldePwd = (e) => {
    setPwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/user/login',
      data: { user_name: user_id, user_pwd: pwd },
    })
      .then((response) => {
        console.log(response.data);
        setIsLogin(response.data.checkLogin);
        setReLogin(response.data.reLogin);
        setUsername(response.data.nickname);
      })
      .catch((err) => {
        if (err) {
          alert('없는 아이디 또는 비밀번호입니다.');
          pwdRef.current.focus();
          setPwd('');
          setReLogin(false);
        }
      });
  };

  useEffect(() => {
    if (reLogin === true) {
      alert('없는 아이디 또는 비밀번호입니다.');
      pwdRef.current.focus();
      setPwd('');
      setReLogin(false);
    } else if (isLogin === true) {
      if (location.state) {
        if (location.state.data === 'auth') {
          history.push('/');
        }
      } else {
        history.goBack();
      }
    }
  }, [reLogin, isLogin]);

  return (
    <div className="login-content">
      <div className="login-form">
        <header>
          <h2>SCDT 로그인</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="login-box">
            <label htmlFor="username">
              <h3>아이디</h3>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user_id}
              className="login-text"
              placeholder="id"
              onChange={handleUser_id}
            ></input>
          </div>
          <div className="login-box">
            <label htmlFor="password">
              <h3>비밀번호</h3>
            </label>
            <input
              ref={pwdRef}
              type="password"
              id="password"
              name="password"
              className="login-text"
              placeholder="password"
              value={pwd}
              onChange={hanldePwd}
            ></input>
          </div>
          <button type="submit" className="login-submit">
            로그인
          </button>
          <div className="button-list">
            <button type="button" className="button">
              아이디 찾기
            </button>
            <button type="button" className="button">
              비밀번호 찾기
            </button>
            <button
              type="button"
              className="button"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Link to="/auth">회원가입</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
