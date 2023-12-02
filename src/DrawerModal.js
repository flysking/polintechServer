import React, {useState, useEffect,useLayoutEffect} from 'react';
import {Dimensions,Image,KeyboardAvoidingView,View, Text, FlatList, TouchableOpacity,StyleSheet, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadUserInfoAll,logOut,saveDarkmode,loadDarkmode,saveHaveProfile,loadHaveProfile } from './Common';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//다크모드 추가하자
function DrawerModal () {
    const [userInfo, setUserInfo]=useState({});
    const navigation=useNavigation();
    const [name,setName]=useState(null);
    const [darkmode,setDarkmode]=useState(null);
    const [haveProfile,setHaveProfile]=useState(null);

    useEffect(()=>{
        const checkUserInfo=async()=>{
            const userData=await loadUserInfoAll();
            if(userData){
                console.log(userData);
                setUserInfo(userData);
                setName(userData.name);
            }
        };
        checkUserInfo();
    },[]);

    useEffect(()=>{
        const checkHaveProfile=async()=>{
            const checkProfile=await loadHaveProfile();
            if(checkProfile===0){
                setHaveProfile(0);
            }else{
                setHaveProfile(1);
            }
        };
        checkHaveProfile();
    },[haveProfile]);

    const logOutUser=async()=>{
        await logOut();
        console.log('로그아웃 완료');
        navigation.navigate('LoginScreen');
    };
    const handleIdc=()=>{
        console.log(name,'님 학생증으로 이동');
        navigation.navigate('StudentIDC',{userInfo:userInfo});
    };
    const handleSetting=()=>{
        setDarkmode(1);
    };
    const handleMypage=()=>{
        console.log('마이페이지 이동');
        navigation.navigate('MyPage',{userInfo:userInfo});
    };

    return(
        <View style={styles.overlayBox}>
            <View style={styles.profileBox}>
                <TouchableOpacity>
                    {haveProfile === 0 ?(
                        <Image
                            source={require('../image/profile.gif')}
                            style={styles.profileImg}
                        />
                    ) : (
                        <Image
                            source={require('../image/profile.gif')}
                            style={styles.profileImg}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ color:'#000000',marginTop:15, fontSize:20,}}>
                        {name}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lines} />
            <View style={styles.mypageBox}>
                <TouchableOpacity onPress={handleMypage}>
                    <Text style={styles.menuText}>
                        마이페이지
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.idcBox}>
                <TouchableOpacity onPress={handleIdc}>
                    <Text style={styles.menuText}>
                        모바일 학생증
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.logoutBox}>
                <TouchableOpacity onPress={logOutUser}>
                    <Text style={styles.menuText}>로그아웃</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.settingBox}>
                {}
                <TouchableOpacity onPress={handleSetting}>
                    <Icon name="dark-mode" style={styles.icon}color={'#000000'} size={25} />
                </TouchableOpacity>
            </View>
    </View>
    );
};
const styles=StyleSheet.create({
      overlayBox: {
        position:'absolute',
        width: 275,
        height: Dimensions.get('window').height,
        right:0,
        marginTop:30,
        borderTopLeftRadius:50,
        backgroundColor: 'white',
        //justifyContent: 'center',
        alignItems: 'center',
      },
      profileBox:{
        marginTop:50,
        alignItems:'center',
      },
      profileImg:{
        borderColor:'#000000',
        borderWidth:1,
        width:125,
        height:125,
      },
      lines:{
        marginTop:15,
        width:'80%',
        //height:1,
        borderBottomWidth:1,
        borderColor:'lightgray',
      },
      mypageBox:{
        marginTop:30,
        marginVertical:10,
        marginHorizontal:'12.5%',
        justifyContent: 'center',
        alignItems:'center',
        width:'75%',
        height:50,
        //borderWidth:1,
        //borderColor:'#003497',
        fontSize:15,
      },
      idcBox:{
        marginVertical:10,
        marginHorizontal:'12.5%',
        justifyContent: 'center',
        alignItems:'center',
        width:'75%',
        height:50,
        //borderWidth:1,
       // borderColor:'#003497',
        fontSize:15,
      },
      logoutBox:{
        marginVertical:10,
        marginHorizontal:'12.5%',
        justifyContent: 'center',
        alignItems:'center',
        width:'75%',
        height:50,
        //borderWidth:1,
       // borderColor:'#003497',
        fontSize:15,
      },
      settingBox:{
        marginVertical:10,
        marginLeft:130,
        justifyContent: 'center',
        alignItems: 'center',
        width:'20%',
        height:50,
       // borderWidth:1,
       // borderColor:'#003497',
        fontSize:15,
      },
      menuText:{
        color:'#003497',
        fontSize:17,
        fontWeight:'bold',
      },
});
export default DrawerModal;