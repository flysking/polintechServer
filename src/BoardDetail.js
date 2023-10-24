import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
//import {saveLoginInfo, loadUserInfo, logOut} from './Common';
const BoardDetail = ({route}) => {
  const [board, setBoard] = useState(null);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [major, setMajor] = useState('');
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수 저장
  const boardId = route.params.board_id; // 게시글 id

  useEffect(() => {
    fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardDetail/${boardId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setBoard(data.board);
          setLikeCount(data.likes);
        } else {
          console.log('서버에서 성공 상태를 받지 못함:', data); // 서버 오류 처리
        }
      })
      .catch(error => {
        console.error('데이터를 가져오는 데 오류가 발생했습니다:', error); // 그 외 오류 처리
      });
  }, [boardId]);

  const handleLike = async () => {
    const userInfo = await loadUserInfo();
    const memberId = userInfo?.id; // 'member_id'에서 'id'로 변경하였습니다.

    if (!memberId) {
      console.error('memberId를 불러오지 못함');
      return;
    }

    fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/LikePlus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        memberId: memberId, // memberId 전송
        boardId: boardId, // boardId도 함께 전송
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setLikeCount(prev => (data.isLiked ? prev + 1 : prev - 1));
        }
      })
      .catch(error => {
        console.error('좋아요 처리 중 오류 발생:', error);
      });
  };
  if (!board) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>게시글 제목 : {board.board_title}</Text>
      <Text>게시글 내용 : {board.board_content}</Text>
      <Text>게시글 작성자 : {board.board_mid}</Text>
      <Text>게시글 조회수 : {board.board_hits}</Text>
      <Text>게시글 카테고리 : {board.board_category}</Text>
      <Text>게시글 작성일 : {board.board_postdate}</Text>
      <Text>좋아요 수: {likeCount}</Text>
      <Button title="좋아요" onPress={handleLike} />
    </View>
  );
};

export default BoardDetail;
