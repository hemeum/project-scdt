const router = require('express').Router();

module.exports = (connection, fileUpload) => {
  router.post('/info', (req, res) => {
    connection.query(
      'select name, gender, profile_img from auth where username=?',
      [req.body.username],
      (err, rows) => {
        if (err) {
          console.log('err 유저 info 불러오기');
        } else {
          res.send({ info: rows[0] });
        }
      },
    );
  });

  router.post('/img', fileUpload.single('imgFile'), (req, res) => {
    const image = `image/${req.file.filename}`;

    connection.query('update upload_data set profile_img = ? where username=?', [image, req.body.username]);
    connection.query('update comment_data set profile_img = ? where username=?', [image, req.body.username]);
    connection.query('update reply_data set profile_img = ? where username=?', [image, req.body.username]);

    connection.query('update auth set profile_img = ? where username=?', [image, req.body.username], (err, rows) => {
      if (err) {
        console.log('err 프로필 이미지 테이블에 추가');
      } else {
        connection.query(
          'select name, gender,profile_img from auth where username=?',
          [req.body.username],
          (err, rows) => {
            if (err) {
              console.log('err 추가한 프로필 이미지 가져오기');
            } else {
              res.send(rows[0]);
            }
          },
        );
      }
    });
  });

  router.post('/length', (req, res) => {
    connection.query('select * from upload_data where username=?', [req.body.username], (err, rows) => {
      if (err) {
        console.log('err 작성글 갯수 불러오기');
      } else {
        const writeLength = rows.length;
        connection.query('select * from comment_data where username=?', [req.body.username], (err, rows) => {
          if (err) {
            console.log('err 댓글 쓴 갯수 불러오기');
          } else {
            const commentLength = rows.length;
            connection.query('select * from reply_data where username=?', [req.body.username], (err, rows) => {
              if (err) {
                console.log('err 답글 쓴 갯수 불러오기');
              } else {
                const replyLength = rows.length;
                res.send({ writeLength: writeLength, commentLength: Number(commentLength) + Number(replyLength) });
              }
            });
          }
        });
      }
    });
  });
  return router;
};
