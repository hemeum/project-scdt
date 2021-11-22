import React from 'react';

import './../../styles/layouts/sub-banner.css';

import cookie from './../../images/cookie.jpg';
import pancake from './../../images/pancake.jpg';
import icream from './../../images/icream.jpg';

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
