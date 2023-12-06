import React, {useState, useLayoutEffect} from 'react';
import {View, TextInput, Button, Alert, Text} from 'react-native';

const ReplyAdd = ({route, navigation}) => {
  const board_id = route.params.board_id;
  const comment_id = route.params.comment_id;
  const user_id = route.params.id;

  const {setTrigger} = route.params;
  const [id, setId] = useState(user_id);
  const [commentId, setCommentId] = useState(comment_id);
  const [boardId, setBoardId] = useState(board_id);
  const [replyContent, setReplyContent] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitleStyle: {
          color: '#ffffff', // 헤더 제목의 색상
        },
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#003497',
        },
    });
  }, [navigation]);

  // 답글 저장 함수
  const handleReply = () => {
    fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/ReplyAdd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reply_bid: boardId, //게시글 id
        reply_cid: commentId, //댓글 id
        reply_content: replyContent, //답글 내용
        reply_mid: id, //작성자 id
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(boardId);
        console.log(id);
        console.log(replyContent);
        console.log(commentId);
        if (data.success) {
          console.log('댓글 등록 성공(게시글)');
          setTrigger(prev => !prev); //값이 변화한다는걸 알림
          navigation.goBack();
        } else {
          console.log('댓글 등록 실패(게시글):', data.error);
        }
      })
      .catch(error => {
        console.log('댓글 등록 중 오류 발생(게시글):', error);
        console.log(boardId);
        console.log(id);
        console.log(replyContent);
        console.log(commentId);
      });
  };
  return (
    <View style={{padding: 20}}>
      <TextInput
        value={replyContent}
        onChangeText={setReplyContent}
        placeholder={replyContent}
        multiline
        numberOfLines={5}
        style={{borderWidth: 1, marginBottom: 10, padding: 5}}
      />
      <Button title="답글 생성" onPress={handleReply} />
    </View>
  );
};

export default ReplyAdd;
