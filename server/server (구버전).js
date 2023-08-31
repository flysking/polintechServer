const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session'); // express-session 가져오기
const app = express();
//npm install express body-parser mysql 모듈 설치
//npm install express-session
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'polintech',
});

db.connect(error => {
  if (error) {
    console.error('데이터베이스 연결 실패:', error.stack);
    return;
  }
  console.log('데이터베이스에 연결되었습니다.');
});

app.post('/login', (req, res) => {
  const {id, pw} = req.body;

  const query =
    'SELECT * FROM polintech.member WHERE member_id = ? AND member_pw = ?'; //로그인 기능
  db.query(query, [id, pw], (error, results) => {
    console.log(results); // 여기에 결과를 출력합니다.
    if (error) {
      console.error(error);
      res.status(500).json({success: false});
    } else {
      if (results.length > 0) {
        res.json({success: true});
      } else {
        res.json({success: false});
      }
    }
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));

// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const cors = require('cors');
// app.use(cors());
// app.use(express.json());
// const db = mysql.createConnection({
//   user: 'root',
//   host: 'localhost',
//   pw: '1234',
//   database: 'community',
// });
// app.listen(3001, () => {
//   console.log('Your server is running on port 3001');
// });
