import React from 'react';

import './../../styles/layouts/sub-banner.css';

import cookie from './../../images/banner-9.png';
import pancake from './../../images/banner-13.jpg';
import icream from './../../images/banner-15.jpg';

export default function SubBanner() {
  return (
    <div className="sub-banner">
      <ul className="sub-banner-list">
        <li className="sub-banner-list-item">
          <a href="/">
            <img src={pancake} alt="팬 케이크" />
          </a>
        </li>
        <li className="sub-banner-list-item">
          <a href="/">
            <img src={cookie} alt="쿠키" />
          </a>
        </li>
        <li className="sub-banner-list-item">
          <a href="/">
            <img src={icream} alt="아이스크림" />
          </a>
        </li>
      </ul>
    </div>
  );
}
