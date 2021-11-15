const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const path = require('path');
const multer = require('multer');
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

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, 'uploads/'),
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname);
    },
  }),
});

connection.connect();

app.use('/image', express.static(path.join(__dirname, 'uploads'))); // localhost:5000/민트라떼.png로 접속하면 uploads폴더에 있는 민트라떼 이미지를 제공함
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

//
app.post('/upload/image', upload.single('image'), (req, res) => {
  const image = `image/${req.file.filename}`; // filename으로 업로드 폴더에 저장해놨으니 파일 네임을 보내줘야 한다!!!!!!!!!!
  res.send(image);
});

// upload_data notice-main-news > home page

app.post('/upload/notice', (req, res) => {
  connection.query(
    'select * from upload_data where category = ? order by id desc limit 20',
    ['공지사항'],
    (err, rows) => {
      if (err) {
        console.log('err main news select');
      } else {
        const mainNews = rows.splice(req.body.controll, 5);
        res.send(mainNews);
      }
    },
  );
});

// upload_data video > home page

app.get('/upload/video', (req, res) => {
  connection.query(
    'select * from upload_data where category=? order by id desc limit 6',
    ['영상콘텐츠'],
    (err, rows) => {
      if (err) {
        console.log('video err select');
      } else {
        res.send(rows);
      }
    },
  );
});

// upload 로직

app.post('/upload', (req, res) => {
  // const newText = req.body.text.replace(/<(\/p|p)([^>]*)>/gi, ''); // p태그만 제거
  //const img = req.body.text.match(/<img.*?src="(.*?)"[^\>]+>/g)[0]; // 이미지 태그만 가져오기

  /*
  let removeTagText = req.body.text.replace(/(<([^>]+)>)/gi, ''); // 모든 태그 제거
  let removeTagSpaceText = removeTagText.replace(/&nbsp;/gi, ''); // 모든 태그 제거한 다음 공백까지 제거함
  let img;
  let video;

  req.body.text.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
    img = capture;
  }); // img태그에서 src만 추출
  req.body.text.replace(/<iframe [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
    video = capture;
  }); // iframe태그에서 src만 추출
  */

  let data = [req.body.category, req.body.title, req.body.username, req.body.text];

  console.log(req.body.text, req.body);

  connection.query(
    'INSERT INTO upload_data(category, title, username, text, date) values(?, ?, ?, ?, NOW())',
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

app.post('/list', (req, res) => {
  const ctg = () => {
    if (req.body.ctg === 'notice' || req.body.category_data === '공지사항') {
      return '공지사항';
    } else if (req.body.ctg === 'free' || req.body.category_data === '자유게시판') {
      return '자유게시판';
    } else if (req.body.ctg === 'recommend' || req.body.category_data === '추천게시판') {
      return '추천게시판';
    } else if (req.body.ctg === 'video' || req.body.category_data === '영상콘텐츠') {
      return '영상콘텐츠';
    }
  };
  if (req.body.heart_click) {
    connection.query(
      'select U.*, H.username as heart_username from upload_data U inner join heart_data H on U.id = H.upload_id order by date desc',
      (err, rows) => {
        if (err) {
          console.log('err 좋아요 한 글 불러오기');
        } else {
          const uploadData = rows.filter((data) => {
            return data.heart_username === req.body.username;
          });
          res.send(uploadData);
          return;
        }
      },
    );
  } else if (req.body.comment_click) {
    connection.query(
      'select U.*, C.username as comment_username, R.username as reply_username, C.upload_id as comment_upload_id, R.upload_id as reply_upload_id  from upload_data U  inner join comment_data C on U.id = C.upload_id inner join reply_data R on U.id = R.upload_id order by date desc',
      (err, rows) => {
        if (err) {
          console.log('err 댓글 단 글 가져오기 에러');
        } else {
          const uploadData = rows.filter((data) => {
            return req.body.username === data.reply_username || req.body.username === data.comment_username;
          });

          const uploadData2 = uploadData.filter((data, i, arr) => {
            // 중복된 id 제거해줌
            return arr.findIndex((e) => e.id === data.id) === i;
          });

          res.send(uploadData2);
          return;
        }
      },
    );
  } else if (req.body.ctg === 'profile' || req.body.write_click === true) {
    connection.query(
      'select * from upload_data where username=? order by date desc',
      [req.body.username],
      (err, rows) => {
        if (err) {
          console.log('err 프로필에서 내가 작성한 모든 게시판 가져오기');
        } else {
          res.send(rows);
        }
      },
    );
  } else {
    connection.query('select * from upload_data where category = ? order by id desc', [ctg()], (err, rows) => {
      if (err) {
        console.log('err');
      } else {
        res.send(rows);
      }
    });
  }
});

app.post('/profile/info', (req, res) => {
  connection.query('select name, gender, profile_img from auth where username=?', [req.body.username], (err, rows) => {
    if (err) {
      console.log('err 유저 info 불러오기');
    } else {
      res.send({ info: rows[0] });
    }
  });
});

app.post('/profile/img', upload.single('imgFile'), (req, res) => {
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

app.post('/profile/length', (req, res) => {
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

app.post('/get/img', (req, res) => {
  connection.query('select profile_img from auth where username=?', [req.body.username], (err, rows) => {
    if (err) {
      console.log('프로필 이미지 가져오기 에러 발생 탑어스 컴포넌트');
    } else {
      res.send(rows[0]);
    }
  });
});

app.post('/view', (req, res) => {
  connection.query('select * from upload_data', (err, rows) => {
    if (err) {
      console.log('err viewboard');
    } else {
      const id = rows.filter((data) => {
        // 업로드 데이터의 id가 upload_id
        return data.id === Number(req.body.upload_id);
      });

      const ctg = id[0].category;
      /*const sendId = id[0];*/

      connection.query('select * from upload_data where category = ? order by id desc', [ctg], (err, rows) => {
        const sid = rows.filter((data) => {
          // 업로드 데이터의 id가 upload_id
          return data.id === Number(req.body.upload_id);
        });
        const sendId = sid[0];

        const order = req.body.order;

        if (err) {
          console.log('err ctg and upload_data');
        } else {
          if (sendId.username === req.body.username) {
            res.send([{ ...sendId, checkUser: true }, order]);
          } else {
            res.send([{ ...sendId, checkUser: false }, order]);
          }
        }
      });
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
  connection.query('select * from reply_data where comment_id=?', [req.body.comment_id], (err, rows) => {
    if (err) {
      console.log('err comment reply');
    } else {
      const commentReplyLength = rows.length;
      connection.query('update upload_data set comment=? where id=?', [
        req.body.comment_length - 1 - commentReplyLength,
        req.body.upload_id,
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
                        res.send(comment);
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

/*
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
*/

// 조회수 증가 로직

app.post('/increase/views', (req, res) => {
  connection.query('select * from upload_data where id = ?', [req.body.upload_id], (err, rows) => {
    if (err) {
      console.log('err upload select increase');
    } else {
      const views = rows[0].views;
      connection.query('update upload_data set views = ? where id = ?', [
        Number(views) + Number(1),
        req.body.upload_id,
      ]);
    }
  });
});

//

app.listen(port, () => {
  console.log(`서버 ${port}가 열렸습니다.`);
});
