import React, { useEffect,useState } from 'react';
import {Alert,TouchableOpacity,Dimensions,Image,TextInput,Pressable,Platform,SafeAreaView,Text, StyleSheet,Button,View} from 'react-native';
import { saveLoginInfo, loadUserInfo, logOut } from './Common';
const UpdateCert=({navigation,route})=>{

   const {id, userInfo}=route.params;
   const [userCert, setUserCert] = useState(userInfo.iscert);
    useEffect(() => {
      const updateIsCert = async () => {
          console.log('재학생 인증 신청한 유저:',id);
          // 사용자 정보가 있다면 로그인 상태로 간주하여 메인 화면으로 이동합니다.
          if(!id){
            console.log('유저정보없다');
            return;
          }
            try{
              const res= await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/UpdateIsCert',{
                method:'POST',
                headers:{
                  'Content-Type':'application/json',
                },
                body:JSON.stringify({member_id:id}),
              });
              const resData=await res.json();
              if(resData.success){
                console.log('정상적으로 처리됨.',resData);
                setUserCert(1);
                navigation.navigate('CheckIsCert',{ userInfo: { ...userInfo, iscert: 1 }});
              }else{
                console.error('서버 응답 오류:',resData);
                return;
              }
            }catch (error){
                console.error('에러 발생!',error);
                return;
            }
        }
        // 페이지가 마운트될 때 로그인 정보를 확인합니다.
        updateIsCert();
      }, [id]); 
};
export default UpdateCert;