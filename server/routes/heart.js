const router = require('express').Router();

module.exports = (connection) => {
  router.post('/add', (req, res) => {
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

  router.post('/color', (req, res) => {
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

  router.post('/check', (req, res) => {
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
  return router;
};
