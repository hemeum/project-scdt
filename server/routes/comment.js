const router = require('express').Router();

module.exports = (connection) => {
  router.post('/add', (req, res) => {
    // 댓글 db에 추가
    connection.query(
      'INSERT INTO comment_data(comment, username, upload_id, date, profile_img) values(?,?,?, NOW(),?)',
      [req.body.userText, req.body.username, req.body.upload_id, req.body.profileImg],
      (err, rows) => {
        if (err) {
          console.log('err comment add');
        } else {
          connection.query(
            'update upload_data set comment = ? where id = ?',
            [req.body.comment_length + 1, req.body.upload_id],
            (err, rows) => {
              if (err) {
                console.log('err update comment');
              } else {
                console.log('커멘트 + 1 성공');
              }
            },
          );
          connection.query(
            'select * from comment_data where upload_id=? and username=? order by date desc limit 1',
            [req.body.upload_id, req.body.username],
            (err, rows) => {
              if (err) {
                console.log('err select comment');
              } else {
                console.log('커멘트 가져오기 성공');
                const comment = { ...rows[0], reply: [] };
                res.send([comment]);
              }
            },
          );
        }
      },
    );
  });

  router.post('/length', (req, res) => {
    // 댓글 개수 불러오기
    connection.query('select comment from upload_data where id = ?', [req.body.upload_id], (err, rows) => {
      if (err) {
        console.log('err select comment length');
      } else {
        res.send({ comment: rows[0].comment });
      }
    });
  });

  router.post('/addlength', (req, res) => {
    // 댓글 개수 불러오기
    connection.query('select comment from upload_data where id = ?', [req.body.upload_id], (err, rows) => {
      if (err) {
        console.log('err select comment length');
      } else {
        res.send({ comment: rows[0].comment });
      }
    });
  });

  router.put('/edit', (req, res) => {
    // 댓글 수정하기
    connection.query(
      'update comment_data set comment = ?, date=NOW() where upload_id=? and id=?',
      [req.body.newText, req.body.upload_id, req.body.comment_id],
      (err, rows) => {
        if (err) {
          console.log('err updata comment');
        } else {
          connection.query(
            'select * from comment_data where upload_id=? and id=?',
            [req.body.upload_id, req.body.comment_id],
            (err, rows) => {
              if (err) {
                console.log('수정한 커멘트 불러오기 실패');
              } else {
                res.send(rows[0]);
              }
            },
          );
        }
      },
    );
  });

  router.put('/delete', (req, res) => {
    connection.query('select * from reply_data where comment_id=?', [req.body.comment_id], (err, rows) => {
      if (err) {
        console.log('err comment reply');
      } else {
        const commentReplyLength = rows.length;
        connection.query('update upload_data set comment=? where id=?', [
          req.body.comment_length - 1 - commentReplyLength,
          req.body.upload_id,
        ]);
        connection.query('delete from reply_data where upload_id=? and comment_id=?', [
          req.body.upload_id,
          req.body.comment_id,
        ]);
        connection.query(
          'delete from comment_data where upload_id=? and id=?',
          [req.body.upload_id, req.body.comment_id],
          (err, rows) => {
            if (err) {
              console.log('delete comment err');
            } else {
              console.log('댓글 삭제 완료');
              connection.query('select * from reply_data where upload_id=?', [req.body.upload_id], (err, rows) => {
                // 댓글과 답글 합쳐서 불러오는 로직(이걸 반복해서 넣으면 됌.)
                if (err) {
                  console.log('err reply keep');
                } else {
                  const allReply = rows;
                  if (allReply.length !== 0) {
                    connection.query(
                      'select * from comment_data where upload_id=?',
                      [req.body.upload_id],
                      (err, rows) => {
                        if (err) {
                          console.log('err keep comment and reply');
                        } else {
                          const comment = rows.map((data) => {
                            const replyComment = allReply.filter((replyData) => {
                              return data.id === Number(replyData.comment_id);
                            });
                            return { ...data, reply: replyComment };
                          });
                          res.send([comment, rows.length + allReply.length]);
                        }
                      },
                    );
                  } else {
                    connection.query(
                      'select * from comment_data where upload_id=?',
                      [req.body.upload_id],
                      (err, rows) => {
                        if (err) {
                          console.log('err keep comment and reply');
                        } else {
                          const comment = rows.map((data) => {
                            return { ...data, reply: [] };
                          });
                          res.send([comment]);
                        }
                      },
                    );
                  }
                }
              });
            }
          },
        );
      }
    });
  });

  return router;
};
