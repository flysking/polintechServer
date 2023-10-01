import React, {useState, useEffect} from 'react';
import {Button, TextInput, View, Alert, Text} from 'react-native';

const Login = ({navigation}) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{

    if(!isLoggedIn){
      const timer = setTimeout(() => {
        Alert.alert("로그인이 필요합니다.");
      }, 1000); // 3초 대기 (원하는 시간으로 조정)
      return() => clearTimeout(timer);
    }
  },[isLoggedIn]);

  const loginUser = async () => {
    try {
      const response = await fetch('https://port-0-polintechserver-ac2nlkzlq8aw.sel4.cloudtype.app/login', {
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
        navigation.navigate('Main');
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
  const toSign=()=>{
    navigation.navigate('Sign');

  }
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
          <TextInput placeholder={'ID'} value={id} onChangeText={setId}  />
          <TextInput
            placeholder={'Pw'}
            value={pw}
            onChangeText={setPw}
            secureTextEntry
          />
          <Button title={'로그인'} onPress={loginUser} />
          <Button title={'회원가입'} onPress={toSign} />
        </>
      )}
    </View>
  );
};

export default Login;
