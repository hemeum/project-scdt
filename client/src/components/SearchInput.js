import React, { useState } from 'react';

export default function SearchInput({ value, onChange, onClick }) {
  return (
    <div className="search-input">
      <input type="text" className="allSearch" value={value} onChange={onChange} />
      <button type="button" className="search-button" onClick={onClick} aria-label="검색">
        <i className="fas fa-search search-icon"></i>
      </button>
    </div>
  );
}
