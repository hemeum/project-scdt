const router = require('express').Router();

module.exports = (connection) => {
  router.post('/login', (req, res) => {
    // 로그인한 유저 판별
    connection.query('select username from auth', (err, rows) => {
      if (err) {
        console.log('없는 아이디');
      } else {
        console.log(rows);
        const yesUsername = rows.filter((data) => {
          return data.username === req.body.user_name;
        });
        if (yesUsername.length !== 0) {
          connection.query('select password from auth where username=?', [req.body.user_name], (err, rows) => {
            if (err) {
              console.log('로그인 error');
            } else {
              if (rows[0].password === req.body.user_pwd) {
                req.session.isLogin = true;
                req.session.user_id = req.body.user_name;
                res.send({ checkLogin: true, nickname: req.body.user_name, reLogin: false });
              } else {
                res.send({ checkLogin: false, reLogin: true });
              }
            }
          });
        } else {
          res.send({ checkLogin: false, reLogin: true });
        }
      }
    });
  });

  router.get('/check', (req, res) => {
    if (req.session.isLogin) {
      res.send({ checkLogin: true, username: req.session.user_id });
    } else {
      res.send({ checkLogin: false });
    }
  });

  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  router.post('/profile_img', (req, res) => {
    connection.query('select profile_img from auth where username=?', [req.body.username], (err, rows) => {
      if (err) {
        console.log('프로필 이미지 가져오기 에러 발생 탑어스 컴포넌트');
      } else {
        res.send(rows[0]);
      }
    });
  });

  return router;
};
