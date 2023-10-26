import React, { useEffect,useState } from 'react';
import {Alert,TouchableOpacity,Dimensions,Image,TextInput,Pressable,Platform,SafeAreaView,Text, StyleSheet,Button,View} from 'react-native';
import { saveLoginInfo, loadUserInfo, logOut } from './Common';
import {launchImageLibrary} from 'react-native-image-picker';


const Certificate=({navigation})=>{
    const [id,setId]=useState('');
    const [name, setName]=useState('');
    const [response,setResponse]=useState(null);
    const [showOverlay, setShowOverlay] = useState(false); // 추가

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

    const handleCertificate=async()=>{
      const formData=new FormData();
      const userInfo=await loadUserInfo();
      const member_id=userInfo.id;
      formData.append('image',{
        uri:response?.assets[0]?.uri,
        type:response?.assets[0]?.type,
        name:response?.assets[0]?.fileName,
      });
      console.log(formData);
      console.log(formData.image)
      try{
        const res=await fetch('http://10.0.2.2:3000/UploadCertificate',{
          method:'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body:formData,
        });
        if(res.ok){
          try{
            const data={
              member_id:userInfo.id,
              image_category:'재학생인증',
              image_name:response?.assets[0]?.fileName,
            }
            const toDB=await fetch('http://10.0.2.2:3000/UploadToDB',{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify(data),
            });
            const json=await toDB.json();
            if(json.success){
              console.log('데이터베이스에 업로드됨.');
            }else{
              console.log('데이터베이스 업로드 실패..');
              return;
            }
          }catch(error){
            console.log('db액세스 중 오류발생함');
          }
          Alert.alert('재학생 인증 신청 완료');
          navigation.navigate('WaitCert');
        }else{
          console.log('업로드 실패ㅠㅠ');
        }

      }catch(error){
        console.log('이미지 업로드 오류:',json)
        Alert.alert('이미지 업로드 실패');
        return;
      }
    };
    const btnLogout= async ()=>{
        await logOut();
        console.log('로그아웃 눌렀어용');
        navigation.navigate('LoginScreen');
    }
    const overlayBox = (
      <View style={styles.overlayBox}>
        <Text style={styles.overlayTitle}>
          재학생 인증이란?
        </Text>
        <Text style={styles.overlayText}>
            폴인텍의 회원으로 활동하기 위해서는 반드시 재학생 인증이 필요합니다.{'\n'}{'\n'}
            재학증명서를 출력해 촬영하거나 학생정보시스템 접속 후 학생정보란을 캡쳐바랍니다.{'\n'}{'\n'}
            필수정보를 제외한 정보는 블라인드 처리가 필요합니다.
            {'\n'}{'\n'}
            필수 정보 : 이름, 학과, 학번{'\n'}{'\n'}
            문의 사항은 카카오톡 채널 @polintech 로 접수 바랍니다.
            {'\n'}
        </Text>
      </View>
    );

    return(
      //재학증명서에 있는 정보중 학과(세부전공제외) 학번, 이름만 담기로 결정합니다.
        <SafeAreaView style={styles.block}>
          <View>
            <Text style={styles.title}>재학생 인증 신청</Text>
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
              <Text style={styles.text1}>재학생 인증이 무엇인가요?</Text>
            </Pressable>
          </View>
          <TouchableOpacity style={styles.certButton} onPress={handleCertificate}>
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
    );
};
const styles=StyleSheet.create({
  title:{
    marginTop:50,
    fontSize:30,
    color:'#000000',
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
    height:256,
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
  },
  certButtonText:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Certificate;