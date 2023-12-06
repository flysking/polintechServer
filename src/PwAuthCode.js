import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';

const PwAuthCode = ({ navigation }) => {
    const [auth, setAuth] = useState('');

    const PwAuthCodeCheck = async () => {
        try {

        const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/AuthCheck', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            authCheck: auth,
            }),
        });
        
        if (response.ok) {
            Alert.alert('인증 코드가 확인되었습니다\n현재 비밀번호 복구 페이지는 개발중입니다.');
            navigation.navigate('LoginScreen');
        } else {
            Alert.alert('인증 코드가 일치하지 않습니다.');
        }
        } catch (error) {
        console.error('인증 실패:', error);
        }
    };

    return (
        <>
        <View style={styles.topMenu}>
            <Text>인증 코드 확인을 위해 발송된 코드를 입력해주세요.</Text>
        </View><View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="인증 코드를 입력해주세요."
              onChangeText={setAuth}
              value={auth}/>
            <TouchableOpacity style={styles.findIdButton} onPress={PwAuthCodeCheck}>
              <Text style={styles.findIdButtonText}>인증 확인</Text>
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

export default PwAuthCode;