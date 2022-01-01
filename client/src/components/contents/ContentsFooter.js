import React from 'react';

import './../../styles/layouts/contents.css';
import './../../styles/layouts/section-banner.css';

import bannerImgOne from './../../images/banner-1.png';
import bannerImgTwo from './../../images/banner-2.png';

export default function ContentsFooter() {
  return (
    <div className="section-footer">
      <ul className="section-banner">
        <li key={1} className="section-banner-item">
          <a href="/">
            <img src={bannerImgOne} alt="원두 상품 홍보 배너입니다" />
          </a>
        </li>
        <li key={2} className="section-banner-item">
          <a href="/">
            <img src={bannerImgTwo} alt="원두제품 협력업체 홍보 배너입니다." />
          </a>
        </li>
      </ul>
    </div>
  );
}
