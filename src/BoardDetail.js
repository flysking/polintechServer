import React, {useState, useEffect, useLayoutEffect} from 'react';
import moment from 'moment';
import {
  ScrollView,
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
  Dimensions,
  Alert,
} from 'react-native';
import {saveLoginInfo, loadUserInfoAll, logOut} from './Common';
import Icon from 'react-native-vector-icons/MaterialIcons';
const BoardDetail = ({route, navigation}) => {
  const apiUrl = 'https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app';
  const [board, setBoard] = useState(null);  //게시글 데이터
  const [id, setId] = useState(''); //현재 로그인 유저 id
  const [boardMid, setBoardMid] = useState(''); //현재 게시글의 작성자 id
  const [pw, setPw] = useState(''); //현재 로그인 유저 pw
  const [nickname, setNickname] = useState(''); //현재 로그인 유저 nickname
  const [name, setName] = useState(''); //현재 로그인 유저 name
  const [isAdmin, setIsAdmin] = useState(0); //현재 로그인 유저가 관라자 권한을 가지고 있는지 확인하는 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false); //현재 로그인인지 아닌지 확인하는 변수
  const [major, setMajor] = useState(''); //현재 로그인 유저의 학과
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수 저장
  const boardId = route.params.boardId; // 게시글 id
  const [trigger, setTrigger] = useState(false); //좋아요의 변경 여부 확인
  const [comment, setComment] = useState(''); // 댓글 생성시 댓글 내용을 저장하기 위한 useState 추가
  const [comments, setComments] = useState([]); //댓글 조회에 사용됨
  const [replys, setReplys] = useState([]); // 답글 조회에 사용됨
  const [response, setResponse] = useState(null); //이미지 출력 테스트 변수
  const [isImage, setIsImage] = useState(false); //게시글에 이미지 존재 여부
  const [imageName, setImageName] = useState(''); //게시글에 이미지 이름
  const [modalVisible, setModalVisible] = useState(false);//모달창을 띄우기 위한 변수

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitleStyle: {
          color: '#ffffff', // 헤더 제목의 색상
        },
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#003497',
        },
        headerRight: () => (
            <View>
                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                        <Icon name="more-vert" style={styles.icon}color={'#ffffff'} size={25} />
                </TouchableOpacity>
            </View>
        ),
    });
  }, [navigation]);

  useEffect(() => {
    //DB에 있는 해당 게시글의 조회수 증가 함수
    const updateHits=async()=>{
      try{
        await fetch(`${apiUrl}/BoardHitsUpdate/${boardId}`);

      }catch(error){
        console.error("조회수 증가 도중 오류 발생...",error);
      }
    };
    updateHits();
  }, [boardId]);

  useEffect(() => {
     /*게시글 이미지 체크, 게시글 상세정보, 댓글, 답글 조회 함수
    이때 boardId, isImage, isImageI 변수가 변경될때 마다 실행한다.*/
    const fetchData = async () => {
      try {
       // 1.DB에서 해당 게시글에 이미지가 존재하는지 확인
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
            console.log('이미지 이름:',imageName);
          } else {
            setIsImage(false);
            console.log('이미지 여부(false) : ', isImage);
          }

          // Handle image data...
        }
        console.log('게시글 정보불러오기 실행 ');
        // 2. DB에서 해당 게시글의 데이터를 불러오기
        const boardResponse = await fetch(`${apiUrl}/BoardDetail/${boardId}`);
        if (!boardResponse.ok) {
          console.error('상세보기 요청 에러:', boardResponse.status);
        } else {
          console.log('상세보기 요청 실행 완료 ');
          const boardData = await boardResponse.json();
          setBoard(boardData.board);
          setLikeCount(boardData.likes);
          console.log('게시글 정보 확인 :  ',boardData.board);
          navigation.setOptions({
            title:boardData.board.board_title,
          });
        }

        // 3. DB에서 해당 게시글의 댓글 조회
        const commentsResponse = await fetch(
          `${apiUrl}/CommentList/${boardId}`,
        );
        if (!commentsResponse.ok) {
          console.error('댓글 조회 요청 에러:', commentsResponse.status);
        } else {
          const commentsData = await commentsResponse.json();
          setComments(commentsData.comments);
          // console.log(comments);
        }

        // 4. DB에서 해당 게시글의 댓글의 답글 조회
        const replysResponse = await fetch(`${apiUrl}/ReplyList/${boardId}`);
        if (!replysResponse.ok) {
          console.error('답글 조회 요청 에러:', replysResponse.status);
        } else {
          const replysData = await replysResponse.json();
          setReplys(replysData.replys);
          // console.log(replys);
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    };

    fetchData();
  }, [boardId, isImage, trigger]); 

  useEffect(() => {
    //userinfo 불러오기
    const fetchUser = async () => {
      const savedData = await loadUserInfoAll(); //Common폴더에 있는 loadUserInfoAll

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

    fetchUser();
  }, []);

  const handleLike = async () => {
    //좋아요 추가 프로세스
    const userInfo = await loadUserInfoAll(); //userInfo 불러오기
    const memberId = userInfo?.id;

    if (!memberId) {
      // console.log('memberId를 불러오지 못함');
      return;
    }

    await fetch(`${apiUrl}/LikePlus`, {
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
    //게시글 수정하는 페이지 이동
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
  // 댓글 저장 함수
  const handleComment = async() => {
    await fetch(`${apiUrl}/CommentAdd`, {
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
    //댓글 클릭시 답글을 생성할 수 있으며 작성자일때 댓글을 수정할 수 있다.
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
     //답글 클릭시 작성자일때 답글을 수정할 수 있다.
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
  //작성일자의 형식을 변경하기 위한 함수
  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD HH:mm');
  };
  const report = (board_id) =>{
    console.log('신고할 게시글 id : ',board_id);
    Alert.alert('준비 중인 기능입니다.');
  };

  const handleBookmark =(board_title) =>{
    console.log('즐겨찾기 추가한 게시글 제목 : ',board_title);
    Alert.alert('준비 중인 기능입니다~');
  };


  if (!board) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={{width:'100%', backgroundColor:'#ffffff'}}>
      <FlatList style={{backgroundColor:'#ffffff'}}
        ListHeaderComponent={
          <>
              <View style={styles.block}>
                <View style={styles.header}>
                  <Text style={styles.txtTitle}>[{board.board_subcategory}]{board.board_title}</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.txtMember}>{board.member_name}</Text>
                    <Text>{formatDate(board.board_postdate)}</Text>
                  </View>
                  <Text>조회 {board.board_hits} | 좋아요 {likeCount}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={{textAlign:'left',width:'100%',minHeight:250,}}>
                  <View style={{width:'100%',alignItems:'center'}}>
                    <Pressable>
                    {/*DB에 해당 게시글에 이미지 파일명이 존재하면 구글 클라운드에 업로드되어 있는 이미지를 들고 온다. */}
                    {isImage ? (
                      <Image
                        style={styles.imageArea}
                        source={{
                            uri: `https://storage.googleapis.com/polintech_image/ServerImage/${imageName}`,
                          }
                        }
                      />
                      ) : null}
                    </Pressable>
                  </View>
                <View style={styles.content}>
                  <Text style={{color:'#000000',fontSize:15,}}>{board.board_content}</Text>
                </View>
              </View>
              <View style={{width:'100%', flexDirection:'row', justifyContent:'center', marginVertical:20,}}>
              <TouchableOpacity onPress={handleLike}>
                <Icon name="favorite" style={styles.icon}color={'red'} size={30} />
              </TouchableOpacity>
              <Text style={{marginLeft:10,fontSize:20,}}>{likeCount}</Text>
            </View>
            </View>
            <View style={{backgroundColor:'#ffffff',justifyContent:'center',flexDirection:'row', borderBottomWidth:1,borderTopWidth:1,borderColor:'gray'}}>
              <TextInput
                style={{
                  flex:8,
                  padding: 5,
                  margin: 5,
                }}
                value={comment}
                onChangeText={setComment}
                placeholder="댓글을 입력하세요..."
              />
              <TouchableOpacity style={{flex:2,margin:5, paddingHorizontal:15,paddingVertical:15,backgroundColor:'#003497',borderRadius:10}} onPress={handleComment}>
                <Text style={{textAlign:'center',color:'#ffffff',fontWeight:'bold'}}>등록</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'gray',height:30, justifyContent:'center'}}>
              <Text style={{marginLeft:10,fontSize:15,color:'#ffffff'}}>댓글 목록:</Text>
            </View>
          </>
        }
        data={comments}
        keyExtractor={(item, index) =>
          item.comment_id
            ? item.comment_id.toString()
            : boardId + '_comment_' + index
        }
        renderItem={({item}) =>
          item.comment_id ? (
            <View style={item.comment_mid===id?styles.commentAreaFocused:styles.commentArea}>
              <TouchableOpacity
                onPress={() =>
                  onCommentClick(
                    item.comment_id,
                    item.comment_mid,
                    item.comment_content,
                  )
                }>
                <Text style={{color:'#000000'}}>
                  {'['}
                  {item.member_name}
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
                      style={reply.reply_mid===id?styles.replyAreaFocused : styles.replyArea}
                        onPress={() =>
                          onReplyClick(
                            reply.reply_id,
                            reply.reply_cid,
                            reply.reply_mid,
                            reply.reply_content,
                          )
                        }>
                        <Text style={{color:'#000000'}}>
                          {'   ['}
                          {reply.member_name}
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
      {modalVisible && ( //드로어 네비게이터
            <View style={styles.drawerBackground}>
              <Pressable style={styles.overlayBackground}
              onPress={()=>setModalVisible(false)}>
                  {board.board_mid === id ? (
                    <View style={styles.overlayBox}>
                      <Pressable onPress={() => onEditClick(boardId)}>
                        <Text style={styles.drawerFont}>수정하기</Text>
                      </Pressable>
                      <Pressable onPress={handleDelete}>
                        <Text style={styles.drawerFont}>삭제하기 </Text>
                      </Pressable>
                      <Pressable onPress={() => handleBookmark(boardId)}>
                        <Text style={styles.drawerFont}>즐겨찾기</Text>
                      </Pressable>
                  </View>
                  ):(
                  <View style={styles.overlayBox2}>
                    <Pressable onPress={() => handleBookmark(board.board_title)}>
                      <Text style={styles.drawerFont}>즐겨찾기</Text>
                    </Pressable>
                    <Pressable onPress={()=>report(boardId)}>
                      <Text style={styles.drawerFont}>신고하기</Text>
                    </Pressable>
                 </View>                   
                  )}
              </Pressable>
            </View>
          )}
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  txtTitle:{
    fontSize:20,
    color:'#000000',
  },
  txtMember:{
    color:'#000000',
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    color: '#000000',
  },
  block: {
    //alignItems: 'center',
    //paddingHorizontal: 16,
    width: '100%',
    backgroundColor:'#ffffff',
  },
  imageArea: {
    paddingHorizontal:16,
    marginTop: 20,
    backgroundColor: '#cdcdcd',
    borderRadius: 10,
    width:400,
    height:400,
  },
  header: {
    marginTop:10,
    paddingHorizontal:16,
    width: '100%',
  },
  line:{
    marginTop:15,
    width:512,
    height:1,
    borderBottomWidth:2,
    borderColor:'#e8e8e8',
  },
  content:{
    marginTop:30,
    marginHorizontal:10,
  },
  commentArea:{   
    backgroundColor:'#ffffff',
    paddingHorizontal:10,
    paddingVertical:20,
    borderBottomWidth:1,
    borderColor:'gray',
  },
  commentAreaFocused:{   
    backgroundColor:'#efefef',
    paddingHorizontal:10,
    paddingVertical:20,
    borderBottomWidth:1,
    borderColor:'gray',
  },
  replyArea:{
    backgroundColor:'#ffffff',
    paddingVertical:10,
  },
  replyAreaFocused:{
    backgroundColor:'#efefef',
    paddingVertical:10,
  },
  overlayBox: {
    position:'absolute',
    width:100,
    height:120,
    right:0,
    paddingVertical:10,
    marginTop:30,
    borderColor:'#000000',
    borderWidth:1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayBox2: {
    position:'absolute',
    width:100,
    height:70,
    right:0,
    paddingVertical:10,
    marginTop:30,
    borderColor:'#000000',
    borderWidth:1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerFont:{
    color:'#000000',
  },
  drawerBackground:{
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width, // 화면 너비
    height: Dimensions.get('window').height,    
},
overlayBackground: {
    width: Dimensions.get('window').width, // 화면 너비
    height: Dimensions.get('window').height,
    position: 'absolute',
    marginTop:-24,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, 
  },
});
export default BoardDetail;
