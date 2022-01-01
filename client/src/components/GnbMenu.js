import React from 'react';
import { Link } from 'react-router-dom';

function GnbMenu({ setOrder }) {
  const handleChevron = (e) => {
    e.preventDefault();
    if (e.target.className === 'gnb-menu-item-chevron-down') {
      e.target.className = 'gnb-menu-item-chevron-up';
    } else if (e.target.className === 'gnb-menu-item-chevron-up') {
      e.target.className = 'gnb-menu-item-chevron-down';
    }
  };

  const listItems = [
    {
      value: 'notice list items',
      items: [
        { id: 1, category: '공지사항' },
        { id: 2, category: '2' },
        { id: 3, category: '3' },
        { id: 4, category: '4' },
      ],
      url: '/board_list/notice',
      id: 1,
    },
    {
      value: 'community list item',
      items: [
        { id: 5, category: '자유게시판' },
        { id: 6, category: '6' },
        { id: 7, category: '7' },
        { id: 8, category: '8' },
      ],
      url: '/board_list/free',
      id: 2,
    },
    {
      value: 'recommend list item',
      items: [
        { id: 9, category: '추천게시판' },
        { id: 10, category: '10' },
        { id: 11, category: '11' },
        { id: 12, category: '12' },
      ],
      url: '/board_list/recommend',
      id: 3,
    },
    {
      value: 'video list item',
      items: [
        { id: 13, category: '영상콘텐츠' },
        { id: 14, category: '14' },
        { id: 15, category: '15' },
        { id: 16, category: '16' },
      ],
      url: '/board_list/video',
      id: 4,
    },
  ];
  const menuList = listItems.map((item, index) => {
    return (
      <>
        {item.items.map((smallItem) => {
          return (
            <li
              className="list-item"
              key={smallItem.id}
              onClick={() => {
                window.scrollTo(0, 0);
                setOrder(0);
                localStorage.removeItem('keepOrder');
                localStorage.removeItem('keepButtonValue');
              }}
            >
              <Link to={item.url} aria-label={item.value}>
                {smallItem.category}
              </Link>
            </li>
          );
        })}
      </>
    );
  });
  const menuTitle = [
    { id: 1, title: 'Notice' },
    { id: 2, title: 'Community' },
    { id: 3, title: 'Recommend' },
    { id: 4, title: 'Video' },
  ];
  const menu = menuTitle.map((item, index) => {
    return (
      <li key={item.id} className="gnb-menu-item-chevron-down" onClick={handleChevron}>
        <a href="/" className="gnb-menu-item" aria-label="목록리스트">
          <img src={process.env.PUBLIC_URL + `img/icon${item.id}.png`} className="img-icon" />
          <span>{item.title}</span>
          <i className="fas fa-chevron-down chevron"></i>
        </a>
        <ul className="menu-list">{menuList[index]}</ul>
      </li>
    );
  });

  return (
    <>
      <nav className="gnb-menu">
        <h2 className="visually-hidden">메뉴</h2>
        <ul className="gnb-menu-list">{menu}</ul>
      </nav>
    </>
  );
}
export default GnbMenu;
