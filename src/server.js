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

app.post('/view', (req, res) => {
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

// upload view 수정 로직

app.put('/upload/update', (req, res) => {
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

// upload view 삭제 로직

app.put('/upload/delete', (req, res) => {
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

// 좋아요 로직

app.post('/heart', (req, res) => {
  if (req.body.isHeart === false) {
    connection.query(
      'insert into heart_data(username, upload_id, heart_check) values(?,?,?)',
      [req.body.username, req.body.upload_id, 'yes'],
      (err, rows) => {
        if (err) {
          console.log('err add heart');
        } else {
          connection.query(
            `update upload_data set heart = ${Number(req.body.heartLength) + 1} where id = ${req.body.upload_id}`,
            (err, rows) => {
              if (err) {
                console.log('err add heart update');
              } else {
                connection.query(`select heart from upload_data where id = ${req.body.upload_id}`, (err, rows) => {
                  if (err) {
                    console.log('err select heart');
                  } else {
                    const heart = rows[0].heart;
                    res.send({ heart: heart, isHeart: true, heartColor: true });
                  }
                });
              }
            },
          );
        }
      },
    );
  } else if (req.body.isHeart === true) {
    connection.query(
      `delete from heart_data where upload_id=? and username=?`,
      [req.body.upload_id, req.body.username],
      (err, rows) => {
        if (err) {
          console.log('err delete heart');
        } else {
          connection.query(
            `update upload_data set heart = ${Number(req.body.heartLength) - 1} where id = ${req.body.upload_id}`,
            (err, rows) => {
              if (err) {
                console.log('err minus heart update');
              } else {
                connection.query(`select heart from upload_data where id = ${req.body.upload_id}`, (err, rows) => {
                  if (err) {
                    console.log('err select heart');
                  } else {
                    const heart = rows[0].heart;
                    res.send({ heart: heart, isHeart: false, heartColor: false });
                  }
                });
              }
            },
          );
        }
      },
    );
  }
});

// 좋아요 유지 로직

app.post('/heartColor', (req, res) => {
  connection.query(
    'select * from heart_data where username=? and upload_id=?',
    [req.body.username, req.body.upload_id],
    (err, rows) => {
      if (err) {
        console.log('err heart color');
      } else {
        if (rows[0]) {
          res.send({ heartColor: true });
        } else {
          res.send({ heartColor: false });
        }
      }
    },
  );
});

app.post('/heartCheck', (req, res) => {
  connection.query('select heart from upload_data where id = ?', [req.body.upload_id], (err, rows) => {
    if (err) {
      console.log('err check heart');
    } else {
      const heart = rows[0].heart;
      connection.query(
        `delete from heart_data where upload_id=? and username=?`,
        [req.body.upload_id, req.body.username],
        (err, rows) => {
          if (err) {
            console.log('err delete heart');
          } else {
            connection.query(
              `update upload_data set heart = ${Number(heart) - 1} where id = ${req.body.upload_id}`,
              (err, rows) => {
                if (err) {
                  console.log('err minus heart update');
                } else {
                  connection.query(`select heart from upload_data where id = ${req.body.upload_id}`, (err, rows) => {
                    if (err) {
                      console.log('err select heart');
                    } else {
                      const heart = rows[0].heart;
                      res.send({ heart: heart, isHeart: false, heartColor: false });
                    }
                  });
                }
              },
            );
          }
        },
      );
    }
  });
});

//
//

// 댓글 로직

app.post('/comment', (req, res) => {
  // 댓글 db에 추가
  connection.query(
    'INSERT INTO comment_data(comment, username, upload_id, date) values(?,?,?, NOW())',
    [req.body.userText, req.body.username, req.body.upload_id],
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

/*
app.post('/comment/keep', (req, res) => {
  // 댓글 유지 및 모든 댓글 가져오기
  connection.query('select * from comment_data where upload_id=?', [req.body.upload_id], (err, rows) => {
    if (err) {
      console.log('err all comment');
    } else {
      const comment = rows.map((data) => {
        return { ...data, reply: [] };
      });
      res.send(comment);
    }
  });
});
*/

app.post('/comment/length', (req, res) => {
  // 댓글 개수 불러오기
  connection.query('select comment from upload_data where id = ?', [req.body.upload_id], (err, rows) => {
    if (err) {
      console.log('err select comment length');
    } else {
      res.send({ comment: rows[0].comment });
    }
  });
});

app.post('/comment/addlength', (req, res) => {
  // 댓글 개수 불러오기
  connection.query('select comment from upload_data where id = ?', [req.body.upload_id], (err, rows) => {
    if (err) {
      console.log('err select comment length');
    } else {
      res.send({ comment: rows[0].comment });
    }
  });
});

app.put('/comment/edit', (req, res) => {
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

app.put('/comment/delete', (req, res) => {
  connection.query('update upload_data set comment=? where id=?', [req.body.comment_length - 1, req.body.upload_id]);
  connection.query(
    'delete from comment_data where upload_id=? and id=?',
    [req.body.upload_id, req.body.comment_id],
    (err, rows) => {
      if (err) {
        console.log('delete comment err');
      } else {
        console.log('댓글 삭제 완료');
        connection.query('select * from comment_data where upload_id=?', [req.body.upload_id], (err, rows) => {
          if (err) {
            console.log('댓글 삭제 후 댓글 목록 불러오기 실패');
          } else {
            res.send(rows);
          }
        });
      }
    },
  );
});

// reply 로직

app.post('/reply/add', (req, res) => {
  connection.query(
    'insert into reply_data(reply, username, upload_id, comment_id, date) values(?,?,?,?,NOW())',
    [req.body.reply, req.body.username, req.body.upload_id, req.body.comment_id],
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

app.post('/reply/addlength', (req, res) => {
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

app.post('/reply/keep', (req, res) => {
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

app.post('/reply/edit', (req, res) => {
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

app.post('/reply/delete', (req, res) => {
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
