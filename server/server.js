const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MemberDTO = require('./MemberDTO');
const MemberDAO = require('./MemberDAO');
const BoardDAO = require('./BoardDAO');
const BoardDTO = require('./BoardDTO');
const db = require('./dbConnection'); // DB 연결 모듈 가져오기

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
  }),
);

app.post('/login', MemberDAO.login);

app.post('/logout', (req, res) => {
  req.session.destroy(); // 세션 파기
  res.json({success: true});
});

app.post('/CreateBoard', BoardDAO.CreateBoard);

app.get('/getAllBoards', (req, res) => {
  BoardDAO.getAllBoards((error, boards) => {
    if (error) {
      console.error(error);
      res.status(500).json({success: false});
      return;
    }

    res.json({success: true, boards});
  });
});

app.get('/getSession', MemberDAO.getSessionInfo);

// ... 기타 라우터 및 코드 ...

app.listen(3000, () => console.log('Server is running on port 3000'));
