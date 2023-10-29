import React, {useState,useEffect} from 'react';
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
import LoginScreen from './LoginScreen';

function Sign({navigation}){
  const [id, setId] = useState(''); //학번
  const [idMessage, setIdMessage] = useState(''); //중복 확인 메시지
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
  const [existingUsers, setExistingUsers] = useState([]); //학번 중복 검사
  const [selectedEmailOption, setSelectedEmailOption] = useState('naver.com'); // 이메일 선택 옵션
  const emailOptions = ['직접입력', 'naver.com', 'gmail.com', 'daum.net']; // 이메일 옵션 목록
  const [grade, setGrade] = useState(null); //학년
  const [authCheck, setAuthCheck] = useState(''); //인증번호 확인
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/; //비밀번호 정규식 숫자, 영문 대,소문자, 특수문자 포함 6~20자 이내
    const signuser = async () => {
      try {
        const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/Sign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            pw: pw,
            name: name,
            nickname: nickname,
            engname: engname,
            email: `${email}@${emailDomain}`,
            major: major,
            birth: birth,
            gender: gender,
            grade: grade,
          }),
        });
        const json = await response.json();
  
        console.log('서버로부터의 응답 :', json);
  
        if (id === '') {
          Alert.alert('아이디를 입력은 필수입니다!');
        } else if (!passwordRegex.test(pw)) {
          Alert.alert('비밀번호 입력은 필수입니다!');
        } else if (pw === '') {
          Alert.alert('비밀번호 확인은 필수입니다!');
        } else if (name === '') {
          Alert.alert('이름 입력은 필수입니다!');
        } else if (nickname === '') {
          Alert.alert('닉네임 입력은 필수입니다!');
        } else if (engname === '') {
          Alert.alert('영어 이름 입력은 필수입니다!');
        } else if (major === '') {
          Alert.alert('학과 입력은 필수입니다!');
        } else if (birth === '') {
          Alert.alert('생년월일 입력은 필수입니다!');
        } else if (gender === '') {
          Alert.alert('성별 입력은 필수입니다!');
        } else if (email === '') {
          Alert.alert('이메일 입력은 필수입니다!');
        } else if (authCheck === '') {
          Alert.alert('인증번호를 입력해주세요!')
        } else if (grade === '') {
          Alert.alert('학년을 선택해주세요');
        } else {
          console.log('회원가입 완료했어용')
          navigation.navigate(LoginScreen);
        }
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      if (id === '') {
        setIdMessage('');
      } else {
        const isIdTaken = existingUsers.some(user => user.id === id);
        if (isIdTaken) {
          setIdMessage('이미 존재하는 학번입니다.');
        } else {
          setIdMessage('사용 가능한 학번입니다.');
        }
      }
    }, [id]);
  
    const handleCancel = () => {
      navigation.navigate('LoginScreen');
      
    };
    const emailAuth = async () => {
      try {
  
        const fullEmail = `${email}@${emailDomain}`;
  
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
        } else {
          Alert.alert('인증 코드 전송 실패');
        }
      } catch (error) {
        console.error('인증 코드 전송 실패:', error);
      }
    };
    const handleAuthCheck = async () => {
      try {
  
        const auth = authCheck;
  
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
          Alert.alert('인증 코드가 확인되었습니다');
        } else {
          Alert.alert('인증 코드가 일치하지 않습니다.');
        }
      } catch (error) {
        console.error('인증 실패:', error);
      }
    };
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
      <Picker
        selectedValue={major}
        onValueChange={itemValue => setMajor(itemValue)}
      >
        <Picker.Item label="학과를 선택해주세요" value="" />
        <Picker.Item label="AI융합소프트웨어" value="1" />
        <Picker.Item label="AI정보통신" value="2" />
        <Picker.Item label="시스템금형" value="3" />
        <Picker.Item label="지능기계시스템" value="4" />
        <Picker.Item label="산업설비자동화" value="5" />
        <Picker.Item label="스마트전기자동차" value="6" />
        <Picker.Item label="전기에너지시스템" value="7" />
        <Picker.Item label="메카트로닉스" value="8" />
        <Picker.Item label="방송미디어" value="9" />
        <Picker.Item label="산업디자인" value="10" />
        <Picker.Item label="스마트재료" value="11" />
        <Picker.Item label="건축설계" value="12" />
        <Picker.Item label="디지털융합" value="13" />
      </Picker>
      <Picker
        selectedValue={grade}
        onValueChange={itemValue => setGrade(itemValue)}
      >
        <Picker.Item label="학년을 선택해주세요" value="" />
        <Picker.Item label="1학년" value="1" />
        <Picker.Item label="2학년" value="2" />
      </Picker>
      <TextInput
        style={styles.input}
        value={birth}
        onChangeText={setBirth}
        placeholder="생년월일 (6자리)"
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
            <Picker
              selectedValue={selectedEmailOption}
              onValueChange={itemValue => {
                setSelectedEmailOption(itemValue);
                if (itemValue === selectedEmailOption) {
                  setEmailDomain(''); 
                } else {
                  setEmailDomain(itemValue);
                }
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
            selectedValue={emailDomain}
            onValueChange={itemValue => {
              setSelectedEmailOption(itemValue);
              if (itemValue === '직접입력') {
                setEmailDomain(''); 
              } else {
                setEmailDomain(itemValue);
              }
            }}
            style={styles.emailOptionPicker}>
            {emailOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        )}
        <Button title="이메일 인증" onPress={emailAuth} />
      </View>
      <View style={styles.emailAuthContainer}>
        <TextInput
          style={styles.emailAuthInput}
          value={authCheck}
          onChangeText={setAuthCheck}
          placeholder="인증번호"
        />
        <Button title="  확인  " onPress={handleAuthCheck} />
      </View>
      
      <Button title="회원가입" onPress={signuser} />
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
  },
  emailAuthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emailAuthInput: {
    flex: 0.7,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  });

  export default Sign;