import React, { useState, useRef, useEffect } from 'react';

import './../../styles/layouts/main-banner.css';

import slide1 from './../../images/mega.jpg';
import slide2 from './../../images/starburks.jpg';
import slide3 from './../../images/rabit.jpg';
import slide4 from './../../images/compose.jpg';
import slide5 from './../../images/bback.jpg';

export default function MainBanner() {
  const listRef = useRef();
  const rightArrowRef = useRef();
  const leftArrowRef = useRef();
  const bannerNaviRef1 = useRef();
  const bannerNaviRef2 = useRef();
  const bannerNaviRef3 = useRef();
  const bannerNaviRef4 = useRef();

  const [translate, setTranslate] = useState(0);
  const imgs = [
    { src: slide1, alt: '메가커피 배너', id: 1 },
    { src: slide2, alt: '스타벅스 배너', id: 2 },
    { src: slide3, alt: '래빗커피 배너', id: 3 },
    { src: slide4, alt: '컴포즈커피 배너', id: 4 },
    { src: slide5, alt: '빽다방 배너', id: 5 },
  ];

  const imgSlide = imgs.map((img, index) => {
    return (
      <li key={img.id} className="main-banner-list-item">
        <a href="/">
          <img src={img.src} alt={img.alt} />
        </a>
      </li>
    );
  });

  const handleRightArrow = () => {
    if (translate === 0) {
      listRef.current.style.transform = `translateX(${translate - 460}px)`;
      setTranslate(translate - 460);
      bannerNaviRef1.current.classList.remove('is-active');
      bannerNaviRef2.current.classList.add('is-active');
    } else if (translate === -460) {
      listRef.current.style.transform = `translateX(${translate - 460}px)`;
      setTranslate(translate - 460);
      bannerNaviRef2.current.classList.remove('is-active');
      bannerNaviRef3.current.classList.add('is-active');
    } else if (translate === -920) {
      listRef.current.style.transform = `translateX(${translate - 460}px)`;
      setTranslate(translate - 460);
      bannerNaviRef3.current.classList.remove('is-active');
      bannerNaviRef4.current.classList.add('is-active');
    }
  };

  const handleLeftArrow = () => {
    if (translate === -1380) {
      listRef.current.style.transform = `translateX(${translate + 460}px)`;
      setTranslate(translate + 460);
      bannerNaviRef4.current.classList.remove('is-active');
      bannerNaviRef3.current.classList.add('is-active');
    } else if (translate === -920) {
      listRef.current.style.transform = `translateX(${translate + 460}px)`;
      setTranslate(translate + 460);
      bannerNaviRef3.current.classList.remove('is-active');
      bannerNaviRef2.current.classList.add('is-active');
    } else if (translate === -460) {
      listRef.current.style.transform = `translateX(${translate + 460}px)`;
      setTranslate(translate + 460);
      bannerNaviRef2.current.classList.remove('is-active');
      bannerNaviRef1.current.classList.add('is-active');
    }
  };

  const handlebannerNavi = (e) => {
    if (e.target === bannerNaviRef1.current) {
      listRef.current.style.transform = `translateX(0px)`;
      setTranslate(0);
      bannerNaviRef1.current.classList.add('is-active');
      bannerNaviRef2.current.classList.remove('is-active');
      bannerNaviRef3.current.classList.remove('is-active');
      bannerNaviRef4.current.classList.remove('is-active');
    } else if (e.target === bannerNaviRef2.current) {
      listRef.current.style.transform = `translateX(-460px)`;
      setTranslate(-460);
      bannerNaviRef1.current.classList.remove('is-active');
      bannerNaviRef2.current.classList.add('is-active');
      bannerNaviRef3.current.classList.remove('is-active');
      bannerNaviRef4.current.classList.remove('is-active');
    } else if (e.target === bannerNaviRef3.current) {
      listRef.current.style.transform = `translateX(-920px)`;
      setTranslate(-920);
      bannerNaviRef1.current.classList.remove('is-active');
      bannerNaviRef2.current.classList.remove('is-active');
      bannerNaviRef3.current.classList.add('is-active');
      bannerNaviRef4.current.classList.remove('is-active');
    } else if (e.target === bannerNaviRef4.current) {
      listRef.current.style.transform = `translateX(-1380px)`;
      setTranslate(-1380);
      bannerNaviRef1.current.classList.remove('is-active');
      bannerNaviRef2.current.classList.remove('is-active');
      bannerNaviRef3.current.classList.remove('is-active');
      bannerNaviRef4.current.classList.add('is-active');
    }
  };

  useEffect(() => {
    if (translate !== 0) {
      leftArrowRef.current.style.fontSize = '40px';
    } else if (translate === 0) {
      leftArrowRef.current.style.fontSize = '0px';
    }

    if (translate === -1380) {
      rightArrowRef.current.style.fontSize = '0px';
    } else if (translate !== -1380) {
      rightArrowRef.current.style.fontSize = '40px';
    }

    const autoSlide = setInterval(() => {
      if (translate === -1380) {
        setTranslate(0);
        listRef.current.style.transform = 'translateX(0px)';
        bannerNaviRef4.current.classList.remove('is-active');
        bannerNaviRef1.current.classList.add('is-active');
      } else {
        listRef.current.style.transform = `translateX(${translate - 460}px)`;
        setTranslate(translate - 460);
        if (translate === 0) {
          bannerNaviRef1.current.classList.remove('is-active');
          bannerNaviRef2.current.classList.add('is-active');
        } else if (translate === -460) {
          bannerNaviRef2.current.classList.remove('is-active');
          bannerNaviRef3.current.classList.add('is-active');
        } else if (translate === -920) {
          bannerNaviRef3.current.classList.remove('is-active');
          bannerNaviRef4.current.classList.add('is-active');
        }
      }
    }, 2000);

    return () => {
      clearInterval(autoSlide);
    };
  }, [translate]);

  return (
    <div className="main-banner">
      <ul ref={listRef} className="main-banner-list">
        {imgSlide}
      </ul>

      <ul className="banner-navi">
        <li key={1} ref={bannerNaviRef1} onClick={handlebannerNavi} className="is-active"></li>
        <li key={2} ref={bannerNaviRef2} onClick={handlebannerNavi}></li>
        <li key={3} ref={bannerNaviRef3} onClick={handlebannerNavi}></li>
        <li key={4} ref={bannerNaviRef4} onClick={handlebannerNavi}></li>
      </ul>

      <button type="button" onClick={handleRightArrow}>
        <i ref={rightArrowRef} className="fas fa-arrow-right arrow-right"></i>
      </button>
      <button type="button" onClick={handleLeftArrow}>
        <i ref={leftArrowRef} className="fas fa-arrow-left arrow-left"></i>
      </button>
    </div>
  );
}
