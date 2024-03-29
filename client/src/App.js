import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import NotFound from './pages/NotFound';
import BoardList from './components/board-list/BoardList';
import Profile from './components/profile/Profile';

import UpLoadForm from './components/uploadform/UpLoadForm';
import ViewBoard from './components/view/ViewBoard';
import Login from './components/login/Login';
import Auth from './components/login/Auth';
import './App.css';
import './styles/base/reset.css';
import './styles/base/visually-hidden.css';

import axios from 'axios';

export function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [order, setOrder] = useState(0);
  const [profileImg, setProfileImg] = useState('');

  useEffect(async () => {
    const res = await axios.get('/user/check');
    setIsLogin(res.data.checkLogin);
    setUsername(res.data.username);
  }, [isLogin]);

  return (
    <HashRouter>
      <div className="contain">
        <Route
          path="/"
          render={() => (
            <HeaderGnb
              setOrder={setOrder}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              username={username}
              setUsername={setUsername}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
          )}
        />
        <Switch>
          <Route exact path="/" render={() => <Contents order={order} setOrder={setOrder} />} />
          <Route
            path="/board_list/:ctg"
            render={() => (
              <BoardList
                isLogin={isLogin}
                profileImg={profileImg}
                setProfileImg={setProfileImg}
                order={order}
                setOrder={setOrder}
                username={username}
              />
            )}
          />
          <Route
            path="/user"
            render={() => (
              <Login isLogin={isLogin} setIsLogin={setIsLogin} username={username} setUsername={setUsername} />
            )}
          />
          <Route path="/auth" component={Auth} />

          <Route exact path="/uploadform" render={() => <UpLoadForm profileImg={profileImg} username={username} />} />
          <Route
            path="/board_view/:upload_id"
            render={() => (
              <ViewBoard
                profileImg={profileImg}
                order={order}
                setOrder={setOrder}
                isLogin={isLogin}
                username={username}
              />
            )}
          />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
      <div className="con-overay"></div>
    </HashRouter>
  );
}

export default App;
