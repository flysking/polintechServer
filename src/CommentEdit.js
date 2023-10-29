import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Alert, Text} from 'react-native';

const CommentEdit = ({route, navigation}) => {
  const comment_id = route.params.comment_id;
  const comment_mid = route.params.board_title;
  const comment_content = route.params.comment_content;

  const {setTrigger} = route.params;
  const [commentId, setCommentId] = useState(comment_id);
  const [commentMid, setCommentMid] = useState(comment_mid);
  const [commentContent, setCommentContent] = useState(comment_content);

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
        style={{borderWidth: 1, marginBottom: 10, padding: 5}}
      />
      <Button title="댓글 수정" onPress={updateComment} />
      <Button title="댓글 삭제" onPress={DeleteComment} />
    </View>
  );
};

export default CommentEdit;
