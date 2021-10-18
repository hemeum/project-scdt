import React, { useState, useRef, useEffect } from 'react';

import './../../styles/layouts/uploadform/Categorys.css';

function Categorys({ category, setCategory }) {
  const ctgRef = useRef();
  const ctgListRef = useRef();
  const chevronRef = useRef();
  const ctgItemRef1 = useRef();
  const ctgItemRef2 = useRef();
  const ctgItemRef3 = useRef();
  const ctgItemRef4 = useRef();
  const ctgItemRef5 = useRef();
  const ctgItemRef6 = useRef();

  const ctgToggle = (e) => {
    if (ctgListRef.current.className === 'ctg-list-off') {
      e.target.style.border = '1px solid #333';
      ctgListRef.current.className = 'ctg-list-on';
      ctgListRef.current.style.opacity = '1';
      ctgListRef.current.style.visibility = 'visible';
      chevronRef.current.style.transform = 'translateY(-50%) rotateX(180deg)';
      chevronRef.current.style.color = '#333';
    } else if (ctgListRef.current.className === 'ctg-list-on') {
      e.target.style.border = '1px solid #ccc';
      ctgListRef.current.className = 'ctg-list-off';
      ctgListRef.current.style.opacity = '0';
      ctgListRef.current.style.visibility = 'hidden';
      chevronRef.current.style.transform = 'translateY(-50%) rotateX(0deg)';
      chevronRef.current.style.color = '#ccc';
    }
  };

  const categorySelecting = (e) => {
    ctgItemRef1.current.classList.remove('ctg-active');
    ctgItemRef2.current.classList.remove('ctg-active');
    ctgItemRef3.current.classList.remove('ctg-active');
    ctgItemRef4.current.classList.remove('ctg-active');
    ctgItemRef5.current.classList.remove('ctg-active');
    ctgItemRef6.current.classList.remove('ctg-active');
    e.target.classList.add('ctg-active');
    ctgRef.current.style.border = '1px solid #ccc';
    ctgListRef.current.className = 'ctg-list-off';
    ctgListRef.current.style.opacity = '0';
    ctgListRef.current.style.visibility = 'hidden';
    chevronRef.current.style.transform = 'translateY(-50%) rotateX(0deg)';
    chevronRef.current.style.color = '#ccc';
    setCategory(e.target.textContent);
  };

  return (
    <>
      <div className="ctg-select-box">
        <div className="ctg-box">
          <p className="ctg" onClick={ctgToggle} ref={ctgRef}>
            {category}
          </p>
          <i className="fas fa-chevron-down ctg-chevron" ref={chevronRef}></i>
          <ul className="ctg-list-off" ref={ctgListRef}>
            <li ref={ctgItemRef1} className="ctg-item ctg-active" onClick={categorySelecting}>
              자유게시판
            </li>
            <li ref={ctgItemRef2} className="ctg-item" onClick={categorySelecting}>
              추천게시판
            </li>
            <li ref={ctgItemRef3} className="ctg-item" onClick={categorySelecting}>
              영상콘텐츠
            </li>
            <li ref={ctgItemRef4} className="ctg-item" onClick={categorySelecting}>
              제작예정1
            </li>
            <li ref={ctgItemRef5} className="ctg-item" onClick={categorySelecting}>
              제작예정2
            </li>
            <li ref={ctgItemRef6} className="ctg-item" onClick={categorySelecting}>
              제작예정3
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Categorys;
