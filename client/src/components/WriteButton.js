import React, { useState } from 'react';

export default function WriteButton({ onClick, write }) {
  return (
    <button type="button" className="write-button" onClick={onClick}>
      <i className="fas fa-pen write-icon"></i>
      <h3>{write}</h3>
    </button>
  );
}
