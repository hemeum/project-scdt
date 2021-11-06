import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import Footer from './Footer';
import Board from './../board-list/board/Board';
import ViewUser from './ViewUser';
import ViewComment from './ViewComment';

import './../../styles/layouts/contents.css';
import './../../styles/layouts/view/view-board.css';

function ViewBoard({ isLogin, username, setOrder, order }) {
  const [userComment, setUserComment] = useState([]);
  const [commentLength, setCommentLength] = useState('0');
  const [viewUserData, setViewUserData] = useState({}); // DB에 저장된 해당 뷰보드 만든 유저의 데이터

  const categoryData = viewUserData.category;

  return (
    <div className="contents">
      <div className="view-board">
        <ViewUser
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
          isLogin={isLogin}
          username={username}
          userComment={userComment}
          setUserComment={setUserComment}
          commentLength={commentLength}
          setCommentLength={setCommentLength}
        />
        <Board categoryData={categoryData} order={order} setOrder={setOrder} />
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(ViewBoard);
