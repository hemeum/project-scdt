import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import './../App.css';

function Spinner() {
  return (
    <div className="spinner-flex">
      <ClipLoader color="#222" size={100}></ClipLoader>
    </div>
  );
}

export default Spinner;
