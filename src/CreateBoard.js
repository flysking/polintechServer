import React, {useState, useEffect} from 'react';
import {Button, TextInput, View, Alert} from 'react-native';

const CreateBoard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mid, setMid] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchMemberSession = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/getMemberSession');
        const json = await response.json();
        if (json.success) {
          setMid(json.member.member_id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemberSession();
  }, []);
  const createBoard = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/createBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board_title: title,
          board_content: content,
          board_mid: mid,
          board_category: category,
        }),
      });

      const json = await response.json();
      if (json.success) {
        Alert.alert('게시글 생성 성공');
      } else {
        Alert.alert('게시글 생성 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput value={title} onChangeText={setTitle} placeholder={'제목'} />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder={'내용'}
        multiline
      />
      <TextInput
        value={mid}
        onChangeText={setMid}
        placeholder={'작성자 ID'}
        editable={false} // TextInput을 비활성화합니다.
      />
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder={'카테고리'}
      />
      <Button title={'게시글 생성'} onPress={createBoard} />
    </View>
  );
};

export default CreateBoard;
