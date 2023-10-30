import React, {useState, useEffect,useLayoutEffect} from 'react';
import {Dimensions,Image,KeyboardAvoidingView,View, Text, FlatList, TouchableOpacity,StyleSheet, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadUserInfoAll,logOut } from './Common';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
function DrawerModal () {
    const [userInfo, setUserInfo]=useState({});
    const navigation=useNavigation();
    const [name,setName]=useState(null);
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
    const logOutUser=async()=>{
        await logOut();
        console.log('로그아웃 완료');
        navigation.navigate('LoginScreen');
    };
    const handleIdc=()=>{
        console.log(name,'님 학생증으로 이동');
        navigation.navigate('StudentIDC',{userInfo:userInfo});
    }

    return(
        <View style={styles.overlayBox}>
            <View style={styles.profileBox}>
                <TouchableOpacity>
                    <Image
                        source={require('../image/profile.gif')}
                        style={styles.profileImg}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ color:'#000000',marginTop:15, fontSize:20,}}>
                        {name}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mypageBox}>
                <TouchableOpacity>
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
                <TouchableOpacity onPress={logOutUser}>
                    <Icon name="settings" style={styles.icon}color={'#000000'} size={25} />
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
        borderBottomWidth:1,
      },
      profileImg:{
        borderColor:'#000000',
        borderWidth:1,
        width:125,
        height:125,
      },
      mypageBox:{
        marginTop:40,
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