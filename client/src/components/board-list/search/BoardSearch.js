import React, { useState, useRef } from 'react';

import './../../../styles/layouts/board-list/board-search.css';

import SearchInput from './SearchInput';

function BoardSearch({ data, newData, setNewData, setInitialBoard, setOrder }) {
  const listRef = useRef();
  const listItemRef1 = useRef();
  const listItemRef2 = useRef();
  const listItemRef3 = useRef();
  const categoryRef = useRef();
  const categoryButtonRef = useRef();

  const handleChevron = (e) => {
    e.preventDefault();
    if (e.target.className === 'select-category-chevron-down') {
      e.target.className = 'select-category-chevron-up';
      listRef.current.style.opacity = '1';
      listRef.current.style.visibility = 'visible';
      e.target.style.border = '1px solid #333';
    } else if (e.target.className === 'select-category-chevron-up') {
      e.target.className = 'select-category-chevron-down';
      listRef.current.style.opacity = '0';
      listRef.current.style.visibility = 'hidden';
      e.target.style.border = '1px solid #ccc';
    }
  };

  const category = [
    { id: 1, category: '제목 + 내용' },
    { id: 2, category: '제목' },
    { id: 3, category: '내용' },
  ];

  const handleListItem = (e) => {
    listItemRef1.current.classList.remove('active');
    listItemRef2.current.classList.remove('active');
    listItemRef3.current.classList.remove('active');
    e.target.classList.add('active');
    categoryRef.current.textContent = `${e.target.textContent}`;
    listRef.current.style.opacity = '0';
    listRef.current.style.visibility = 'hidden';
    categoryButtonRef.current.className = 'select-category-chevron-down';
    categoryButtonRef.current.style.border = '1px solid #ccc';
  };

  return (
    <div className="search-area">
      <h2 className="visually-hidden">검색기능입니다.</h2>
      <button ref={categoryButtonRef} className="select-category-chevron-down" onClick={handleChevron}>
        <span ref={categoryRef}>{category[0].category}</span>
        <i className="fas fa-chevron-down chevron"></i>
        <ul ref={listRef} className="select-category-list">
          <li
            key={category[0].id}
            ref={listItemRef1}
            onClick={handleListItem}
            className="select-category-list-item active"
          >
            {category[0].category}
          </li>
          <li key={category[1].id} ref={listItemRef2} onClick={handleListItem} className="select-category-list-item">
            {category[1].category}
          </li>
          <li key={category[2].id} ref={listItemRef3} onClick={handleListItem} className="select-category-list-item">
            {category[2].category}
          </li>
        </ul>
      </button>
      <SearchInput
        data={data}
        setNewData={setNewData}
        newData={newData}
        categoryTag={categoryRef}
        categoryData={category}
        setInitialBoard={setInitialBoard}
        setOrder={setOrder}
      ></SearchInput>
    </div>
  );
}

export default BoardSearch;
