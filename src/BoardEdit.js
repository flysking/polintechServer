import React, {useState, useEffect} from 'react';
import {
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
import {launchImageLibrary} from 'react-native-image-picker';
const BoardEdit = ({route, navigation}) => {
  const boardId = route.params.board_id;
  const oTitle = route.params.board_title;
  const oContent = route.params.board_content;
  const image_name = route.params.image_name; //이미지 파일 이름
  const isImage = route.params.isImage; //기존에 이미지 여부
  const member_id = route.params.member_id;
  const category = route.params.category;
  // const otrigger = route.params;
  const {setTrigger} = route.params;
  const [title, setTitle] = useState(oTitle);
  const [content, setContent] = useState(oContent);
  const [response, setResponse] = useState(null);
  const updateBoard = async () => {
    try {
      const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/EditBoard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board_title: title,
          board_content: content,
          board_id: boardId,
        }),
      });

      const json = await response.json();

      if (json.success) {
        if (response == null) {
          console.log('게시글 수정(이미지x)');
          Alert.alert('게시글 수정 성공');
          setTrigger(prev => !prev); // trigger 상태 변경
          navigation.goBack();
        } else {
          console.log('게시글 수정(이미지o)');
          handleBoardImage(boardId);
        }
      } else {
        console.log('게시글 수정 실패:', json.error);
        Alert.alert('게시글 수정 실패', json.error);
        console.log('게시글 제목', title);
        console.log('게시글 내용', content);
        console.log('게시글 id', boardId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBoardImage = async boardId => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: response?.assets[0]?.uri,
        type: response?.assets[0]?.type,
        name: response?.assets[0]?.fileName,
      });

      // UploadBoardImage 실행
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

      if (!boardImageRes.ok) {
        throw new Error('Image upload to server failed.');
      }

      const data = {
        member_id: member_id,
        image_category: category,
        image_name: response?.assets[0]?.fileName,
        board_id: boardId,
      };

      // isImage에 따라 UpdateBoardImageToDB 또는 UploadBoardImageToDB를 호출
      const endPoint = isImage
        ? 'UpdateBoardImageToDB'
        : 'UploadBoardImageToDB';
      const toBoardDB = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/${endPoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const imageJson = await toBoardDB.json();
      if (!imageJson.success) {
        throw new Error('Database operation failed.');
      }

      setTrigger(prev => !prev);
      Alert.alert('게시글 수정 성공');
      navigation.goBack();
    } catch (error) {
      console.error('Error in handleBoardImage:', error.message);
      Alert.alert(error.message);
    }
  };

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
  useEffect(() => {
    console.log('respense 출력 (너무 길어서 생략) '); // response 출력
    console.log('board_id 출력 : ', boardId); //boardid 출력
  }, [title, content, response, boardId]);
  return (
    <View style={{padding: 20}}>
      <Pressable onPress={onSelectImage}>
        {isImage ? (
          <Image
            style={styles.imageArea}
            source={
              response
                ? {uri: response?.assets[0]?.uri}
                : {
                    uri: `https://storage.googleapis.com/polintech_image/ServerImage/${image_name}`,
                  }
            }
          />
        ) : (
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
        )}
      </Pressable>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={oTitle}
        style={{borderWidth: 1, marginBottom: 10, padding: 5}}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder={oContent}
        multiline
        numberOfLines={5}
        style={{borderWidth: 1, marginBottom: 10, padding: 5}}
      />
      <Button title="게시글 수정" onPress={updateBoard} />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 30,
    color: '#000000',
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
export default BoardEdit;
