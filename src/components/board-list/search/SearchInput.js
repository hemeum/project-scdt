import React, { useState } from 'react';

import './../../../styles/layouts/board-list/board-search-input.css';

export default function SearchInput({ data, setOrder, setNewData, categoryTag, categoryData, setInitialBoard }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchButton = () => {
    setOrder(0);
    if (categoryTag.current.textContent === categoryData[0].category) {
      // 제목 + 내용일 때
      const newD = data.filter((item) => {
        return item.title.indexOf(inputValue) !== -1 || item.text.indexOf(inputValue) !== -1;
      });
      setNewData(newD);
      setInitialBoard(false);
    } else if (categoryTag.current.textContent === categoryData[1].category) {
      // 제목일 때
      const newD = data.filter((item) => {
        return item.title.indexOf(inputValue) !== -1;
      });
      setNewData(newD);
      setInitialBoard(false);
    } else if (categoryTag.current.textContent === categoryData[2].category) {
      // 내용일 때
      const newD = data.filter((item) => {
        return item.text.indexOf(inputValue) !== -1;
      });
      setNewData(newD);
      setInitialBoard(false);
    }
  };

  return (
    <div className="notice-board-search-input">
      <input type="text" className="notice-board-allSearch" value={inputValue} onChange={handleInputValue} />
      <button type="button" className="notice-board-search-button" aria-label="검색" onClick={handleSearchButton}>
        <i className="fas fa-search notice-board-search-icon"></i>
      </button>
    </div>
  );
}
