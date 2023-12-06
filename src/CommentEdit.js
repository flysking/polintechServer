import React, {useState, useEffect,useLayoutEffect} from 'react';
import {View, TextInput, TouchableOpacity, Alert, Text} from 'react-native';

const CommentEdit = ({route, navigation}) => {
  const comment_id = route.params.comment_id;
  const comment_mid = route.params.board_title;
  const comment_content = route.params.comment_content;

  const {setTrigger} = route.params;
  const [commentId, setCommentId] = useState(comment_id);
  const [commentMid, setCommentMid] = useState(comment_mid);
  const [commentContent, setCommentContent] = useState(comment_content);

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"댓글 수정",
      headerTitleStyle: {
        color: '#ffffff', // 원하는 색상으로 변경
      },
      headerStyle:{
        backgroundColor:'#003497',
      },
      headerTintColor: '#ffffff',
    })
  },[navigation])

  const updateComment = async () => {
    //댓글 수정
    try {
      const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/EditComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment_id: commentId,
          comment_mid: commentMid,
          comment_content: commentContent,
        }),
      });

      const json = await response.json();

      if (json.success) {
        Alert.alert('댓글 수정 성공');
        setTrigger(prev => !prev); // trigger 상태 변경
        navigation.goBack();
      } else {
        console.log('댓글 수정 실패:', json.error);
        Alert.alert('댓글 수정 실패', json.error);
        console.log('댓글 id', comment_id);
        console.log('작성자', comment_mid);
        console.log('댓글 내용', comment_content);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteComment = async () => {
    //댓글 삭제
    try {
      console.log(comment_id);
      const response = await fetch(
        `https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/DeleteComment/${comment_id}`,
        {
          method: 'DELETE', // DELETE 메서드 사용
        },
      );
      const json = await response.json();
      if (json.success) {
        console.log('댓글 삭제 성공');
        navigation.pop();
      } else {
        console.log('댓글 삭제 실패:', json.error);
      }
    } catch (error) {
      console.log('댓글 삭제 중 오류 발생:', error);
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        value={commentContent}
        onChangeText={setCommentContent}
        placeholder={comment_content}
        multiline
        numberOfLines={5}
        style={{borderWidth: 1, padding: 5}}
      />
      <View style={{flexDirection:'row',width:'100%',justifyContent:'center'}}>
        <TouchableOpacity style={{borderRadius:15,marginHorizontal:5,backgroundColor:'#003497'}} onPress={updateComment} >
          <Text style={{color:'#ffffff', padding:10,}}>댓글 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:15,marginHorizontal:5, backgroundColor:'#003497'}}  onPress={DeleteComment} >
          <Text style={{color:'#ffffff', padding:10,}}>댓글 삭제</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CommentEdit;
