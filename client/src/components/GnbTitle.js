import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../images/logo-3.png';

export default function GnbTitle() {
  return (
    <div className="gnb-title">
      <Link to="/">
        <img src={logo} alt="로고" />
        <h1>
          공유하면 커피 맛이 두배 <br />
          SCDT
        </h1>
      </Link>
    </div>
  );
}
