import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Button,
  TextInput,
  View,
  Alert,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {saveLoginInfoAll, loadUserInfoAll, logOut} from './Common';
const CreateBoard = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [boardid, setBoardId] = useState('');
  const [content, setContent] = useState('');
  const [mid, setMid] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [major, setMajor] = useState('');
  const [categorySub, setCategorySub] = useState('');
  const [response, setResponse] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); // 추가
  const [selectCategoryOption, setSelectCategoryOption] =
    useState('카테고리 선택');
  const [selectCategorySubOption, setSelectCategorySubOption] =
    useState('카테고리 선택');
  const categoryOptions = [
    '카테고리 선택',
    '학과게시판',
    '전체게시판',
    '자유게시판',
  ];
  const [categorySub_Options1, setCategorySub_Options1] = useState([
    '카테고리 선택',
  ]);
  const categorySub_Options2 = ['자격증', '동아리', '공지'];
  const categorySub_Options3 = ['익명게시판'];
  useEffect(() => {
    const fetchData = async () => {
      const savedData = await loadUserInfoAll();
      console.log(savedData);
      if (savedData) {
        setId(savedData.id);
        setMid(savedData.id);
        setName(savedData.name);
        setIsAdmin(savedData.isadmin);
        setIsLoggedIn(true); // 저장된 로그인 데이터가 있으면 로그인 상태로 설정
        setMajor(savedData.major);
        setCategorySub_Options1(savedData.major);
        console.log('게시글 생성 페이지 UserInfo :', savedData);
      }
    };

    fetchData();
  }, []);

  const handleBoardImage = async boardId => {
    const formData = new FormData();
    // const userInfo = await loadUserInfo();
    const member_id = id;
    formData.append('image', {
      uri: response?.assets[0]?.uri,
      type: response?.assets[0]?.type,
      name: response?.assets[0]?.fileName,
    });

    console.log('formData.uri', response?.assets[0]?.uri);
    console.log('formData.type', response?.assets[0]?.type);
    console.log('formData.name', response?.assets[0]?.fileName);
    console.log('boardid', boardId);
    console.log('formData.uri', formData.uri);
    console.log('formData.type', formData.type);
    console.log('formData.name', formData.name);
    try {
      const boardImageRes = await fetch(
        'https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/UploadBoardImage',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );
      console.log('boardImageRes : ', boardImageRes);
      if (boardImageRes.ok) {
        try {
          const data = {
            member_id: member_id,
            image_category: categorySub,
            image_name: response?.assets[0]?.fileName,
            board_id: boardId,
          };
          console.log('data', data);
          const toBoardDB = await fetch(
            'https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/UploadBoardImageToDB',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            },
          );
          try {
            const imageJson = await toBoardDB.json();
            if (imageJson.success) {
              console.log('db 삽입 완료');
              console.log('유저:', id);
              Alert.alert('게시글 생성 성공');
              navigation.pop();
            } else {
              console.log('데이터베이스 업로드 실패..');
              return;
            }
          } catch (error) {
            console.log(error, 'db 업로드 중 오류');
            return;
          }
        } catch (error) {
          console.log(error, 'db액세스 중 오류발생함');
        }
      } else {
        console.log('업로드 실패ㅠㅠ');
      }
    } catch (error) {
      console.log('이미지 업로드 오류', error);
      Alert.alert('이미지 업로드 실패');
      return;
    }
  };

  const createNewBoard = async () => {
    try {
      const res = await fetch(
        'https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/CreateBoard',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            board_title: title,
            board_content: content,
            board_mid: mid,
            board_category: category,
            board_subcategory: categorySub,
          }),
        },
      );

      const json = await res.json();
      if (json.success) {
        console.log('json : ', json);
        console.log('json.board.board_id', json.board.board_id);
        console.log('response:', response);
        if (response != null) {
          // setBoardId(json.board.board_id);
          console.log('json boardid :', json.board.board_id);
          console.log('게시글 생성 후 response : ', response);
          handleBoardImage(json.board.board_id);
        } else {
          Alert.alert('게시글 생성 성공');
          navigation.pop();
        }
      } else {
        console.log('게시글 생성 실패:', json.error);
        Alert.alert('게시글 생성 실패', json.error);
      }
    } catch (error) {
      console.log(error);
    } 
  };
  useEffect(() => {
    let updatedOptions = ['카테고리 선택'];
    let majorString;
    console.log('카테고리 선택 학과 : ', major);

    if (!updatedOptions.includes(major)) {
      updatedOptions.push(major);
      setCategorySub_Options1(major); // 상태를 업데이트합니다.
    }
    // console.log('respense 출력 : ', response); // response 출력
    console.log('board_id 출력 : ', boardid); //boardid 출력
    setCategorySub_Options1(updatedOptions); // 상태를 업데이트합니다.
  }, [major, category, response, boardid]);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        console.log(res);
        if (res.didCancel) {
          return;
        }
        console.log('setResponse');
        setResponse(res);
      },
    );
  };

  return (
    <ScrollView style={styles.scroll}>
      <SafeAreaView style={styles.block}>
      <View style={styles.selectBoard}>
      <Text style={styles.selectBoardText}>게시판 선택</Text>
      <Picker
            selectedValue={selectCategoryOption}
            onValueChange={categoryValue => {
              setSelectCategoryOption(categoryValue);
              if (categoryValue === selectCategoryOption) {
                setCategory('');
              } else {
                setCategory(categoryValue);
              }
            }}>
            {categoryOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectCategorySubOption}
            onValueChange={categorySubValue => {
              setSelectCategorySubOption(categorySubValue);
              if (categorySubValue === selectCategorySubOption) {
                setCategorySub('');
              } else {
                setCategorySub(categorySubValue);
              }
            }}>
            {category === '학과게시판' &&
              categorySub_Options1.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            {category === '전체게시판' &&
              categorySub_Options2.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            {category === '자유게시판' &&
              categorySub_Options3.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
          </Picker>
      </View>

        <View>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={'제목'}
          />
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder={'내용'}
            multiline
          />
          <TextInput
            value={mid}
            onChangeText={setMid}
            placeholder={'작성자 ID'}
            editable={false}
          />
          <Pressable onPress={onSelectImage}>
            <Image
              style={styles.imageArea}
              source={
                response
                  ? {uri: response?.assets[0]?.uri}
                  : {
                      uri: 'https://storage.googleapis.com/polintech_image/AppImage/user.png',
                    }
              }
            />
          </Pressable>
          

          <Button title={'게시글 생성'} onPress={createNewBoard} />
        </View>
        <View style={styles.confirmArea}>
          
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 30,
    color: '#000000',
  },
  scroll: {
    flex:1,
    width: '100%',
    height: '100%',
    backgroundColor:'#ffffff',
  },
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  imageArea: {
    marginTop: 20,
    backgroundColor: '#cdcdcd',
    borderRadius: 10,
    width: 256,
    height: 256,
  },
  form: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  text1: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  },
  overlayTitle: {
    paddingVertical: 15,
    fontSize: 20,
  },
  overlayText: {
    paddingHorizontal: 20,
    fontSize: 12,
  },
  overlayBackground: {
    width: Dimensions.get('window').width, // 화면 너비
    height: Dimensions.get('window').height,
    position: 'absolute',
    marginTop: -24,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 어두운 배경
  },
  centeredBox: {
    position: 'absolute',
    top: '50%', // 세로 중앙
    left: '50%', // 가로 중앙
    transform: [{translateX: -150}, {translateY: -150}],
  },
  // 추가: 박스 스타일
  overlayBox: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  certButton: {
    backgroundColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 8, //버튼 세로
    paddingHorizontal: 50, //버튼 가로
    marginTop: 20,
  },
  certButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default CreateBoard;