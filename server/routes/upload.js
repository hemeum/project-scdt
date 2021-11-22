const router = require('express').Router();

module.exports = (connection, fileUpload) => {
  router.post('/image', fileUpload.single('image'), (req, res) => {
    // 업로드폼에서 이미지 업로드
    const image = `image/${req.file.filename}`; // filename으로 업로드 폴더에 저장해놨으니 파일 네임을 보내줘야 한다!!!!!!!!!!
    res.send(image);
  });

  router.post('/add', (req, res) => {
    // 업로드폼에서 업로드
    let data = [req.body.category, req.body.title, req.body.username, req.body.text, req.body.profileImg];

    console.log(req.body.text, req.body);

    connection.query(
      'INSERT INTO upload_data(category, title, username, text, date, profile_img) values(?, ?, ?, ?, NOW(),?)',
      data,
      (err) => {
        if (err) {
          console.log('err');
        } else {
          connection.query('select id from upload_data order by date desc limit 1', (err, rows) => {
            if (err) {
              console.log('err 추가한 업로드 id 보내주기 실패');
            } else {
              res.send({ upload_id: rows[0].id });
            }
          });
        }
      },
    );
  });

  router.put('/update', (req, res) => {
    // 업로드한 거 수정
    connection.query(
      'update upload_data set category=?, title=?, text=?, date=NOW() where id=?',
      [req.body.category, req.body.title, req.body.text, req.body.upload_id],
      (err, rows) => {
        if (err) {
          console.log('update err upload data');
        } else {
          res.send('완료');
        }
      },
    );
  });

  router.put('/delete', (req, res) => {
    // 업로드한거 삭제
    connection.query('delete from heart_data where upload_id=?', [req.body.upload_id]);
    connection.query('delete from reply_data where upload_id=?', [req.body.upload_id]);
    connection.query('delete from comment_data where upload_id = ?', [req.body.upload_id]);
    connection.query('delete from upload_data where id = ?', [req.body.upload_id], (err, rows) => {
      if (err) {
        console.log('err delete upload data');
      } else {
        console.log('삭제 완료');
        res.send('삭제완료');
      }
    });
  });

  return router;
};
