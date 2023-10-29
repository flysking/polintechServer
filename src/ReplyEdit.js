import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Alert, Text} from 'react-native';

const ReplyEdit = ({route, navigation}) => {
  const reply_id = route.params.reply_id;
  const reply_mid = route.params.reply_mid;
  const reply_content = route.params.reply_content;
  const reply_cid = route.params.reply_cid;
  const {setTrigger} = route.params;

  const [replyId, setReplyId] = useState(reply_id);
  const [replyMid, setReplyMid] = useState(reply_mid);
  const [replyCid, setReplyCid] = useState(reply_cid);
  const [replyContent, setReplyContent] = useState(reply_content);

  const updateReply = async () => {
    //답글 수정
    try {
      const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/EditReply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reply_id: replyId,
          reply_mid: replyMid,
          reply_content: replyContent,
          reply_cid: replyCid,
        }),
      });

      const json = await response.json();

      if (json.success) {
        Alert.alert('답글 수정 성공');
        setTrigger(prev => !prev); // trigger 상태 변경
        navigation.goBack();
      } else {
        console.log('답글 수정 실패:', json.error);
        Alert.alert('댓글 수정 실패', json.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteReply = async () => {
    //답글 삭제
    try {
      console.log('답글 id(게시판) :', reply_id);
      const response = await fetch(
        `https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/${reply_id}`,
        {
          method: 'DELETE', // DELETE 메서드 사용
        },
      );
      const json = await response.json();
      if (json.success) {
        Alert.alert('답글 수정 성공');
        console.log('답글 삭제 성공');
        navigation.navigate('Login'); // 현재 화면에서 로그인으로 이동
      } else {
        console.log('답글 삭제 실패:', json.error);
      }
    } catch (error) {
      console.log('답글 삭제 중 오류 발생:', error);
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        value={replyContent}
        onChangeText={setReplyContent}
        placeholder={reply_content}
        multiline
        numberOfLines={5}
        style={{borderWidth: 1, marginBottom: 10, padding: 5}}
      />
      <Button title="답글 수정" onPress={updateReply} />
      <Button title="답글 삭제" onPress={DeleteReply} />
    </View>
  );
};

export default ReplyEdit;
