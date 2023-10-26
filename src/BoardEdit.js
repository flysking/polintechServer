import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';

const BoardEdit = ({route, navigation}) => {
  const boardId = route.params.board_mid;
  const oTitle = route.params.board_title;
  const oContent = route.params.board_content;
  // const otrigger = route.params;
  const {setTrigger} = route.params;
  const [title, setTitle] = useState(oTitle);
  const [content, setContent] = useState(oContent);
  const updateBoard = async () => {
    try {
      const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/EditBoard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board_title: title,
          board_content: content,
          board_id: boardId,
        }),
      });

      const json = await response.json();

      if (json.success) {
        Alert.alert('게시글 수정 성공');
        setTrigger(prev => !prev); // trigger 상태 변경
        navigation.goBack();
      } else {
        console.error('게시글 수정 실패:', json.error);
        Alert.alert('게시글 수정 실패', json.error);
        console.error('게시글 제목', title);
        console.error('게시글 내용', content);
        console.error('게시글 id', boardId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={oTitle}
        style={{borderWidth: 1, marginBottom: 10, padding: 5}}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder={oContent}
        multiline
        numberOfLines={5}
        style={{borderWidth: 1, marginBottom: 10, padding: 5}}
      />
      <Button title="게시글 수정" onPress={updateBoard} />
    </View>
  );
};

export default BoardEdit;
