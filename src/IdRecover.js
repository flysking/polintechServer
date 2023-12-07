import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, SafeAreaView } from 'react-native';

const IdRecover = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  //db에서 이메일 확인 후 아이디 판별
  const handleFindIdByEmail = async () => {
    try {
      const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/findIdByEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          email: email,
        }),
      });
  
      const json = await response.json();
  
      if (json.success) {
        // 이메일을 찾았을 때
        setId(json.member.id); // 서버로부터 받은 ID를 설정
        //Alert.alert('아이디를 찾았습니다: ' + json.member.id);
      } else {
        // 이메일을 찾지 못했을 때
        setId('');
        Alert.alert('해당 이메일로 등록된 ID가 없습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('서버 오류가 발생했습니다.');
    }
  };
  
  const handleIdRecovery = () => {
    navigation.navigate('IdRecover');
    //아이디 복구 신청 페이지로 이동합니다.
    console.log('아이디 복구 신청 페이지로 이동합니다.');
  };

  const handlePwRecovery = () => {
    navigation.navigate('PwRecover');
    //비밀번호 복구 신청 페이지로 이동합니다.
    console.log('비밀번호 복구 신청 페이지로 이동합니다.');
  };

  return (
    <><View style={styles.topMenu}>
      <TouchableOpacity onPress={handleIdRecovery}
        style={styles.category}
      >
        <Text>아이디 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePwRecovery}
        style={styles.category}
      >
        <Text>비밀번호 찾기</Text>
    </TouchableOpacity>
    </View><View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="이메일을 입력해주세요."
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"/>
        <TouchableOpacity style={styles.findIdButton} onPress={handleFindIdByEmail}>
          <Text style={styles.findIdButtonText}>아이디 찾기</Text>
        </TouchableOpacity>
        {id && (
          <Text style={styles.foundIdText}>{email}로 등록된 아이디: {id}</Text>
        )}
      </View></>
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

export default IdRecover;
