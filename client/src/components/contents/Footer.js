import React from 'react';
import logo from './../../images/logo-3.png';

import './../../styles/layouts/footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <p>
        <a href="/">이용약관 | </a>
        <a href="/">개인정보 처리방침 | </a>
        @SCDT All Rights Reserved.
      </p>
      <img src={logo} alt="로고입니다" />
    </div>
  );
}
