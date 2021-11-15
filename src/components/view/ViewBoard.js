import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import Board from './../board-list/board/Board';
import Footer from './../board-list/Footer';
import ViewUser from './ViewUser';
import ViewComment from './ViewComment';

import './../../styles/layouts/contents.css';
import './../../styles/layouts/view/view-board.css';

function ViewBoard({ isLogin, username, setOrder, order, profileImg }) {
  const [userComment, setUserComment] = useState([]);
  const [commentLength, setCommentLength] = useState('0');
  const [viewUserData, setViewUserData] = useState({}); // DB에 저장된 해당 뷰보드 만든 유저의 데이터

  let categoryData = viewUserData.category;

  useEffect(() => {
    // 로컬스토리지로 이전 order값 유지

    const prevOrder = localStorage.getItem('order');
    if (prevOrder) {
      setOrder(Number(prevOrder));
    }
  }, [order]);

  return (
    <div className="contents">
      <div className="view-board">
        <ViewUser
          profileImg={profileImg}
          isLogin={isLogin}
          username={username}
          userComment={userComment}
          commentLength={commentLength}
          viewUserData={viewUserData}
          setViewUserData={setViewUserData}
          order={order}
          setOrder={setOrder}
        />
        <ViewComment
          profileImg={profileImg}
          isLogin={isLogin}
          username={username}
          userComment={userComment}
          setUserComment={setUserComment}
          commentLength={commentLength}
          setCommentLength={setCommentLength}
        />
        <Board categoryData={categoryData} order={order} setOrder={setOrder} />
        <Footer categoryData={categoryData} />
      </div>
    </div>
  );
}

export default withRouter(ViewBoard);
