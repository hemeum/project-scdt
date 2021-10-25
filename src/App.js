import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import NotFound from './pages/NotFound';
import NoticeContents from './components/notice-contents/NoticeContents';
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

  useEffect(async () => {
    const res = await axios.get('/loginCheck');
    setIsLogin(res.data.checkLogin);
    setUsername(res.data.username);
  }, [isLogin]);

  return (
    <HashRouter>
      <div className="contain">
        <HeaderGnb isLogin={isLogin} setIsLogin={setIsLogin} username={username} setUsername={setUsername} />
        <Switch>
          <Route exact path="/" component={Contents} />
          <Route path="/notice" render={() => <NoticeContents />} />
          <Route
            path="/user"
            render={() => (
              <Login isLogin={isLogin} setIsLogin={setIsLogin} username={username} setUsername={setUsername} />
            )}
          />
          <Route path="/auth" component={Auth} />
          <Route path="/video" component={Video} />
          <Route exact path="/uploadform" render={() => <UpLoadForm username={username} />} />
          <Route path="/board_view/:upload_id" render={() => <ViewBoard isLogin={isLogin} username={username} />} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
