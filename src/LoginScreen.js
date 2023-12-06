import React, { useState, useEffect } from 'react';
import { Button, Alert,View, TextInput, TouchableOpacity, StyleSheet, Text, Image, Keyboard } from 'react-native';
import { saveUserInfoAll, logOut, loadUserInfoAll } from './Common';

const LoginScreen = ({navigation}) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState('0');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [foundId, setFoundId] = useState(null);
  const [emailNotFound, setEmailNotFound] = useState(false);

  useEffect(()=>{
    if(isLoggedIn=='0'||isLoggedIn===(null)){
      const timer = setTimeout(() => {
        Alert.alert("로그인이 필요합니다.");
      }, 500); 
      return() => clearTimeout(timer);
    }
  },[isLoggedIn]);

  useEffect(() => {
    // AsyncStorage에서 사용자 정보를 불러와 로그인 상태를 판단합니다.
    const checkLoginStatus = async () => {
      const userInfo = await loadUserInfoAll();
      if (userInfo.isLogin==='1') {
        setNickname(userInfo.nickname);
        setName(userInfo.name);
        setIsLoggedIn(userInfo.isLogin);
      }else{
        setIsLoggedIn(userInfo.isLogin);
      }
    };
    checkLoginStatus();
  }, []);


  const logoutUser = async () => {
    await logOut();
    setId('');
    setPw('');
    setNickname('');
    setName('');
    setIsLoggedIn('0');
    Alert.alert('로그아웃 성공');
  };
  const handleLogin = async () => {
    Keyboard.dismiss(); //휴대폰 키보드를 닫음
    console.log('로그인 버튼 눌렀어용',id,'/',pw);
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
        setId(json.member.id); // 사용자 ID 저장
        setNickname(json.member.nickname);
        setName(json.member.name);
        setIsLoggedIn(true);

        const userInfo = {
          id: json.member.id,
          pw: json.member.pw,
          name: json.member.name,
          engname: json.member.engname,
          nickname: json.member.nickname,
          email: json.member.email,
          major:json.member.majorname,
          birth:json.member.birth,
          gender:json.member.gender,
          iscert:json.member.iscert,
          isAdmin:json.member.isAdmin,
          grade:json.member.grade,
          profile:json.member.profile,
        };
        console.log('유저정보확인:',userInfo),
        await saveUserInfoAll(userInfo);
      } else {
        Alert.alert('로그인에 실패하였습니다.\n아이디 또는 비밀번호를 확인해주세요.');
        return;
      }
      const userInfo=await loadUserInfoAll();
      navigation.navigate('CheckIsCert',{userInfo});
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignUp = () => {
    navigation.navigate('Sign');
    // Replace this with your registration logic
    console.log('User signed up:');
  };

  const handlePasswordRecovery = () => {
    //비밀번호 복구 페이지
    navigation.navigate('PwRecover');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ==='0' ? (
        <>
          <Text>닉네임: {nickname}</Text>
          <Text>이름: {name}</Text>
          <Button title={'Logout'} onPress={logoutUser} />
        </>
      ):(
        <>
      <Image
        source={require('../image/Logo_original.png')} // Replace with the actual image file path
        style={styles.image}
        resizeMode='contain'
      />
      <TextInput
        style={styles.input}
        placeholder="ID"
        onChangeText={setId}
        value={id}
        keyboardType="email-address" // Use the email address keyboard type for ID
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPw}
        value={pw}
        keyboardType="default" // Use the default keyboard type for the password
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.passwordRecoveryButton, { backgroundColor: 'transparent' }]} onPress={handlePasswordRecovery}>
          <Text style={[styles.passwordRecoveryButtonText, { color: 'black' }]}>비밀번호찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signupButton, { backgroundColor: 'transparent' }]} onPress={handleSignUp}>
          <Text style={[styles.signupButtonText, { color: 'black' }]}>회원가입</Text>
        </TouchableOpacity>
      </View>
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
        </>
      )}
        <View style={{marginVertical:15,}}>
          <Text style={{color:'gray',fontSize:13,textAlign:'center'}}>
              고객 상담 접수 : 카카오톡 @Polintech
          </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor:'#ffffff',
  },
  image: {
    width: 210,
    height: 150,
    marginBottom:-10
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

export default LoginScreen;