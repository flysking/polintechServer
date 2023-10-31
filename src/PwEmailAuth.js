import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';

const PwEmailAuth = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const PwAuthEmailCheck = async () => {
      try {
        const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/findEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        });
    
        const json = await response.json();
    
        if (json.success) {
          //Alert.alert('이메일이 확인되었습니다.');
          handleAuthEmail();
        } else {
          Alert.alert('이메일이 일치하지 않습니다.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('서버 오류가 발생했습니다.');
      }
    };
  
    const handleAuthEmail = async () => {
      try {
  
        const fullEmail = email;
  
        const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/EmailAuth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: fullEmail,
          }),
        });
    
        if (response.ok) {
          Alert.alert('인증 코드가 전송되었습니다.');
          navigation.navigate('PwAuthCode');
        } else {
          Alert.alert('인증 코드 전송 실패');
        }
      } catch (error) {
        console.error('인증 코드 전송 실패:', error);
      }
    };
  
    return (
      <>
      <View style={styles.topMenu}>
          <Text>비밀번호 재설정을 위한 이메일 인증을 해주세요</Text>
      </View><View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="이메일 주소를 입력해주세요."
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"/>
          <TouchableOpacity style={styles.findIdButton} onPress={PwAuthEmailCheck}>
            <Text style={styles.findIdButtonText}>이메일 인증</Text>
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

export default PwEmailAuth;