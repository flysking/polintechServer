import React, {useState, useEffect} from 'react';
import {Button, TextInput, View, Alert, Text,StyleSheet} from 'react-native';
import { saveLoginInfo } from './src/Common/Common';

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
      }, 1000); // 1초 대기 (원하는 시간으로 조정)
      return() => clearTimeout(timer);
    }
  },[isLoggedIn]);

  const loginUser = async () => {
    try {
      const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/login', {
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
        navigation.navigate('MainTest');
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
        <View style={styles.container}>
          <TextInput placeholder={'ID'} value={id} onChangeText={setId}  />
          <TextInput
            placeholder={'Pw'}
            value={pw}
            onChangeText={setPw}
            secureTextEntry
          />
          <Button title={'로그인'} onPress={loginUser} />
          <Button title={'회원가입'} onPress={toSign} />
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: '75%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 14,  //버튼 세로
    paddingHorizontal: 70,  //버튼 가로
    marginTop: 10,  //버튼 윗쪽 마진
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 1,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passwordRecoveryButton: { // Added missing colon here
    backgroundColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 1,
  },
  passwordRecoveryButtonText: { // Added missing colon here
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // 가운데로 정렬
    width: '100%',
    marginTop: 10,
    marginHorizontal: 3, // 가로 간격 조정
  },
});
export default Login;
