import React, {useState, useEffect, useLayoutEffect} from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import { loadUserInfoAll, } from './Common';
const CreateBoard = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [boardid, setBoardId] = useState('');
  const [content, setContent] = useState('');
  const [mid, setMid] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(null);
  const [major, setMajor] = useState('');
  const [categorySub, setCategorySub] = useState('');
  const [response, setResponse] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); // 추가
  const [selectCategoryOption, setSelectCategoryOption] =
    useState('카테고리 선택');
  const [selectCategorySubOption, setSelectCategorySubOption] =
    useState('카테고리 선택');
  //카테고리와 서브카테고리를 저장하는 배열들을 선언하였습니다.
  const categoryOptions = [
    '카테고리 선택',
    '학과게시판',
    '전체게시판',
    '자유게시판',
  ];
  const categoryAdmin = [
    '학사일정'
  ];
  const categorySubNotice=[
    '공지',
  ];
  const [categorySub_Options1, setCategorySub_Options1] = useState([
    '카테고리 선택',
  ]);
  //작성자 isAdmin이 1이면 공지가 추가되도록.
  const categorySub_Options2 = ['자격증', '동아리','질문'];
  const categorySub_Options3 = ['익명게시판'];
  const categorySub_Options4=['학사일정','식단표', '학과공지'];
  useEffect(() => {
    const fetchData = async () => {
      const savedData = await loadUserInfoAll();
      console.log(savedData);
      if (savedData) {
        setId(savedData.id);
        setMid(savedData.id);
        setName(savedData.name);
        setIsAdmin(savedData.isAdmin);
        setMajor(savedData.major);
        setCategorySub_Options1(savedData.major);
        console.log('게시글 생성 페이지 UserInfo :', savedData);
      }
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    //상단 탭 바 디자인을 변경하기 위해 사용합니다.
    navigation.setOptions({
        title:'게시글 작성',
        headerStyle: {
            backgroundColor: '#003497',
        },
        headerTitleStyle:{
          color:'#ffffff',
        },
        headerTintColor: '#ffffff',
        
    });
}, [navigation]);

  const handleBoardImage = async boardId => {
    /*이미지가 존재할 경우 실행되는 게시글 생성 함수
    구글 클라우드에 이미지 파일을 업로드한후 
    DB에 이미지 파일명과 게시글을 추가한다. */
    const formData = new FormData();
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
          navigation.goBack();
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
     //학과 카테고리를 선택시 로그인한 유저의 학과 정보를 불러와서 카테고리에 추가합니다
    let updatedOptions = ['카테고리 선택'];
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
      <SafeAreaView style={styles.container}>
        <View style={styles.selectBoard}>
          <Text style={styles.titleText}>게시판</Text>
          <View style={styles.categoryWrapper}>
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
              {/* isAdmin값에 따라 학사일정 게시판이 피커에 추가되도록 합니다. */}
              {categoryOptions.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} style={styles.pickerItem} />
              ))}
              {isAdmin===1 && 
                categoryAdmin.map((option,index)=>(
                <Picker.Item key={index} label={option} value={option} style={styles.pickerItem} />
              ))}
            </Picker>
          </View>
          {/*<Text style={//styles.selectBoardText}>게시판 선택</Text>*/}
          <View style={styles.subcategoryWrapper}>
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
              {/*isAdmin이 1일 경우 공지 글을 작성할 수 있습니다. */}
              {category === '학과게시판' &&
                categorySub_Options1.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} style={styles.pickerItem} />
                ))}
              {category === '전체게시판' &&
                categorySub_Options2.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} style={styles.pickerItem} />
                ))}
              {category === '자유게시판' &&
                categorySub_Options3.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} style={styles.pickerItem} />
                ))}
              {category ==='학사일정' && 
                categorySub_Options4.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} style={styles.pickerItem} />
                ))}
              {isAdmin===1 &&
                categorySubNotice.map((option, index)=>(
                  <Picker.Item key={index} label={option} value={option} style={styles.pickerItem} />
                ))
              }
            </Picker>
          </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>제목</Text>
        <TextInput
          style={styles.titleTextInput}
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="제목을 입력하세요."
          placeholderTextColor="#8B9DBF"
        />
      </View>
      <ScrollView style={{marginBottom:50,}}>
        <TextInput
            style={styles.mainTextInput}
            value={content}
            onChangeText={(text) => setContent(text)}
            placeholder="내용을 입력하세요."
            placeholderTextColor="#8B9DBF"
            multiline
          />
      </ScrollView>
      {/*글 작성, 이미지 등록 폼입니다 */}  
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{position:'absolute',bottom:0, flex: 1, justifyContent: 'center', alignItems: 'center',flexDirection:'row'}}
        >
          {response ? (
          <View style={{position:'absolute',bottom:0,marginBottom:50,backgroundColor:'rgba(0, 0, 0, 0.1)', width:'100%',height:75,}}>
          <Image
            style={styles.imageArea}
            source={
              {uri: response?.assets[0]?.uri}
            }
          />
          </View>
          ) : null}
          <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor:'gray', padding: 10, width: '100%'}}>
            <TouchableOpacity onPress={onSelectImage}>
              <Icon name="image" color={'#ffffff'} size={25}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={createNewBoard}>
              <Image source={require('../image/save.png')} style={{width:60,height:30,}} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    position:'absolute',
    right:0,
    bottom:0,
    marginRight:10,
    backgroundColor: '#cdcdcd',
    borderRadius: 10,
    width:75,
    height:75,
  },
  form: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '60%',
    height: '100%',
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

  //추가함
    container: {
      overflow:'scroll',
      flex: 1,
      backgroundColor: 'white',
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // 오른쪽 정렬을 위해 추가
      padding: 10,
      borderWidth: 1,         // 테두리 두께
      borderColor: '#003497',    // 테두리 색상
      borderTopWidth: 0,     // 상단 테두리 두께 (0으로 설정하여 없애기)
      borderLeftWidth: 0,    // 좌측 테두리 두께 (0으로 설정하여 없애기)
      borderRightWidth: 0,   // 우측 테두리 두께 (0으로 설정하여 없애기)
    },
    text: {
      marginLeft: -170, // 왼쪽 마진(게시글 작성)
      fontSize: 21,
      fontWeight: 'bold',
      color: '#003497',
    },
    selectBoard: {
      flexDirection: 'row', // 가로 정렬을 위해 추가
      width:'100%',
      height: 50, // topBar와 동일한 높이로 설정
      justifyContent: 'space-between', // 가로 정렬을 위해 추가
      alignItems: 'center',
      paddingLeft: 20, // 왼쪽에 여백 추가
      // alignItems: 'center',
      borderWidth: 1,          // 테두리 두께
      borderColor: '#003497',  // 테두리 색상
      borderTopWidth: 0,     // 상단 테두리 두께 (0으로 설정하여 없애기)
      borderLeftWidth: 0,    // 좌측 테두리 두께 (0으로 설정하여 없애기)
      borderRightWidth: 0,   // 우측 테두리 두께 (0으로 설정하여 없애기)
    },
    categoryWrapper:{
      flex:5,
    },
    subcategoryWrapper:{
      flex:5,
    },
    selectBoardText: {
      fontSize: 16,
      marginRight: 10,
      color: '#003497',
      marginRight: 10,
    },
    selectBoardButton: {
      width:'100%',
      fontSize:6,
    },
    selectBoardImage: {
      width: 25,
      height: 25,
    },
    pickerItem:{
      fontSize:13, 
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20, // 왼쪽에 여백 추가
      borderWidth: 1,         // 테두리 두께
      borderColor: '#003497',  // 테두리 색상
      borderTopWidth: 0,     // 상단 테두리 두께 (0으로 설정하여 없애기)
      borderLeftWidth: 0,    // 좌측 테두리 두께 (0으로 설정하여 없애기)
      borderRightWidth: 0,   // 우측 테두리 두께 (0으로 설정하여 없애기)
    },
    titleText: {
      color: '#003497',
      fontSize: 16,
      marginRight: 10, // 제목 텍스트와 입력란 사이에 간격 추가
    },
    titleTextInput: {
      flex: 1, // 입력란이 화면 전체 가로로 확장
      paddingTop: 12,
      paddingLeft: 1,
      color: '#313337',
    },
    mainTextInput: {
      paddingLeft: 20,
      color: '#313337',
      height:'100%',
    },
    imageButton: {
      padding: 1,
    },
    image: {
      width: 25,
      height: 25,
    },
    saveImage: {
      width: 60,
      height: 30,
    },
});
export default CreateBoard;