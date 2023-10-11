import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

function Sign(){
  const [id, setId] = useState(''); //학번
  const [idMessage, setIdMessage] = useState(''); //중복확인
  const [pw, setPw] = useState(''); //비밀번호
  const [pwConfirmation, setPwConfirmation] = useState(''); //비밀번호 확인
  const [name, setName] = useState(''); //이름
  const [engname, setEngname] = useState(''); //영어 이름
  const [nickname, setNickname] = useState(''); //닉네임
  const [major, setMajor] = useState(''); //학과
  const [email, setEmail] = useState(''); //이메일
  const [birth, setBirth] = useState(''); //생년월일
  const [gender, setGender] = useState(''); //성별
  const [emailDomain, setEmailDomain] = useState('');
  const [existingUsers, setExistingUsers] = useState('');
  const [selectedEmailOption, setSelectedEmailOption] = useState('gmail.com'); // 이메일 선택 옵션
  const emailOptions = ['직접입력', 'naver.com', 'gmail.com', 'daum.net']; // 이메일 옵션 목록
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/; //비밀번호 정규식 숫자, 영문 대,소문자, 특수문자 포함 6~20자 이내
  
    const loginUser = async () => {
      try {
        const response = await fetch('https://port-0-polintechserver-ac2nlkzlq8aw.sel4.cloudtype.app/Sign', {
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
  
        console.log('서버로부터의 응답 :', json);
  
        if (id === '') {
          Alert.alert('아이디를 입력은 필수입니다!');
        } else if (!passwordRegex.test(pw)) {
          Alert.alert('비밀번호 입력은 필수입니다!');
        } else if (pw === '') {
          Alert.alert('비밀번호를 입력하세요.');
        } else if (gender === '') {
          Alert.alert('성별을 선택하세요.');
        } else if (email === '') {
          Alert.alert('이메일을 입력하세요.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    const handleCancel = () => {};
    return (
        <SafeAreaView>
          <ScrollView>
          <TextInput
            style={styles.input}
            value={id}
            onChangeText={setId}
            placeholder="학번"
          />
          <Text>{idMessage}</Text>
          <TextInput
            style={styles.input}
            value={pw}
            onChangeText={setPw}
            placeholder="비밀번호"
            secureTextEntry
          />
          <Text style={styles.passwordMessage}>
            {pw === ''
              ? ''
              : pw.length < 6 && pw.length < 20
              ? '6~20자의 숫자, 영문 대/소문자, 특수문자를 사용해주세요.'
              : !/[0-9]/.test(pw)
              ? '6~20자의 숫자, 영문 대/소문자, 특수문자를 사용해주세요.'
              : !/[a-z]/.test(pw)
              ? '6~20자의 숫자, 영문 대/소문자, 특수문자를 사용해주세요.'
              : pw.length > 20
              ? '6~20자의 숫자, 영문 대/소문자, 특수문자를 사용해주세요.'
              : !/[A-Z]/.test(pw)
              ? '영어 대문자를 포함해주세요.'
              : !/[^a-zA-Z0-9]/.test(pw)
              ? '특수문자를 포함해주세요.'
              : '사용 가능한 비밀번호입니다.'}
          </Text>
          <TextInput
            style={styles.input}
            value={pwConfirmation}
            onChangeText={setPwConfirmation}
            placeholder="비밀번호 확인"
            secureTextEntry
          />
          {pwConfirmation !== '' && (
            <Text style={styles.passwordMessage}>
              {pw === pwConfirmation
                ? '비밀번호가 일치합니다.'
                : '비밀번호가 일치하지 않습니다.'}
            </Text>
          )}
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름"
          />
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="닉네임"
          />
          <Text style={styles.nickMessage}>
            {nickname === ''
              ? ''
              : nickname.length > 5 && nickname.length < 8
              ? '닉네임은 5~8자로 입력해주세요'
              : ''}
          </Text>
          <TextInput
            style={styles.input}
            value={engname}
            onChangeText={setEngname}
            placeholder="영어 이름"
          />
          <TextInput
            style={styles.input}
            value={major}
            onChangeText={setMajor}
            placeholder="학과"
          />
          <TextInput
            style={styles.input}
            value={birth}
            onChangeText={setBirth}
            placeholder="생년월일"
          />
          <View style={styles.radioOptions}>
            <TouchableOpacity
              onPress={() => setGender('남자')}
              style={[
                styles.radioOption,
                gender === '남자' ? styles.checkedOption : null,
              ]}>
              <Text>남자</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('여자')}
              style={[
                styles.radioOption,
                gender === '여자' ? styles.checkedOption : null,
              ]}>
              <Text>여자</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.emailInput}
              value={email}
              onChangeText={setEmail}
              placeholder="메일 아이디"
            />
            <Text style={styles.atSymbol}>@</Text>
            {selectedEmailOption === '직접입력' ? (
              <>
                <TextInput
                  style={styles.emailInput}
                  value={emailDomain}
                  onChangeText={setEmailDomain}
                  placeholder="메일 주소"
                />
                {/* 이 부분은 Picker가 렌더링 되는 부분입니다. */}
                <Picker
                  selectedValue={
                    emailOptions.includes(selectedEmailOption)
                      ? selectedEmailOption
                      : '직접입력'
                  }
                  onValueChange={itemValue => {
                    setSelectedEmailOption(itemValue);
                  }}
                  style={styles.emailOptionPicker}>
                  {emailOptions.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option} />
                  ))}
                  <Picker.Item label="직접입력" value="직접입력" />
                </Picker>
              </>
            ) : (
              <Picker
                selectedValue={selectedEmailOption}
                onValueChange={itemValue => {
                  setSelectedEmailOption(itemValue);
                }}
                style={styles.emailOptionPicker}>
                {emailOptions.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker>
            )}
          </View>
          <Button title="회원가입" onPress={loginUser} />
          <Button title="가입취소" onPress={handleCancel} />
          </ScrollView>
        </SafeAreaView>
      );
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 8,
      paddingHorizontal: 8,
    },
    phoneInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    phoneInput: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 8,
    },
    phoneSeparator: {
      marginHorizontal: 4,
    },
    radioOptions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      padding: 5,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    checkedOption: {
      borderColor: 'lightgray',
    },
    emailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    emailInput: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 8,
    },
    atSymbol: {
      paddingHorizontal: 8,
    },
    emailOptionPicker: {
      flex: 2,
    },
    passwordMessage: {
      marginBottom: 8,
      color: 'red',
    },
  
    nickMessage: {
      marginBottom: 8,
      color: 'red',
    }
  });

  export default Sign;