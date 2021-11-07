import React from 'react';
import { withRouter } from 'react-router-dom';

import logo from './../../images/logo.jpg';

import './../../styles/layouts/board-list/footer.css';

function Footer({ match }) {
  const { ctg } = match.params;
  return (
    <div
      className={
        ctg === 'notice' ? 'notice-board-list-footer' : ctg === 'video' ? 'video-board-footer' : ' board-list-footer'
      }
    >
      <p>
        <a href="">이용약관 | </a>
        <a href="">개인정보 처리방침 | </a>
        @SCDT All Rights Reserved.
      </p>
      <img src={logo} alt="로고입니다" />
    </div>
  );
}
export default withRouter(Footer);
