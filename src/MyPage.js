import React, { useState, useEffect, useLayoutEffect } from 'react';
import { KeyboardAvoidingView,Image, View, Text, TouchableOpacity, Button, StyleSheet,Dimensions,TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadUserInfo, logOut } from './Common';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
//npm install react-native-linear-gradien 그라데이션 패키지
const MyPage = ({ navigation,route }) => {
  const {userInfo}=route.params;
  const [nickname, setNickname] = useState('');
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');

  //정보 업데이트에 사용할 새로운 유저 정보들을 저장할 변수입니다.
  const [newNickname,setNewNickname]=useState('');
  const [newEngname,setNewEngname]=useState('');
  const [newEmail,setNewEmail]=useState('');
  const [newProfile,setNewProfile]=useState('');


  const [randomMessageIndex, setRandomMessageIndex] = useState(0);
  const [randomMessage, setRandomMessage] = useState('');
  const [profile,setProfile]=useState(null);
  const [optionVisible,setOptionVisible]=useState(false);
  const [profileUpdateVisible,setProfileUpdate]=useState(false);
  const [infoUpdateVisible,setInfoUpdate]=useState(false);
  
  //db의 member_profile 컬럼에는 프로필 이미지가 들어가는 데,
  //들어갈 항목을 미리 배열에 저장해두고 업데이트 할때 사용합니다. 
  const profileList=[
    'profile_black','profile_blue','profile_gray','profile_pink','profile_purple','profile_skyblue',
  ];

  //From.Polintech 메세지 박스에 표현되는
  //랜덤 응원 메세지 배열입니다.
  const messages=[
    '노력은 배신하지 않는답니다.',
    '실패를 두려워해선 안됩니다.',
    '안녕하세요? 만나서 반갑습니다.',
    '급할수록 돌아가는 법이랍니다.',
    '항상 침착함을 유지하는 것이 중요합니다.',
    '오늘 하루도 수고 많았어요.',
    '적절한 취미생활은 삶의 질을 향상 시킨답니다.',
  ];
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"MyPage",
      headerTitleStyle: {
        color: '#003497', // 원하는 색상으로 변경
      },
      headerTitleAlign: 'center', // 타이틀을 헤더의 정중앙에 위치
      headerStyle:{
        backgroundColor:'#ffffff',
      },
      headerRight: () => (
        <View>{/* 메인페이지의 드로어와 같은 원리로, 버튼 클릭 시 옵션 모달을 호출합니다. */}
            <TouchableOpacity onPress={()=>setOptionVisible(true)}>
                <Icon name="more-vert" style={styles.icon}color={'#003497'} size={25} />
            </TouchableOpacity>
        </View>
    ),
    })
  },[navigation]);
  useEffect(() => {
    //랜덤값을 생성해 응원메세지 중 하나를 보여줍니다.
    //마이페이지를 들어올때마다 다른 메세지를 보여주게됩니다.
    const randomIndex = Math.floor(Math.random() * messages.length);
    setRandomMessageIndex(randomIndex);
    setRandomMessage(messages[randomIndex]);
  }, []);

  useEffect(() => {
    // AsyncStorage(앱 로컬 저장소)에서 사용자 정보를 불러와 로그인 상태를 판단합니다.
    // 만약 로그인이 되어 있지 않은데 마이페이지에 진입했다면 다시 로그인 페이지로 이동합니다.
    const checkLoginStatus = async () => {
      if (userInfo) {
        console.log(userInfo);
        setNickname(userInfo.nickname);
        setName(userInfo.name);
        setMajor(userInfo.major); 
        setGrade(userInfo.grade);
        setGender(userInfo.gender);
        setProfile(userInfo.profile);
        console.log('로그인 정보 확인함');
      } else {
        console.log('로그인 정보 없음');
        navigation.navigate('LoginScreen');
      }
    };
    checkLoginStatus();
  }, []);

  const btnLogout = async () => {
    //로그아웃 함수
    await logOut();
    console.log('로그아웃 눌렀어용');
    navigation.navigate('LoginScreen');
  };

  const btnCancel=()=>{
    //정보 수정 창과 프로필 사진 업데이트 창의 표시 여부를 false로 설정합니다.
    setInfoUpdate(false);
    setProfileUpdate(false);
  };

  const btnConfirmUpdate= async()=>{
    //유저 정보 업데이트를 실행합니다.
    console.log('업데이트 눌렀음.');
    try{
      const res=await fetch(
        'https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/UpdateMember',
        {
          method:'POST',
          headers:{
            'Content-Type' : 'application/json',
          },
          body:JSON.stringify({
            member_id:userInfo.id,
            newNickname:newNickname,
            newEmail:newEmail,
            newEngname:newEngname,
          }),
        });
        const json=await res.json();
        if(json.success){
          Alert.alert('회원 정보 수정 성공\n다시 로그인 해주세요.');
          setInfoUpdate(false);
          await logOut();
          navigation.navigate('LoginScreen');
        }else{
          Alert.alert('회원 정보 수정 실패');
        }
    }catch(error){
      console.log(error);
      Alert.alert('회원 정보 수정 중 오류 발생');
    }
  };
  
  const btnUpdateProfile= async()=>{
    //프로필 사진 정보 업데이트를 실행합니다.
    console.log('업데이트 눌렀음.');
    try{
      const res=await fetch(
        'https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/UpdateProfile',
        {
          method:'POST',
          headers:{
            'Content-Type' : 'application/json',
          },
          body:JSON.stringify({
            member_id:userInfo.id,
            member_profile:newProfile,
          }),
        });
        const json=await res.json();
        if(json.success){
          //재로그인을 통해 유저 정보를 다시 저장하도록 합니다.
          Alert.alert('회원 정보 수정 성공\n다시 로그인 해주세요.');
          setInfoUpdate(false);
          await logOut();
          navigation.navigate('LoginScreen');
        }else{
          Alert.alert('회원 정보 수정 실패');
        }
    }catch(error){
      console.log(error);
      Alert.alert('회원 정보 수정 중 오류 발생');
    }
  };
  
  const userUpdate = () => {
    //정보 수정 페이지를 호출합니다.
    setOptionVisible(false);
    setInfoUpdate(true);
  };
  const profileUpdate = () =>{
    //프로필 이미지 수정 페이지를 호출합니다.
    setOptionVisible(false);
    setProfileUpdate(true);
  }
  return (
    //배경색으로 그라데이션을 지정하기 위해 LinearGradient라는 컴포넌트를 사용했습니다.
    <LinearGradient 
    colors={['#003497','#5791fe']}
    style={styles.container}
    >
    <SafeAreaView style={styles.container}>
      <View style={{flex:4, width:'100%',alignItems:'center', justifyContent:'center'}}>
        <View style={styles.profile}>
        <Image  
            source={{uri:`https://storage.googleapis.com/polintech_image/AppImage/profile/${profile}.png`}}
            resizeMode='contain'
            style={styles.profileImg}
        />
        </View>
      </View>
      <View style={{flex:6,width:'100%',alignItems:'center'}}>
        <View style={styles.main}>
          <View style={styles.nameArea}>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={styles.contentArea}>
            <Text style={styles.contentText}>{userInfo.id}</Text>
            <Text>|</Text>
            <Text style={styles.contentText}>{major}</Text>
            <Text>|</Text>
            <Text style={styles.contentText}>{grade}학년</Text>
          </View>
          <View style={styles.contentArea2}>
            <Text style={styles.contentText}>{nickname}</Text>
            <Text>|</Text>
            <Text style={styles.contentText}>{userInfo.engname}</Text>
            <Text>|</Text>
            <Text style={styles.contentText}>{gender}</Text>
          </View>
          <View style={{width:'80%',marginTop:50,}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.randomText}>From.PolyTech</Text>
              <Text style={styles.randomText2}>폴리텍이 당신에게</Text>
            </View>
            <View style={styles.randomMessageArea}> 
              <Text style={styles.randomText3}>{randomMessage}</Text>
            </View>
          </View>
        <TouchableOpacity>
          <Icon />
        </TouchableOpacity>
      </View>
      </View>

      {/* 변수값에 따라 옵션 모달을 조건부 렌더링으로 표현합니다. */}
      {optionVisible && ( //옵션 모달
          <View style={styles.drawerBackground}>
            <TouchableOpacity style={styles.overlayBackground}
            onPress={()=>setOptionVisible(false)}>
                <View style={styles.overlayBox1}>
                  <TouchableOpacity onPress={userUpdate}>
                    <Text style={styles.drawerFont}>정보수정</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={profileUpdate}>
                    <Text style={styles.drawerFont}>프로필 변경</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={btnLogout}>
                    <Text style={styles.drawerFont}>로그아웃</Text>
                  </TouchableOpacity>
                </View>                   
            </TouchableOpacity>
          </View>
       )}
       {/* 변수값에 따라 프로필 수정 모달을 조건부 렌더링으로 표현합니다. */}
        {profileUpdateVisible && ( //프로필 수정 모달
          <View style={styles.drawerBackground}>
            <KeyboardAvoidingView behavior={Platform.OS ==='ios'?'padding':undefined }
            style={{width:'100%',height:'100%'}}
            >
            <TouchableOpacity style={styles.overlayBackground2}
            onPress={()=>setProfileUpdate(false)}>
                <View style={styles.overlayBox2}>
                <Text style={{textAlign:'center',fontWeight:'bold',color:'#000000'}}>프로필 이미지 설정</Text>
                  <View style={{flexDirection:'row',}}>
                    {profileList.map((img,index)=>(
                    <TouchableOpacity key={index} onPress={()=>setNewProfile(img)}>
                      <Image 
                        source={{uri:`https://storage.googleapis.com/polintech_image/AppImage/profile/${img}.png`}}
                        style={{width:60,height:60,}}
                      />
                    </TouchableOpacity>
                    ))}
                  </View>

                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <TouchableOpacity style={{backgroundColor:'#003497',borderWidth:1,marginHorizontal:10, padding:3}} onPress={btnUpdateProfile}>
                      <Text style={{color:'#ffffff'}}>수정하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#003497',borderWidth:1,marginHorizontal:10, padding:3}} onPress={btnCancel}>
                      <Text style={{color:'#ffffff'}}>취소하기</Text>
                    </TouchableOpacity>
                    </View>
                <Text style={{textAlign:'center',fontSize:10,color:'gray'}}>원하는 프로필 이미지를 선택 후 수정하기 버튼을 클릭해주세요.</Text>                 
                </View>
            </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
       )}
       {/* 변수값에 따라 회원 정보 수정 모달을 조건부 렌더링으로 표현합니다. */}
        {infoUpdateVisible && ( //정보 수정 모달
          <View style={styles.drawerBackground}>
            <KeyboardAvoidingView behavior={Platform.OS ==='ios'?'padding':undefined }
            style={{width:'100%',height:'100%'}}>
            <TouchableOpacity style={styles.overlayBackground2}
            >
                <View style={styles.overlayBox3}>
                  <Text style={{textAlign:'center',fontWeight:'bold',color:'#000000'}}>{name} 님 정보 수정</Text>
                  <TextInput 
                    style={styles.input}
                    value={userInfo.id}
                    placeholder="학번"
                    editable={false}
                  />
                  <TextInput 
                    style={styles.input}
                    onChangeText={setNewEmail}
                    placeholder={userInfo.email}
                  />
                  <TextInput 
                    style={styles.input}
                    //defaultValue={nickname}
                    onChangeText={setNewNickname}
                    placeholder={userInfo.nickname}
                  />
                  <TextInput 
                    style={styles.input}
                    //defaultValue={userInfo.engname}
                    onChangeText={setNewEngname}
                    placeholder={userInfo.engname}
                  />
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                  <TouchableOpacity style={{backgroundColor:'#003497',borderWidth:1,marginHorizontal:10, padding:3}} onPress={btnConfirmUpdate}>
                    <Text style={{color:'#ffffff'}}>수정하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor:'#003497',borderWidth:1,marginHorizontal:10, padding:3}} onPress={btnCancel}>
                    <Text style={{color:'#ffffff'}}>취소하기</Text>
                  </TouchableOpacity>
                  </View>
                  <Text style={{textAlign:'center',fontSize:10,color:'gray'}}>학번을 제외한 모든 정보를 입력해주세요.</Text>
                  <Text style={{textAlign:'center',fontSize:10,color:'gray'}}>학과, 이름 변경 등은 카카오톡 채널로 문의 바랍니다.</Text>
                </View>                   
            </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
       )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles=StyleSheet.create({
  title:{
      color:'white',
      fontSize:20,
      fontWeight:'bold',
      textAlign:'left',
  },
  profile:{
    width:175,
    height:175,
    borderRadius:256,
    backgroundColor:'#ffffff',
  },
  main:{
    width:'100%',
    height:'100%',
    backgroundColor:'#ffffff',
    borderTopLeftRadius:128,
    borderTopRightRadius:128,
    alignItems:'center',
  },
  contentArea:{
    marginVertical:5,
    width:'65%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
  },
  contentArea2:{
    marginVertical:5,
    width:'50%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
  },
  container:{
    width:'100%',
    height:'100%',
    flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
  nameArea:{
    width:'50%',
    marginTop:35,
  },
  nameText:{
    color:'#003497',
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center',
  },
  randomMessageArea:{
    marginTop:5,
    paddingVertical:10,
    //width:'80%',
    borderWidth:1,
    borderRadius:15,
  },
  randomText:{
    fontWeight:'bold',
    color:'#003497',
    fontSize:15,
    textAlign:'left',
  },
  randomText2:{
    fontWeight:'bold',
    color:'#003497',
    fontSize:10,
    textAlign:'right',
    marginTop:5,
  },
  randomText3:{
    color:'#003497',
    fontSize:13,
    textAlign:'center',
  },
  contentText:{
    color:'#003497',
    fontSize:15,
    textAlign:'center',
  },
  profileImg:{
    //borderColor:'#000000',
    //borderWidth:1,
    width:175,
    height:175,
    borderRadius:256,
  },
  drawerFont:{
    color:'#000000',
  },
  drawerBackground:{
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width, // 화면 너비
    height: Dimensions.get('window').height,    
},
overlayBackground: {
  flex:1,
    width: Dimensions.get('window').width, // 화면 너비
    height: Dimensions.get('window').height,
    position: 'absolute',
    marginTop:-24,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, 
  },
  overlayBackground2: {
    flex:1,
    flexDirection:'column',
    width: Dimensions.get('window').width, // 화면 너비
    height: Dimensions.get('window').height,
    position: 'absolute',
    marginTop:-24,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 어두운 배경
    alignItems:'center',
  },
  overlayBox1: {
    position:'absolute',
    width:100,
    height:75,
    right:0,
    paddingVertical:10,
    marginTop:30,
    borderColor:'#000000',
    borderWidth:1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayBox2: {
    position:'absolute',
    width:360,
    height:230,
    top:0,
    paddingVertical:10,
    marginTop:40,
    borderColor:'#000000',
    borderWidth:1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayBox3: {
    position:'absolute',
    width:400,
    height:400,
    top:0,
    marginTop:40,
    paddingVertical:20,
    paddingHorizontal:20,
    borderColor:'#000000',
    borderWidth:1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    //alignItems: '',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    //marginBottom: 8,
    paddingHorizontal: 8,
  },
});

export default MyPage;
