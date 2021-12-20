const router = require('express').Router();

module.exports = (connection) => {
  router.post('/join', (req, res) => {
    // 회원가입
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

  router.post('/username', (req, res) => {
    // 회원가입 후 로그인한 유저의 아이디(네임)
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

  return router;
};
