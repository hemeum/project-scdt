const router = require('express').Router();

module.exports = (connection) => {
  router.post('/add', (req, res) => {
    connection.query(
      'insert into reply_data(reply, username, upload_id, comment_id, date, profile_img) values(?,?,?,?,NOW(),?)',
      [req.body.reply, req.body.username, req.body.upload_id, req.body.comment_id, req.body.profileImg],
      (err, rows) => {
        if (err) {
          console.log('err add reply');
        } else {
          connection.query(
            'select * from reply_data where upload_id = ? and comment_id=?',
            [req.body.upload_id, req.body.comment_id],
            (err, rows) => {
              if (err) {
                console.log('err selete reply');
              } else {
                const addReply = rows;
                connection.query('select * from comment_data', (err, rows) => {
                  if (err) {
                    console.log('err select comment + reply');
                  } else {
                    const replyComment = rows.filter((data) => {
                      return data.id === Number(addReply[0].comment_id);
                    })[0];
                    const newReplyComment = { ...replyComment, reply: addReply };
                    res.send(newReplyComment);
                  }
                });
              }
            },
          );
        }
      },
    );
  });

  router.post('/addlength', (req, res) => {
    connection.query(
      'update upload_data set comment=? where id=?',
      [Number(req.body.comment_length) + 1, req.body.upload_id],
      (err, rows) => {
        if (err) {
          console.log('err update length');
        } else {
          connection.query('select comment from upload_data where id = ?', [req.body.upload_id], (err, rows) => {
            if (err) {
              console.log('err reply + comment length');
            } else {
              res.send({ comment: rows[0].comment });
            }
          });
        }
      },
    );
  });

  router.post('/keep', (req, res) => {
    // 댓글, 답글 유지
    connection.query('select * from reply_data where upload_id=?', [req.body.upload_id], (err, rows) => {
      if (err) {
        console.log('err reply keep');
      } else {
        const allReply = rows;
        if (allReply.length !== 0) {
          connection.query('select * from comment_data where upload_id=?', [req.body.upload_id], (err, rows) => {
            if (err) {
              console.log('err keep comment and reply');
            } else {
              const comment = rows.map((data) => {
                const replyComment = allReply.filter((replyData) => {
                  return data.id === Number(replyData.comment_id);
                });
                return { ...data, reply: replyComment };
              });
              res.send(comment);
            }
          });
        } else {
          connection.query('select * from comment_data where upload_id=?', [req.body.upload_id], (err, rows) => {
            if (err) {
              console.log('err keep comment and reply');
            } else {
              const comment = rows.map((data) => {
                return { ...data, reply: [] };
              });
              res.send(comment);
            }
          });
        }
      }
    });
  });

  router.post('/edit', (req, res) => {
    connection.query(
      'update reply_data set reply = ?, date=NOW() where upload_id=? and id=?',
      [req.body.newReply, req.body.upload_id, req.body.reply_id],
      (err, rows) => {
        if (err) {
          console.log('err updata comment');
        } else {
          connection.query('select * from reply_data where upload_id=?', [req.body.upload_id], (err, rows) => {
            if (err) {
              console.log('err reply keep');
            } else {
              const allReply = rows;
              if (allReply.length !== 0) {
                connection.query('select * from comment_data where upload_id=?', [req.body.upload_id], (err, rows) => {
                  if (err) {
                    console.log('err keep comment and reply');
                  } else {
                    const comment = rows.map((data) => {
                      const replyComment = allReply.filter((replyData) => {
                        return data.id === Number(replyData.comment_id);
                      });
                      return { ...data, reply: replyComment };
                    });
                    res.send(comment);
                  }
                });
              } else {
                connection.query('select * from comment_data where upload_id=?', [req.body.upload_id], (err, rows) => {
                  if (err) {
                    console.log('err keep comment and reply');
                  } else {
                    const comment = rows.map((data) => {
                      return { ...data, reply: [] };
                    });
                    res.send(comment);
                  }
                });
              }
            }
          });
        }
      },
    );
  });

  router.post('/delete', (req, res) => {
    connection.query('update upload_data set comment=? where id=?', [
      Number(req.body.comment_length) - 1,
      req.body.upload_id,
    ]);
    connection.query(
      'delete from reply_data where upload_id=? and id=?',
      [req.body.upload_id, req.body.reply_id],
      (err, rows) => {
        if (err) {
          console.log('delete comment err');
        } else {
          console.log('답글 삭제 완료');
          connection.query('select * from reply_data where upload_id=?', [req.body.upload_id], (err, rows) => {
            if (err) {
              console.log('err reply keep');
            } else {
              const allReply = rows;
              if (allReply.length !== 0) {
                connection.query('select * from comment_data where upload_id=?', [req.body.upload_id], (err, rows) => {
                  if (err) {
                    console.log('err keep comment and reply');
                  } else {
                    const comment = rows.map((data) => {
                      const replyComment = allReply.filter((replyData) => {
                        return data.id === Number(replyData.comment_id);
                      });
                      return { ...data, reply: replyComment };
                    });
                    connection.query('select * from upload_data where id=?', [req.body.upload_id], (err, rows) => {
                      if (err) {
                        console.log('err 답글 삭제한 커멘트 갯수 가져오기 실패..');
                      } else {
                        res.send([comment, rows[0].comment]);
                      }
                    });
                  }
                });
              } else {
                connection.query('select * from comment_data where upload_id=?', [req.body.upload_id], (err, rows) => {
                  if (err) {
                    console.log('err keep comment and reply');
                  } else {
                    const comment = rows.map((data) => {
                      return { ...data, reply: [] };
                    });
                    res.send([comment]);
                  }
                });
              }
            }
          });
        }
      },
    );
  });

  return router;
};
