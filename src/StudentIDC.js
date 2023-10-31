import React, { useEffect,useState } from 'react';
import {ScrollView,Alert,TouchableOpacity,Dimensions,Image,TextInput,Pressable,Platform,SafeAreaView,Text, StyleSheet,Button,View} from 'react-native';
import  {saveLoginInfo, loadUserInfo, logOut } from './Common';
import {launchImageLibrary} from 'react-native-image-picker';

const StudentIDC=({navigation,route})=>{
    const {userInfo}=route.params;
    const [id,setId]=useState(userInfo.id);
    const [name, setName]=useState(userInfo.name);
    const [response,setResponse]=useState(null);
    const [showOverlay, setShowOverlay] = useState(false); // 추가
    const [idcInfo,setIdcInfo]=useState([]);
    const [haveIdc,setHaveIdc]=useState(null);

    useEffect(()=>{
      const getIdc=async()=>{
        const member_id=id;
        console.log(member_id,'님 학생증 조회');
        try{
            const res=await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/SearchIdc/${member_id}`);
            const data=await res.json();
            if (data.success){
              console.log('res 찾았음',data.idc);
              setIdcInfo(data.idc);
              setHaveIdc(1);
            }else if(data.error){
              console.log('학생증 발급 필요함');
              Alert.alert('학생증이 없습니다.\n\n학생증을 발급받아주세요!')
              setHaveIdc(0);
            }
        }catch(error){
          console.error('학생증 조회 중 오류 발생',error);
          return;
        }
      };
      getIdc();
    },[]);

    const onSelectImage=()=>{
      launchImageLibrary({
        mediaType:'photo',
        maxWidth:512,
        maxHeight:512,
        includeBase64:Platform.OS==='android',
      },
      (res)=>{
        console.log(res);
        if(res.didCancel){
          return;
        }
        setResponse(res);
      },
      );
    };

    const handleIdc=async()=>{
      const formData=new FormData();
      formData.append('image',{
        uri:response?.assets[0]?.uri,
        type:response?.assets[0]?.type,
        name:response?.assets[0]?.fileName,
      });
      formData.append('member_id',id);
      console.log(formData);
      console.log(formData.image);
      try{
        const res=await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/UploadIdcImage',{
          method:'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body:formData,
        });
        if(res.ok){
          try{
            const data={
              member_id:id,
              image_category:'학생증',
              image_name:response?.assets[0]?.fileName,
            }
            const toDB=await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/UploadToDB',{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify(data),
            });
            try{
              const json=await toDB.json();
              if(json.success){
                console.log('db 삽입 완료');
                console.log('유저:',id);
                setHaveIdc(1);
              }else{
                console.log('데이터베이스 업로드 실패..');
                return;
              }
            }catch(error){
              console.log(error,'db 업로드 중 오류');
              return;
            }
          }catch(error){
            console.log(error,'db액세스 중 오류발생함');
          }
          Alert.alert('학생증 신청 완료');
          set
        }else{
          console.log('업로드 실패ㅠㅠ');
        }

      }catch(error){
        console.log('이미지 업로드 오류:',json)
        Alert.alert('이미지 업로드 실패');
        return;
      }
    };
    const overlayBox = (
      <View style={styles.overlayBox}>
        <Text style={styles.overlayTitle}>
          학생증 이미지 양식
        </Text>
        <Text style={styles.overlayText}>
            학생증으로 사용될 이미지를 선택한 후, 본인의 학과, 이름 정보가 일치한지
            확인해주세요.{'\n'}{'\n'}
            학생증에 사용될 이미지는 3:4 비율로 자동 조정됩니다.{'\n'}
            단정한 복장 착용 후 촬영 바랍니다.
            {'\n'}{'\n'}

            문의 사항은 카카오톡 채널 @polintech 로 접수 바랍니다.
            {'\n'}
        </Text>
      </View>
    );

    return(
      //재학증명서에 있는 정보중 학과(세부전공제외) 학번, 이름만 담기로 결정합니다.
        <ScrollView style={styles.scroll}>
          {haveIdc === 0 ? (
            <SafeAreaView style={styles.block}>
            <View>
              <Text style={styles.title}>모바일 학생증</Text>
            </View>
            <Pressable onPress={onSelectImage}>
              <Image 
                style={styles.imageArea}
                source={
                  response?{uri:response?.assets[0]?.uri}:
                  { uri:'https://storage.googleapis.com/polintech_image/AppImage/user.png'}}
              />
            </Pressable>
            <View style={styles.form}>
              <TextInput 
                style={styles.input}
                placeholder='학번을 입력해주세요'
                onChangeText={setId}
                value={id}
              />
              <TextInput 
                style={styles.input}
                placeholder='이름을 입력해주세요'
                onChangeText={setName}
                value={name}
                />
              <Pressable onPress={()=>setShowOverlay(true)}>
                <Text style={styles.text1}>학생증 신청 양식</Text>
              </Pressable>
            </View>
            <TouchableOpacity style={styles.certButton} onPress={handleIdc}>
              <Text style={styles.certButtonText}>재학생 인증 신청</Text>
            </TouchableOpacity>

          {showOverlay && (
            <Pressable style={styles.overlayBackground} onPress={()=>{setShowOverlay(false)}}>
            <View style={styles.centeredBox}>
              {overlayBox}
            </View>
          </Pressable>
        )}
        </SafeAreaView>
          ) : haveIdc === 1 ? (
            <SafeAreaView style={styles.block}>
              <Text>
                학생증 발급 대기 상태
              </Text>
            </SafeAreaView>
          ) : (
            <SafeAreaView style={styles.block}>
              <Text>
                학생증 발급 완료된 유저
              </Text>
            </SafeAreaView>
          )}
      </ScrollView>
    );
};
const styles=StyleSheet.create({
  title:{
    fontSize:30,
    color:'#000000',
  },
  scroll:{
    display:'flex',
    width:'100%',
    height:'100%',
  },
  block:{
    alignItems:'center',
    marginTop:24,
    paddingHorizontal:16,
    width:'100%',
  },
  imageArea:{
    marginTop:20,
    backgroundColor:'#cdcdcd',
    borderRadius:10,
    width:256,
    height:342,
  },
  form:{
    marginTop:16,
    width:'100%',
    alignItems:'center',
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  text1:{
    marginTop:10,
    fontSize:12,
    color:'gray',
  },
  overlayTitle:{
    paddingVertical:15,
    fontSize:20,
  },
  overlayText: {
    paddingHorizontal:20,
    fontSize: 12,
  },
  overlayBackground: {
    width: Dimensions.get('window').width, // 화면 너비
    height: Dimensions.get('window').height,
    position: 'absolute',
    marginTop:-24,
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
    transform: [{ translateX: -150 }, { translateY: -150 }], 
  },
  // 추가: 박스 스타일
  overlayBox: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  certButton:{
    backgroundColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 8,  //버튼 세로
    paddingHorizontal: 50,  //버튼 가로
    marginTop: 20, 
    marginBottom:30,
  },
  certButtonText:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default StudentIDC;