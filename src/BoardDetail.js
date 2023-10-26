import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {saveLoginInfo, loadUserInfo, logOut} from './Common';
const BoardDetail = ({route, navigation}) => {
  const [board, setBoard] = useState(null);
  const [id, setId] = useState('');
  const [boardMid, setBoardMid] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [major, setMajor] = useState('');
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수 저장
  const boardId = route.params.boardId; // 게시글 id
  const [trigger, setTrigger] = useState(false); //좋아요의 변경 여부 확인
  const [comment, setComment] = useState(''); // 댓글 생성시 댓글 내용을 저장하기 위한 useState 추가
  const [comments, setComments] = useState([]); //댓글 조회에 사용됨
  useEffect(() => {
    //조회수 증가 불러오기
    fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardHitsUpdate/${boardId}`);
  }, [boardId]);
  useEffect(() => {
    //상세보기 불러오기
    fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardDetail/${boardId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setBoard(data.board);
          setLikeCount(data.likes);

          console.log('게시글 좋아요 갯수(BoardDetail) : ', likeCount);
        } else {
          console.log('서버에서 성공 상태를 받지 못함(BoardDetail):', data); // 서버 오류 처리
        }
      })
      .catch(error => {
        console.error('데이터를 가져오는 데 오류가 발생했습니다:', error); // 그 외 오류 처리
      });
    // 댓글 조회
    fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/CommentList/${boardId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setComments(data.comments);
        } else {
          // console.error('댓글을 불러오는데 실패했습니다:', data.error);
        }
      })
      .catch(error => {
        console.error('댓글을 불러오는 도중 오류가 발생했습니다:', error);
      });
  }, [boardId, trigger]);
  useEffect(() => {
    //좋아요 변화시 board 데이터 새로고침
    fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardDetailUpdate/${boardId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setBoard(data.board);
          setLikeCount(data.likes);
          console.log('게시글 좋아요 갯수(BoardDetailUpdate) : ', likeCount);
        } else {
          console.log(
            '서버에서 성공 상태를 받지 못함(BoardDetailUpdate):',
            data,
          ); // 서버 오류 처리
        }
      })
      .catch(error => {
        console.error(
          '데이터를 가져오는 데 오류가 발생했습니다(BoardDetailUpdate):',
          error,
        ); // 그 외 오류 처리
      });
  }, [trigger]); //likeTrigger의 값이 변화하였으때 실행됨

  useEffect(() => {
    //userinfo 불러오기
    const fetchData = async () => {
      const savedData = await loadUserInfo(); //Common폴더에 있는 userinfo

      if (savedData) {
        setId(savedData.id);
        setNickname(savedData.nickname);
        setName(savedData.name);
        setIsAdmin(savedData.isAdmin);
        setIsLoggedIn(true); // 저장된 로그인 데이터가 있으면 로그인 상태로 설정
        setMajor(savedData.major);
        console.log('로그인 성공시 서버로부터의 응답 :', savedData);
      }
    };

    fetchData();
  }, []);

  const handleLike = async () => {
    //좋아요 추가 프로세스
    const userInfo = await loadUserInfo(); //userInfo 불러오기
    const memberId = userInfo?.id;

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
        memberId: memberId,
        boardId: boardId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('서버 응답:', data);
        if (data.success) {
          console.log('게시글 좋아요 갯수(LikePlus) : ', data.likes);
          setLikeCount(data.likes); // 서버에서 반환된 좋아요 갯수로 업데이트
          setTrigger(prev => !prev); //좋아요 값이 변화한다는걸 알림
        }
      })
      .catch(error => {
        console.error('좋아요 처리 중 오류 발생(LikePlus):', error);
      });
  };

  const onEditClick = () => {
    //게시글 수정하기 이동
    if (board) {
      navigation.navigate('BoardEdit', {
        board_mid: boardId,
        board_title: board.board_title,
        board_content: board.board_content,
        board_category: board.board_category,
        id: id,
        setTrigger: setTrigger,
      });
    }
  };
  const handleDelete = async () => {
    //게시글 삭제
    try {
      const response = await fetch(
        `https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/${boardId}`,
        {
          method: 'DELETE', // DELETE 메서드 사용
        },
      );
      const data = await response.json();
      if (data.success) {
        console.log('게시글 삭제 성공');
        navigation.navigate('Login'); // 현재 화면에서 로그인으로 이동
      } else {
        console.error('게시글 삭제 실패:', data.error);
      }
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    console.log('게시글 좋아요 갯수(게시글 출력시) : ', likeCount);
  }, [likeCount]);

  // 댓글 저장 함수
  const handleComment = () => {
    fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/CommentAdd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        board_id: boardId,
        comment_content: comment,
        comment_mid: id, // 예시로 id를 사용자 아이디로 설정
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('댓글 등록 성공(게시글)');
          setComment(''); // 댓글 등록 후 입력 필드 초기화
          setComments(data.comments);
          setTrigger(prev => !prev); //댓글 값이 변화한다는걸 알림
        } else {
          console.error('댓글 등록 실패(게시글):', data.error);
        }
      })
      .catch(error => {
        console.error('댓글 등록 중 오류 발생(게시글):', error);
        console.log(boardId);
        console.log(id);
        console.log(comment);
      });
  };
  const onCommentClick = (commentId, comment_mid, comment_content) => {
    //댓글 클릭시
    if (comment_mid == id) {
      //댓글 수정
      navigation.navigate('CommentEdit', {
        comment_id: commentId,
        comment_mid: comment_mid,
        comment_content: comment_content,
        setTrigger: setTrigger,
      });
    } else {
      //답글
      // navigation.navigate('ReplyAdd', {
      //   comment_id: commentId,
      //   comment_mid: comment_mid,
      //   comment_content: comment_content,
      //   setTrigger: setTrigger,
      // });
    }
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
      {board.board_mid === id && (
        <>
          <Button title="수정하기" onPress={() => onEditClick(boardId)} />
          <Button title="삭제하기" onPress={handleDelete} />
        </>
      )}
      <TextInput
        style={{borderWidth: 1, borderColor: 'grey', padding: 10, margin: 10}}
        value={comment}
        onChangeText={setComment}
        placeholder="댓글을 입력하세요..."
      />
      <Button title="댓글 등록" onPress={handleComment} />
      <Text>댓글 목록:</Text>
      <FlatList
        data={comments}
        keyExtractor={item =>
          item.comment_id ? item.comment_id.toString() : 'default'
        }
        renderItem={({item}) =>
          item.comment_id ? (
            <TouchableOpacity
              onPress={() =>
                onCommentClick(
                  item.comment_id,
                  item.comment_mid,
                  item.comment_content,
                )
              }>
              <Text>
                {'['}
                {item.comment_mid}
                {']'} : {item.comment_content}{' '}
                {item.comment_mid === id ? '[댓글 수정]' : '[답글]'}
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

export default BoardDetail;
