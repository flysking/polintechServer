const db = require('./dbConnection');
const MemberDTO = require('./MemberDTO');

const getMemberByIdAndPassword = (id, pw, req, callback) => {
  //로그인
  const query =
    'SELECT * FROM polintech.member WHERE member_id = ? AND member_pw = ?';

  db.query(query, [id, pw], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (results.length > 0) {
      const memberDTO = new MemberDTO(results[0]);
      console.log('쿼리 결과:', results[0]); // 쿼리 결과 로그 출력
      callback(null, memberDTO); // 에러가 없고, DTO 객체 반환
    } else {
      callback(null, null); // 에러가 없고, 결과가 없음
    }
  });
};
const login = (req, res) => {
  const {id, pw} = req.body;

  getMemberByIdAndPassword(id, pw, req, (error, memberDTO) => {
    if (error) {
      console.error(error);
      res.status(500).json({success: false});
      return;
    }

    if (memberDTO) {
      console.log('DTO 데이터:', memberDTO);
      setSession(req, memberDTO); // 세션 설정
      printSessionInfo(req); // 세션 정보 출력
      res.json({
        success: true,
        member: {
          id: memberDTO.member_id,
          nickname: memberDTO.member_nickname,
          name: memberDTO.member_name,
          engname: memberDTO.member_engname,
          email: memberDTO.member_email,
          major: memberDTO.member_major,
          umber: memberDTO.member_number,
          isAdmin: memberDTO.member_isadmin,
        },
      });
    } else {
      res.json({success: false});
    }
  });
};
const setSession = (req, memberDTO) => {
  //세션 저장 함수
  req.session.memberInfo = {
    member_id: memberDTO.member_id,
    member_name: memberDTO.member_name,
    member_nickname: memberDTO.member_nickname,
    member_engname: memberDTO.member_engname,
    member_email: memberDTO.member_email,
    member_major: memberDTO.member_major,
    member_number: memberDTO.member_number,
    member_isadmin: memberDTO.member_isadmin,
    // 필요하다면 다른 필드들도 추가 가능
  };
};
const printSessionInfo = req => {
  const sessionData = req.session.memberInfo;
  //세션 정보 출력
  if (sessionData) {
    console.log('현재 세션 정보:', sessionData);
  } else {
    console.log('세션 정보가 없습니다.');
  }
};
const getSessionInfo = (req, res) => {
  //세션 출력
  const sessionData = req.session.memberInfo;
  if (sessionData) {
    res.json({
      success: true,
      member: sessionData,
    });
    console.log('getSession: ', sessionData);
  } else {
    res.json({
      success: false,
      message: '세션 정보가 없습니다.',
    });
  }
};
module.exports = {
  getMemberByIdAndPassword,
  setSession,
  printSessionInfo,
  login,
  getSessionInfo,
};
