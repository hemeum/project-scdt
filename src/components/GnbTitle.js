import React from 'react';
import logo from './../images/logo.jpg';

export default function GnbTitle() {
  return (
    <div className="gnb-title">
      <a href="/">
        <img src={logo} alt="로고" />
        <h1>공유하면 커피 맛이 두배 SCDT</h1>
      </a>
    </div>
  );
}
