const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const MysqlStore = require('express-mysql-session')(session);
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const sessionStore = new MysqlStore(options);

const connection = mysql.createConnection(options);

connection.connect();

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, 'uploads/'),
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname);
    },
  }),
});

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

// 보드 리스트, 보드 뷰
const board = require(path.join(__dirname, 'routes/board.js'))(connection);
app.use('/board', board);

// 로그인, 로그아웃, 로그인 유지
const user = require(path.join(__dirname, 'routes/user.js'))(connection);
app.use('/user', user);

// 회원가입, 회원가입 후 로그인 한 유저네임
const auth = require(path.join(__dirname, 'routes/auth.js'))(connection);
app.use('/auth', auth);

// 업로드 폼 추가, 수정, 삭제, 이미지 업로드
const upload = require(path.join(__dirname, 'routes/upload.js'))(connection, fileUpload);
app.use('/upload', upload);

// 프로필 작성글, 댓글 단 글, 좋아요 글, 프로필 유저 정보, 유지, 갯수
const profile = require(path.join(__dirname, 'routes/profile.js'))(connection, fileUpload);
app.use('/profile', profile);

// 하트, 유지, 갯수 증가
const heart = require(path.join(__dirname, 'routes/heart.js'))(connection);
app.use('/heart', heart);

// 댓글 관련
const comment = require(path.join(__dirname, 'routes/comment.js'))(connection);
app.use('/comment', comment);

// 답글 관련
const reply = require(path.join(__dirname, 'routes/reply.js'))(connection);
app.use('/reply', reply);

// 조회수 증가
app.post('/increase/views', (req, res) => {
  connection.query('select * from upload_data where id = ?', [req.body.upload_id], (err, rows) => {
    if (err) {
      console.log('err upload select increase');
    } else {
      const views = rows[0].views;
      connection.query(
        'update upload_data set views = ? where id = ?',
        [Number(views) + Number(1), req.body.upload_id],
        (err) => {
          if (err) {
            console.log('err 조회수 증가');
          } else {
            res.send('조회수 증가 완료');
          }
        },
      );
    }
  });
});

//

app.listen(port, () => {
  console.log(`서버 ${port}가 열렸습니다.`);
});
