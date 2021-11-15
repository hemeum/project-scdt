import React, { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import BoardSearch from './../search/BoardSearch';
import BoardTop from './../board-top/BoardTop';
import Spinner from './../../Spinner';
import Profile from './../../profile/Profile';

function Board({ match, categoryData, order, setOrder, username, profileImg, setProfileImg, isLogin }) {
  // categoryData는 viewboard에서 viewuserdata의 category를 의미함
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [boardList, setBoardList] = useState([]);

  const [loading, setLoading] = useState(false);

  const { ctg } = match.params; // board_list에서 free, notice 등 의미함

  const boardCollectionRef = useRef();

  useEffect(async () => {
    setLoading(true);
    await axios.post('/list', { ctg: ctg, category_data: categoryData, username: username }).then((res) => {
      setBoardList(res.data);
      setLoading(false);
    });
  }, [ctg, categoryData, username]);

  const spliceBoardList = [...boardList].splice(order, ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10);
  const spliceSearchBoardList = [...newData].splice(order, ctg === 'video' || categoryData === '영상콘텐츠' ? 12 : 10);

  const board = spliceBoardList.map((boardItem, index) => {
    const date = moment(boardItem.date).format('YYYY.MM.DD');
    return (
      <BoardItem
        key={boardItem.id}
        ctg={ctg}
        order={order}
        uploadId={boardItem.id}
        index={index}
        category={boardItem.category}
        title={boardItem.title}
        date={date}
        views={boardItem.views}
        comment={boardItem.comment}
        username={boardItem.username}
        heart={boardItem.heart}
        text={boardItem.text}
      />
    );
  });

  const newBoard = spliceSearchBoardList.map((boardItem, index) => {
    const date = moment(boardItem.date).format('YYYY.MM.DD');
    return (
      <BoardItem
        key={boardItem.id}
        ctg={ctg}
        order={order}
        uploadId={boardItem.id}
        index={index}
        category={boardItem.category}
        title={boardItem.title}
        date={date}
        views={boardItem.views}
        comment={boardItem.comment}
        username={boardItem.username}
        heart={boardItem.heart}
        text={boardItem.text}
      />
    );
  });

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          {ctg === 'profile' ? (
            <Profile
              isLogin={isLogin}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
              username={username}
              boardList={boardList}
              setBoardList={setBoardList}
            ></Profile>
          ) : undefined}
          {ctg === 'notice' ? (
            <BoardTop order={order} setOrder={setOrder} boardList={boardList} setBoardList={setBoardList} />
          ) : undefined}
          {ctg && ctg !== 'profile' ? (
            <BoardSearch
              data={boardList}
              setInitialBoard={setInitialBoard}
              setNewData={setNewData}
              newData={newData}
              setOrder={setOrder}
            />
          ) : undefined}
          <div className="board">
            {categoryData ? <h3>{categoryData}</h3> : undefined}
            <div ref={boardCollectionRef} className="board-collection">
              <ul className="board-list">
                {initialBoard ? (
                  board
                ) : newData.length === 0 ? (
                  <div className="not-search">검색 결과 - 0</div>
                ) : (
                  newBoard
                )}
              </ul>
            </div>
            <BoardControll order={order} setOrder={setOrder} categoryData={categoryData} />
          </div>
        </>
      )}
    </>
  );
}

export default withRouter(Board);
