import React, { useState } from 'react';
import GnbTitle from './GnbTitle.js';
import SearchInput from './SearchInput.js';
import WriteButton from './WriteButton.js';
import GnbMenu from './GnbMenu.js';
import TopAuth from './TopAuth.js';

import './../styles/base/reset.css';
import './../styles/base/visually-hidden.css';
import './../styles/layouts/gnb.css';
import './../styles/layouts/search-input.css';
import './../styles/layouts/write-button.css';
import './../styles/layouts/gnb-menu.css';
import './../styles/layouts/top-auth.css';
import { Link, withRouter } from 'react-router-dom';

function HeaderGnb({ isLogin, setIsLogin, username, history, setOrder }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const handleSearchButton = () => {
    setInputValue('');
  };
  const handleWriteButton = () => {
    if (isLogin === true) {
      history.push('/uploadform');
    } else {
      let yes_login = window.confirm('로그인이 필요합니다.');
      if (yes_login === true) {
        console.log('login');
        history.push('/user');
      } else if (yes_login === false) {
        console.log('notLogin');
        return;
      }
    }
  };

  return (
    <>
      <header className="gnb">
        <GnbTitle></GnbTitle>
        <SearchInput value={inputValue} onChange={handleInputValue} onClick={handleSearchButton}></SearchInput>
        <WriteButton onClick={handleWriteButton} write={'글쓰기'}></WriteButton>
        <GnbMenu setOrder={setOrder}></GnbMenu>
        <TopAuth username={username} isLogin={isLogin} setIsLogin={setIsLogin}></TopAuth>
      </header>
    </>
  );
}

export default withRouter(HeaderGnb);
