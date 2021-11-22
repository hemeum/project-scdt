import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Board from './board/Board';
import Footer from './Footer';

import './../../styles/layouts/contents.css';
import './../../styles/layouts/board-list/board.css';

import './../../styles/layouts/video-board/board.css';
import './../../styles/layouts/video-board/board-item.css';
import './../../styles/layouts/video-board/board.css';
import './../../styles/layouts/video-board/footer.css';
import './../../styles/layouts/profile/profile.css';

function BoardList({ order, setOrder, location, username, profileImg, setProfileImg, isLogin }) {
  useEffect(() => {
    if (location.state) {
      setOrder(location.state.newOrder);
      return;
    }
    let keepOrder = localStorage.getItem('keepOrder');

    if (keepOrder) {
      setOrder(Number(keepOrder)); // localStorage에서 가져오는 값은 문자열이기에 숫자가 필요하면 꼭 숫자로 변환해줘야함!!!!!!
    } else {
      setOrder(0);
    }
  }, [order]);

  return (
    <div className="contents">
      <div className="section">
        <Board
          isLogin={isLogin}
          profileImg={profileImg}
          setProfileImg={setProfileImg}
          order={order}
          setOrder={setOrder}
          username={username}
        />
      </div>
      <Footer />
    </div>
  );
}
export default withRouter(BoardList);
