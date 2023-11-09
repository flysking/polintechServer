import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {saveLoginInfo, loadUserInfoAll, logOut} from './Common';
const BoardDetail = ({route, navigation}) => {
  const apiUrl = 'https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app';
  const [board, setBoard] = useState(null);
  const [id, setId] = useState('');
  const [boardMid, setBoardMid] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [major, setMajor] = useState('');
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수 저장
  const boardId = route.params.boardId; // 게시글 id
  const [trigger, setTrigger] = useState(false); //좋아요의 변경 여부 확인
  const [comment, setComment] = useState(''); // 댓글 생성시 댓글 내용을 저장하기 위한 useState 추가
  const [comments, setComments] = useState([]); //댓글 조회에 사용됨
  const [replys, setReplys] = useState([]); // 답글 조회에 사용됨
  const [response, setResponse] = useState(null); //이미지 출력 테스트 변수
  const [isImage, setIsImage] = useState(false); //게시글에 이미지 존재 여부
  const [imageName, setImageName] = useState(''); //게시글에 이미지 이름
  
  //BoardDetail 최적화중
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // 1. 이미지 확인
  //       const imageResponse = await fetch(`${apiUrl}/ImageCheck/${boardId}`);
  //       const imageJson = await imageResponse.json();
  //       // Handle image data...
        
  //       // 2. 조회수 증가
  //       await fetch(`${apiUrl}/BoardHitsUpdate/${boardId}`);
        
  //       // 3. 상세보기 불러오기
  //       const boardResponse = await fetch(`${apiUrl}/BoardDetail/${boardId}`);
  //       const boardData = await boardResponse.json();
  //       // Handle board data...
  
  //       // 4. 댓글 조회
  //       const commentsResponse = await fetch(`${apiUrl}/CommentList/${boardId}`);
  //       const commentsData = await commentsResponse.json();
  //       // Handle comments...
  
  //       // 5. 답글 조회
  //       const replysResponse = await fetch(`${apiUrl}/ReplyList/${boardId}`);
  //       const replysData = await replysResponse.json();
  //       // Handle replys...
  //     } catch (error) {
  //       console.error('오류 발생:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, [boardId, isImage, trigger]);
  //BoardDetail 최적화

  const onSelectImage = () => {
    //이미지 출력 테스트 함수
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        // console.log(res);
        if (res.didCancel) {
          return;
        }
        setResponse(res);
      },
    );
  };

  useEffect(() => {
    //조회수 증가 불러오기
    fetch(`${apiUrl}/BoardHitsUpdate/${boardId}`);
  }, [boardId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 이미지 확인
        const imageResponse = await fetch(`${apiUrl}/ImageCheck/${boardId}`);
        if (!imageResponse.ok) {
          console.error('이미지 확인 요청 에러:', imageResponse.status);
        } else {
          // console.log('이미지 확인');
          const imageData = await imageResponse.json();
          // console.log(imageData);
          // console.log('이미지 파일명', imageData.imageData.image_name);

          // console.log('이미지 파일명', imageName);
          if (imageData.imageData != null) {
            setIsImage(true);
            setImageName(imageData.imageData.image_name);
            console.log('이미지 여부(true) : ', isImage);
          } else {
            setIsImage(false);
            console.log('이미지 여부(false) : ', isImage);
          }

          // Handle image data...
        }
        console.log('게시글 정보불로오기 실행 ');
        // 2. 상세보기 불러오기
        const boardResponse = await fetch(`${apiUrl}/BoardDetail/${boardId}`);
        if (!boardResponse.ok) {
          console.error('상세보기 요청 에러:', boardResponse.status);
        } else {
          console.log('상세보기 요청 실행 완료 ');
          const boardData = await boardResponse.json();
          setBoard(boardData.board);
          setLikeCount(boardData.likes);
          console.log('게시글 정보 확인 :  ',boardData.board);
        }

        // 3. 댓글 조회
        const commentsResponse = await fetch(
          `${apiUrl}/CommentList/${boardId}`,
        );
        if (!commentsResponse.ok) {
          console.error('댓글 조회 요청 에러:', commentsResponse.status);
        } else {
          const commentsData = await commentsResponse.json();
          setComments(commentsData.comments);
          // console.log(comments);
          // Handle comments...
        }

        // 4. 답글 조회
        const replysResponse = await fetch(`${apiUrl}/ReplyList/${boardId}`);
        if (!replysResponse.ok) {
          console.error('답글 조회 요청 에러:', replysResponse.status);
        } else {
          const replysData = await replysResponse.json();
          setReplys(replysData.replys);
          // console.log(replys);

          // Handle replys...
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    };

    fetchData();
  }, [boardId, isImage, trigger]); 

  useEffect(() => {
    //userinfo 불러오기
    const fetchData = async () => {
      const savedData = await loadUserInfoAll(); //Common폴더에 있는 userinfo

      if (savedData) {
        setId(savedData.id);
        setNickname(savedData.nickname);
        setName(savedData.name);
        setIsAdmin(savedData.isadmin);
        setIsLoggedIn(true); // 저장된 로그인 데이터가 있으면 로그인 상태로 설정
        setMajor(savedData.major);
        // console.log('로그인 성공시 서버로부터의 응답 :', savedData);
      }
    };

    fetchData();
  }, []);

  const handleLike = async () => {
    //좋아요 추가 프로세스
    const userInfo = await loadUserInfoAll(); //userInfo 불러오기
    const memberId = userInfo?.id;

    if (!memberId) {
      // console.log('memberId를 불러오지 못함');
      return;
    }

    fetch(`${apiUrl}/LikePlus`, {
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
        if (data.success) {
          // console.log('게시글 좋아요 갯수(LikePlus) : ', data.likes);
          setLikeCount(data.likes); // 서버에서 반환된 좋아요 갯수로 업데이트
          setTrigger(prev => !prev); //좋아요 값이 변화한다는걸 알림
        }
      })
      .catch(error => {
        // console.log('좋아요 처리 중 오류 발생(LikePlus):', error);
      });
  };

  const onEditClick = () => {
    //게시글 수정하기 이동
    if (board) {
      navigation.navigate('BoardEdit', {
        image_name: imageName,
        board_id: boardId,
        board_title: board.board_title,
        board_content: board.board_content,
        board_category: board.board_category,
        member_id: id,
        isImage: isImage,
        category: board.board_subcategory,

        setTrigger: setTrigger,
      });
    }
  };
  const handleDelete = async () => {
    //게시글 삭제
    try {
      const response = await fetch(`${apiUrl}/DeleteBoard/${boardId}`, {
        method: 'DELETE', // DELETE 메서드 사용
      });
      const data = await response.json();
      if (data.success) {
        // console.log('게시글 삭제 성공');
        navigation.pop(); // 현재 화면에서 로그인으로 이동
      } else {
        // console.log('게시글 삭제 실패:', data.error);
      }
    } catch (error) {
      // console.log('게시글 삭제 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    // console.log('게시글 좋아요 갯수(게시글 출력시) : ', likeCount);
  }, [likeCount]);

  // 댓글 저장 함수
  const handleComment = () => {
    fetch(`${apiUrl}/CommentAdd`, {
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
          // console.log('댓글 등록 성공(게시글)');
          setComment(''); // 댓글 등록 후 입력 필드 초기화
          setComments(data.comments);
          setTrigger(prev => !prev); //댓글 값이 변화한다는걸 알림
        } else {
          // console.log('댓글 등록 실패(게시글):', data.error);
        }
      })
      .catch(error => {
        // console.log('댓글 등록 중 오류 발생(게시글):', error);
        // console.log(boardId);
        // console.log(id);
        // console.log(comment);
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
      //답글 생성
      navigation.navigate('ReplyAdd', {
        board_id: boardId,
        comment_id: commentId,
        id: id,
        setTrigger: setTrigger,
      });
    }
  };

  const onReplyClick = (reply_id, reply_cid, reply_mid, reply_content) => {
    //답글 클릭시
    if (reply_mid == id) {
      //답글 수정
      navigation.navigate('ReplyEdit', {
        reply_id: reply_id,
        reply_cid: reply_cid,
        reply_mid: reply_mid,
        reply_content: reply_content,
        setTrigger: setTrigger,
      });
    }
  };


  if (!board) return <Text>Loading...</Text>;

  return (
    <View>
      {
        //게시글 작성자(Id => 학번은 추후 수정)
      }

      <FlatList
        data={comments}
        ListHeaderComponent={
          <>
            <SafeAreaView style={styles.block}>
              <Pressable>
                {isImage ? (
                  <Image
                    style={styles.imageArea}
                    source={
                      // response
                      //   ? {uri: response?.assets[0]?.uri}
                      // : //response 값이 없을때 default로 보여줄 이미지입니다.
                      //만약 이미지를 다른걸 쓰신다면 uri의 AppImage/ 뒤에 다른 이미지를 선택하심됩니다.
                      //현재는 user.png파일로 되어있고, 원하는 이미지가 있으시면 카톡에 올려주세요!!
                      {
                        uri: `https://storage.googleapis.com/polintech_image/ServerImage/${imageName}`,
                      }
                    }
                  />
                ) : null}
              </Pressable>
              <View style={styles.form}></View>
            </SafeAreaView>
            {/* 게시글 및 기타 콘텐츠를 이곳에 배치합니다 */}
            <Text>게시글 작성자 : {board.board_mid}</Text>
            <Text>작성자 : {board.member_nickname}</Text>
            <Text>게시글 조회수 : {board.board_hits}</Text>
            <Text>게시글 카테고리 : {board.board_category}</Text>
            <Text>게시글 Sub카테고리 : {board.board_subcategory}</Text>
            <Text>게시글 id : {board.board_id}</Text>
            <Text>게시글 작성일 : {board.board_postdate}</Text>
            <Text>좋아요 수: {likeCount}</Text>
            <Text>게시글 제목 : {board.board_title}</Text>
            <Text>게시글 내용 : {board.board_content}</Text>
            {/* ... */}

            <Button title="좋아요" onPress={handleLike} />
            {board.board_mid === id && (
              <>
                <Button title="수정하기" onPress={() => onEditClick(boardId)} />
                <Button title="삭제하기" onPress={handleDelete} />
              </>
            )}

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                margin: 10,
              }}
              value={comment}
              onChangeText={setComment}
              placeholder="댓글을 입력하세요..."
            />
            <Button title="댓글 등록" onPress={handleComment} />
            {/* 기타 콘텐츠 */}
            <Text>댓글 목록:</Text>
          </>
        }
        keyExtractor={(item, index) =>
          item.comment_id
            ? item.comment_id.toString()
            : boardId + '_comment_' + index
        }
        renderItem={({item}) =>
          item.comment_id ? (
            <View>
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
                  {item.member_nickname}
                  {']'} : {item.comment_content}{' '}
                  {item.comment_mid === id ? '[댓글 수정]' : '[답글]'}
                </Text>
              </TouchableOpacity>

              {Array.isArray(replys) && replys.length > 0 && (
                <FlatList
                  data={replys.filter(
                    reply => reply.reply_cid === item.comment_id,
                  )}
                  keyExtractor={(reply, index) =>
                    reply.reply_id
                      ? reply.reply_id.toString()
                      : boardId + '_reply_' + index
                  }
                  renderItem={({item: reply}) =>
                    reply.reply_cid ? (
                      <TouchableOpacity
                        onPress={() =>
                          onReplyClick(
                            reply.reply_id,
                            reply.reply_cid,
                            reply.reply_mid,
                            reply.reply_content,
                          )
                        }>
                        <Text>
                          {'   ['}
                          {reply.member_nickname}
                          {']'} : {reply.reply_content}{' '}
                          {reply.reply_mid === id ? '[답글 수정]' : ''}
                        </Text>
                      </TouchableOpacity>
                    ) : null
                  }
                />
              )}
            </View>
          ) : null
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 30,
    color: '#000000',
  },
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  imageArea: {
    marginTop: 20,
    backgroundColor: '#cdcdcd',
    borderRadius: 10,
    width: 256,
    height: 256,
  },
  form: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
});
export default BoardDetail;
