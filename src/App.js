import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import NotFound from './pages/NotFound';
import BoardList from './components/board-list/BoardList';
import Video from './components/video/Video';
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

  useEffect(async () => {
    const res = await axios.get('/loginCheck');
    setIsLogin(res.data.checkLogin);
    setUsername(res.data.username);
  }, [isLogin]);

  return (
    <HashRouter>
      <div className="contain">
        <HeaderGnb
          setOrder={setOrder}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          username={username}
          setUsername={setUsername}
        />
        <Switch>
          <Route exact path="/" render={() => <Contents order={order} setOrder={setOrder} />} />
          <Route path="/board_list/:ctg" render={() => <BoardList order={order} setOrder={setOrder} />} />
          <Route
            path="/user"
            render={() => (
              <Login isLogin={isLogin} setIsLogin={setIsLogin} username={username} setUsername={setUsername} />
            )}
          />
          <Route path="/auth" component={Auth} />
          <Route path="/video_list" component={Video} />
          <Route exact path="/uploadform" render={() => <UpLoadForm username={username} />} />
          <Route
            path="/board_view/:upload_id"
            render={() => <ViewBoard order={order} setOrder={setOrder} isLogin={isLogin} username={username} />}
          />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
