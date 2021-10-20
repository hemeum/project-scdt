const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const MysqlStore = require('express-mysql-session')(session);

const options = {
  host: 'localhost',
  port: '3306',
  user: 'sss1997',
  password: 'gmldms971506!',
  database: 'scdt',
};

const sessionStore = new MysqlStore(options);

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  database: 'scdt',
  user: 'sss1997',
  password: 'gmldms971506!',
});

connection.connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'Secret key',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  }),
);

// 회원가입, 로그인 로직

app.get('/loginCheck', (req, res) => {
  if (req.session.isLogin) {
    res.send({ checkLogin: true, username: req.session.user_id });
  } else {
    res.send({ checkLogin: false });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.post('/user/login', (req, res) => {
  connection.query('select username, password from auth', (err, rows) => {
    if (err) {
      console.log('error');
    } else {
      const authUsername = rows.filter((user) => {
        return req.body.user_name === user.username;
      })[0];
      const authPwd = rows.filter((user) => {
        return req.body.user_pwd === user.password;
      })[0];

      console.log(authUsername);
      console.log(authPwd);
      if (authUsername && authPwd) {
        req.session.isLogin = true;
        req.session.user_id = req.body.user_name;
        res.send({ checkLogin: true, nickname: req.body.user_name, reLogin: false });
      } else {
        res.send({ checkLogin: false, reLogin: true });
      }
    }
  });
});

app.post('/auth/join', (req, res) => {
  connection.query(
    'INSERT INTO auth(username, password, name, gender, bYear, bMonth, bDay, phoneNumber) Values(?, ?, ?, ?, ?, ?, ?, ?)',
    [
      req.body.username,
      req.body.pwd,
      req.body.name,
      req.body.gender,
      req.body.birthdayYear,
      req.body.birthdayMonth,
      req.body.birthdayDay,
      req.body.phoneNumber,
    ],
    (err) => {
      if (err) {
        console.log('err');
      } else {
        console.log('성공');
      }
    },
  );
  res.send('회원가입 성공');
});

app.post('/auth/username', (req, res) => {
  connection.query('select username from auth', (err, rows, fields) => {
    if (err) {
      console.log('err');
    } else {
      const authUsername = rows.filter((user) => {
        return user.username === req.body.username;
      })[0];

      if (authUsername) {
        res.send({ repeat: true });
      } else {
        res.send({ repeat: false });
      }
    }
  });
});

// upload 로직

app.post('/upload', (req, res) => {
  console.log(req.body);
  let data = [req.body.category, req.body.title, req.body.username, req.body.text];
  connection.query(
    'INSERT INTO upload_data(category, title, username, text, date) values(?, ?, ?, ?, NOW())',
    data,
    (err, rows) => {
      if (err) {
        console.log('err');
      } else {
        console.log(rows);
        res.send('완료');
      }
    },
  );
});

app.get('/list', (req, res) => {
  connection.query('select * from upload_data', (err, rows) => {
    if (err) {
      console.log('err');
    } else {
      res.send(rows);
    }
  });
});

/*
app.post('/view', (req, res) => {
  connection.query('select * from upload_data', (err, rows) => {
    if (err) {
      console.log('err viewboard');
    } else {
      const id = rows.filter((data) => {
        return data.id === Number(req.body.upload_id);
      });
      const sendId = id[0];
      res.send(sendId);
    }
  });
});
*/

app.post('/view', (req, res) => {
  console.log(req.body.username);
  connection.query('select * from upload_data', (err, rows) => {
    if (err) {
      console.log('err viewboard');
    } else {
      const id = rows.filter((data) => {
        return data.id === Number(req.body.upload_id);
      });
      const sendId = id[0];

      if (sendId.username === req.body.username) {
        res.send({ ...sendId, checkUser: true });
      } else {
        res.send({ ...sendId, checkUser: false });
      }
    }
  });
});

app.post('/heart', (req, res) => {
  if (req.body.isHeart === false) {
    req.session.isHeart = true;
    connection.query(
      `update upload_data set heart = ${Number(req.body.heart) + 1} where id = ${Number(req.body.upload_id)}`,
      (err, rows) => {
        if (err) {
          console.log('err');
        } else {
          connection.query(`select heart from upload_data where id = ${Number(req.body.upload_id)}`, (err, rows) => {
            if (err) {
              console.log('err');
            } else {
              const heart = rows[0].heart;
              res.send({ heart: heart, isHeart: true });
            }
          });
        }
      },
    );
  } else if (req.body.isHeart === true) {
    req.session.isHeart = false;
    connection.query(
      `update upload_data set heart = ${Number(req.body.heart) - 1} where id = ${Number(req.body.upload_id)}`,
      (err, rows) => {
        if (err) {
          console.log('err');
        } else {
          connection.query(`select heart from upload_data where id = ${Number(req.body.upload_id)}`, (err, rows) => {
            if (err) {
              console.log('err');
            } else {
              const heart = rows[0].heart;
              res.send({ heart: heart, isHeart: false });
            }
          });
        }
      },
    );
  }
});

// 세션으로 좋아요 했는지 확인 및 새로고침해도 좋아요 유지
app.post('/heartCheck', (req, res) => {
  if (req.session.isHeart) {
    connection.query(`select heart from upload_data where id = ${req.body.upload_id}`, (err, rows) => {
      if (err) {
        console.log('err');
      } else {
        const heart = rows[0].heart;
        res.send({ checkHeart: true, heart: heart });
      }
    });
  } else {
    connection.query(`select heart from upload_data where id = ${req.body.upload_id}`, (err, rows) => {
      if (err) {
        console.log('err');
      } else {
        const heart = rows[0].heart;
        res.send({ checkHeart: false, heart: heart });
      }
    });
  }
});

// video 로직

app.get('/video/data', (req, res) => {
  connection.query('select * from video_data', (err, rows) => {
    if (err) {
      console.log('err');
    } else {
      res.send(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`서버 ${port}가 열렸습니다.`);
});
