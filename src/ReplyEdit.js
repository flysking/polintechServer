import React, {useState, useLayoutEffect} from 'react';
import {TouchableOpacity, View, TextInput, Button, Alert, Text} from 'react-native';

const ReplyEdit = ({route, navigation}) => {
  const reply_id = route.params.reply_id;//답글id
  const reply_mid = route.params.reply_mid;//답글 작성자 id
  const reply_content = route.params.reply_content;//답글 내용
  const reply_cid = route.params.reply_cid; //댓글 id
  const {setTrigger} = route.params;//변화 변수

  const [replyId, setReplyId] = useState(reply_id);
  const [replyMid, setReplyMid] = useState(reply_mid);
  const [replyCid, setReplyCid] = useState(reply_cid);
  const [replyContent, setReplyContent] = useState(reply_content);
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
  const updateReply = async () => {
     //답글 수정 - 댓글 id, 답글 id, 작성자 id, 답글 수정 내용을 입력받아 DB에서 Update함
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
    //답글 삭제 - 답글 id를 통해서 해당하는 답글을 DB에서 제거함
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
      <View style={{flexDirection:'row',width:'100%',justifyContent:'center'}}>
        <TouchableOpacity style={{borderRadius:15,marginHorizontal:5,backgroundColor:'#003497'}} onPress={updateReply} >
          <Text style={{color:'#ffffff', padding:10,}}>답글 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:15,marginHorizontal:5, backgroundColor:'#003497'}}  onPress={DeleteReply} >
          <Text style={{color:'#ffffff', padding:10,}}>답글 삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReplyEdit;
