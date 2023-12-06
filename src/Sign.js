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
  //const [existingUsers, setExistingUsers] = useState([]); //학번 중복 검사
  const [selectedEmailOption, setSelectedEmailOption] = useState('naver.com'); // 이메일 선택 옵션
  const emailOptions = ['직접입력', 'naver.com', 'gmail.com', 'daum.net']; // 이메일 옵션 목록
  const [grade, setGrade] = useState(null); //학년
  const [authCheck, setAuthCheck] = useState(''); //인증번호 확인
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/; //비밀번호 정규식 숫자, 영문 대,소문자, 특수문자 포함 6~20자 이내

    useEffect(() => {
        if (id === '') {
          setIdMessage('');
        } else {
          checkIfIdExists(id);
        }
      }, [id]);

      const checkIfIdExists = async (id) => {
        console.log('체크 아이디 호출');
        try {
          const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/findId', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            setIdMessage('이미 존재하는 학번입니다.');
          } else {
            setIdMessage('사용 가능한 학번입니다.');
          }
        } catch (error) {
          console.error('Error checking ID:', error);
        }
      };
    
    
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
        //현재 DTO값으로 인해 JSONParse에러 발생, 
        //학과때문에 발생하는것으로 추정, 2번 회원가입 클릭하면 되긴함
        //dto 클래스 수정, sql문 수정 필요함.
        
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
      <SafeAreaView style={{backgroundColor:'#ffffff'}}>
      <ScrollView>
      <Text style={styles.headerText}>회원가입</Text>
      <Text style={styles.labelText}>학번</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        placeholder="학번"
      />
      <Text style={{marginLeft:20,}}>{idMessage}</Text>
      <Text style={styles.labelText}>비밀번호</Text>
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
      <Text style={styles.labelText}>비밀번호 확인</Text>
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
      <Text style={styles.labelText}>이름</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="이름"
      />
      <Text style={styles.labelText}>닉네임</Text>
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
      <Text style={styles.labelText}>영문 이름</Text>
      <TextInput
        style={styles.input}
        value={engname}
        onChangeText={setEngname}
        placeholder="영문 이름"
      />
      <View style={styles.pickerContainer}>
      <View style={styles.majorPickerWrapper}>
      <Picker
        selectedValue={major}
        onValueChange={itemValue => setMajor(itemValue)}
        style={styles.picker}
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
      </View>
      <View style={styles.gradePickerWrapper}>
      <Picker
        selectedValue={grade}
        onValueChange={itemValue => setGrade(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="학년" value="" />
        <Picker.Item label="1학년" value="1" />
        <Picker.Item label="2학년" value="2" />
        </Picker>
      </View>
      </View>
      <Text style={styles.labelText}>생년월일</Text>
      <TextInput
        style={styles.input}
        value={birth}
        onChangeText={setBirth}
        placeholder="생년월일 (6자리)"
      />
      <Text style={styles.labelText}>성별</Text>
      <View style={styles.radioOptions}>
        <TouchableOpacity
          onPress={() => setGender('남자')}
          style={[
            styles.radioOption,
            gender === '남자' ? styles.checkedOption : null,
          ]}>
          <Text style={gender === '남자' ? styles.checkedOption : null}>남자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender('여자')}
          style={[
            styles.radioOption,
            gender === '여자' ? styles.checkedOption : null,
          ]}>
          <Text style={gender === '여자' ? styles.checkedOption : null}>여자</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.labelText}>이메일</Text>
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
        <TouchableOpacity style={styles.button} onPress={emailAuth}>
        <Text style={{ color: 'white' }}>이메일 인증</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.emailAuthContainer}>
        <TextInput
          style={styles.emailAuthInput}
          value={authCheck}
          onChangeText={setAuthCheck}
          placeholder="인증번호"
        />
        <TouchableOpacity style={styles.button} onPress={handleAuthCheck}>
        <Text style={{ color: 'white' }}> 확인 </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={signuser}>
          <Text style={{ color: 'white' }}>회원가입</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}>
          <Text style={{ color: 'white' }}>가입취소</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
 //상단헤더 회원가입 문구
 headerText: {
  fontSize: 18,
  fontWeight: 'bold',
  backgroundColor: '#003497',
  color: 'white',
  padding: 13,
  textAlign: 'center',
},
  //입력칸 위 문구 스타일
  labelText: {
  fontSize: 16,
  fontWeight: 'bold',
  marginTop: 25,
  marginLeft: 20,
  marginBottom: 2, // input 스타일과 일치하도록 조절
  color: '#003497',
},
//입력칸
input: {
  fontSize: 12,
  height: 35,
  borderBottomColor: '#003497',
  borderBottomWidth: 0.9,
  marginTop: -10,
  marginLeft: 20,
  marginRight: 20,
  paddingHorizontal: 2,
  paddingBottom: 2,
},
//아이디 입력칸, 비밀번호 텍스트 사이 간격
idMessageText: {
margin: -10, // 텍스트 주변의 여백 제거
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
  marginLeft: 15,
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
  color: '#132444',
  fontWeight: 'bold',
},
emailContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
  marginLeft: 15,
  marginRight: 15,
},
emailInput: {
  flex: 1,
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  paddingHorizontal: 8,
  marginRight: -3,
},
atSymbol: {
  paddingHorizontal: 8,
},
emailOptionPicker: {
  flex: 2,
},
passwordMessage: {
  color: 'red',
  marginLeft:20,
  
},
nickMessage: {
  color: 'red',
  marginLeft:20,
},
emailAuthContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 25,
},
emailAuthInput: {
  flex: 0.7,
  height: 40,
  borderColor: 'gray',
  borderBottomWidth: 1,
  paddingHorizontal: 8,
  marginLeft: 15,
  marginRight: 10,
},
// 이메일 인증, 확인 버튼 스타일
button: {
  backgroundColor: '#003497', // 버튼 색상
  borderRadius: 5, // 테두리 둥글기 정도
  padding: 9,
},
// 회원가입, 가입취소 버튼 나란히 정렬
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 100,
  marginTop: 10,
  marginBottom: 20,
},

//회원가입 버튼
signupButton: {
  backgroundColor: '#003497', // 원하는 회원가입 버튼 색상
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
},
//가입취소 버튼
cancelButton: {
  backgroundColor: '#A9B8D4', // 원하는 가입취소 버튼 색상
  padding: 9,
  paddingLeft: 20,
  paddingRight: 20,
},
//학과, 학년 피커
pickerContainer: {
  flexDirection: 'row', // 부모 컨테이너의 방향을 '가로'로 설정
  justifyContent: 'space-between', // 선택사항: 피커 간의 간격을 조절하려면 추가
  marginHorizontal: 3, // 선택사항: 필요한 경우 여백 추가
  marginTop: -10,
  marginBottom: -10,
},
//학과
majorPickerWrapper: {
  flex: 2, // 학과 피커의 flex 값을 조절하여 넓이를 조절
  marginRight: 5,
},
//학년
gradePickerWrapper: {
  flex: 1, // 학년 피커의 flex 값을 조절하여 넓이를 조절
},
picker: {
  height: 50, // 필요에 따라 높이 조절
  width: '100%', // 부모의 전체 너비를 차지하도록 설정
},
  });

  export default Sign;