import React, {useState, useEffect} from 'react';
import {Button, TextInput, View, Alert, Text} from 'react-native';
const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          pw: pw,
        }),
      });

      const json = await response.json();
      console.log('서버로부터의 응답:', json); // 서버에서 받은 응답을 로그로 출력

      if (json.success) {
        Alert.alert('로그인 성공');
        Alert.alert('로그인 성공');
        setId(json.member.id); // 사용자 ID 저장
        setNickname(json.member.nickname);
        setName(json.member.name);
        setIsLoggedIn(true);
      } else {
        Alert.alert('로그인 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutUser = () => {
    setId('');
    setPw('');
    setNickname('');
    setName('');
    setIsLoggedIn(false);
    Alert.alert('로그아웃 성공');
  };

  return (
    <View>
      {isLoggedIn ? (
        <>
          <Text>닉네임: {nickname}</Text>
          <Text>이름: {name}</Text>
          <Button title={'Logout'} onPress={logoutUser} />
        </>
      ) : (
        <>
          <TextInput value={id} onChangeText={setId} placeholder={'ID'} />
          <TextInput
            value={pw}
            onChangeText={setPw}
            placeholder={'Pw'}
            secureTextEntry
          />
          <Button title={'Login'} onPress={loginUser} />
        </>
      )}
    </View>
  );
};

export default Login;
