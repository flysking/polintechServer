import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { loadUserInfo } from './Common';

function PwUpdate({ navigation }){
    const [pw, setPw] = useState(''); //현재 비밀번호
    const [newPw, setNewPw] = useState(''); //새로운 비밀번호
    const [pwConfirmation, setPwConfirmation] = useState(''); //새로운 비밀번호 확인
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleFindPw = async () => {
        try {
          const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/findPw', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pw: pw,
            }),
          });
      
          const json = await response.json();
      
          if (json.success) {
            // 비밀번호를 찾았을 때
            PwAuthCodeCheck();
          } else {
            // 비밀번호를 찾지 못했을 때
            setPw('');
            Alert.alert('비밀번호가 일치하지 않습니다.');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('서버 오류가 발생했습니다.');
        }
    };

    const PwAuthCodeCheck = async () => {
        try {

          if (pw === newPw) {
              Alert.alert('새로운 비밀번호를 입력해주세요.');
              return; // 동일한 경우 더 이상 진행하지 않음
            }  

          const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/PwUpdate', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({
              pw: pw,
              newPw: newPw,
              }),
          });  

          const json = await response.json();
          console.log('서버 응답:', json);
      
          if (json.success) {
              Alert.alert('비밀번호가 재설정 되었습니다.');
              navigation.navigate('LoginScreen');
          } else {
              Alert.alert('비밀번호 재설정 오류.');
          }
        } catch (error) {           
          console.error('재설정 실패:', error);
        }
    };

    useEffect(() => {
      // AsyncStorage에서 사용자 정보를 불러와 로그인 상태를 판단합니다.
      const checkLoginStatus = async () => {
        const userInfo = await loadUserInfoAll();
        if (userInfo) {
          // setIsLoggedIn(userInfo);
          // console.log('로그인 정보 확인함');
        } else {
          
        }
      };
    
      checkLoginStatus();
    }, []);

    return (
        <>

          <View style={styles.topMenu}>
            <Text>비밀번호 재설정을 위해 현재 비밀번호를 입력해주세요</Text>
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="현재 비밀번호"
              onChangeText={setPw}
              value={pw}
              secureTextEntry/>
            <TextInput
                style={styles.input}
                placeholder="새로운 비밀번호"
                onChangeText={setNewPw}
                value={newPw}
                secureTextEntry/>
              <Text>
              {newPw === ''
                ? ''
                : newPw.length < 6 && newPw.length < 20
                ? '6~20자의 숫자, 영문 대/소문자, 특수문자를 사용해주세요.'
                : !/[0-9]/.test(newPw)
                ? '6~20자의 숫자, 영문 대/소문자, 특수문자를 사용해주세요.'
                : !/[a-z]/.test(newPw)
                ? '6~20자의 숫자, 영문 대/소문자, 특수문자를 사용해주세요.'
                : newPw.length > 20
                ? '6~20자의 숫자, 영문 대/소문자, 특수문자를 사용해주세요.'
                : !/[A-Z]/.test(newPw)
                ? '영어 대문자를 포함해주세요.'
                : !/[^a-zA-Z0-9]/.test(newPw)
                ? '특수문자를 포함해주세요.'
                : '사용 가능한 비밀번호입니다.'}  
              </Text>          
              <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                onChangeText={setPwConfirmation}
                value={pwConfirmation}
                secureTextEntry/>
              {pwConfirmation !== '' && (
                  <Text style={styles.passwordMessage}>
                      {newPw === pwConfirmation
                      ? '비밀번호가 일치합니다.'
                      : '비밀번호가 일치하지 않습니다.'}
                  </Text>
              )}
          </View>
        <View style={styles.container}>
            <TouchableOpacity style={styles.findIdButton} onPress={handleFindPw}>
              <Text style={styles.findIdButtonText}>비밀번호 재설정</Text>
            </TouchableOpacity>
        </View>
        </>
      );
    };
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      input: {
        width: '75%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
      },
      findIdButton: {
        backgroundColor: 'darkblue',
        borderRadius: 5,
        paddingVertical: 14,
        paddingHorizontal: 70,
        marginTop: 10,
      },
      findIdButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      foundIdText: {
        marginTop: 10,
      },
      topMenu:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:60,
        paddingTop:10,
        paddingBottom:10,
        borderBlockColor:'gray',
        borderBottomWidth:1,
    },
    category:{
      fontSize:15,
    },
  });
  
export default PwUpdate;