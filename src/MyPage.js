import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Image, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadUserInfo, logOut } from './Common';

const MyPage = ({ navigation,route }) => {
  const {userInfo}=route.params;
  const [nickname, setNickname] = useState('');
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');

  useEffect(() => {
    // AsyncStorage에서 사용자 정보를 불러와 로그인 상태를 판단합니다.
    const checkLoginStatus = async () => {
      if (userInfo) {
        setNickname(userInfo.nickname);
        setName(userInfo.name);
        setMajor(userInfo.major); 
        setGrade(userInfo.grade);
        setGender(userInfo.gender);
        console.log('로그인 정보 확인함');
      } else {
        console.log('로그인 정보 없음');
        navigation.navigate('LoginScreen');
      }
    };
    checkLoginStatus();
  }, []);

  const btnLogout = async () => {
    await logOut();
    console.log('로그아웃 눌렀어용');
    navigation.navigate('LoginScreen');
  };

  const userUpdate = async () => {
    navigation.navigate('UserUpdate');
    console.log('정보 수정 페이지로 넘어가요');
  };
//현재 db의 member_profile에 이미지 이름 들어가있음.
//update 구문으로 set member_profile profile_blue 이런식으로 하면돼.
// 불러올때는 userInfo에 저장되어있는 이름에 +.png 하는 형식으로 사용하자!
  return (
    <SafeAreaView>
        <View style={styles.container}>
          <Text>마이페이지</Text>
          <Text>닉네임: {nickname}</Text>
          <Text>이름: {name}</Text>
          <Text>학과: {major}</Text>
          <Text>학년: {grade}</Text>
          <Text>성별: {gender}</Text>
          {/* Add more user information fields as needed */}
        </View>
      <Button title={'정보 수정'} onPress={userUpdate} />
      <Button title={'로그아웃'} onPress={btnLogout} />
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  title:{
      color:'white',
      fontSize:20,
      fontWeight:'bold',
      textAlign:'left',
  },
  container:{
      justifyContent: 'center',
      alignItems: 'center',
  },
});

export default MyPage;
