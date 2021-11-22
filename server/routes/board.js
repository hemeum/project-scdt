const router = require('express').Router();

module.exports = (connection) => {
  router.post('/list', (req, res) => {
    const ctg = () => {
      // 카테고리 구분
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
      // 프로필페이지에서 좋아요 한 글 클릭하면
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
      // 프로필페이지에서 댓글 단 글 클릭하면
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
      // 프로필 페이지로 넘어오면 작성한 글 먼저 보여주기 and 작성한 글 클릭하면
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
      // gnb menu에서 공지사항, 자유게시판, 영상콘텐츠, 추천게시판 등 클릭하면 해당 카테고리 별 board list 보여주기
      connection.query('select * from upload_data where category = ? order by id desc', [ctg()], (err, rows) => {
        if (err) {
          console.log('err');
        } else {
          res.send(rows);
        }
      });
    }
  });

  router.post('/view', (req, res) => {
    // board view 보여주기
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

  router.post('/main_news', (req, res) => {
    // 메인 페이지 주요소식 부분 보여주기
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

  router.get('/video_contents', (req, res) => {
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
  return router;
};
