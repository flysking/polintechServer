import React, { useEffect,useState } from 'react';
import {Alert,TouchableOpacity,Dimensions,Image,TextInput,Pressable,Platform,SafeAreaView,Text, StyleSheet,Button,View} from 'react-native';
import { saveLoginInfo, loadUserInfo, logOut } from './Common';
const UpdateCert=({navigation,route})=>{

   const member_id=route.params.id;
    useEffect(() => {
        const updateIsCert = async () => {
          console.log('유저 정보 출력:',member_id);
          // 사용자 정보가 있다면 로그인 상태로 간주하여 메인 화면으로 이동합니다.
          if(!member_id){
            console.log('유저정보없다');
            return;
          }
            try{
              const res= await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/UpdateIsCert',{
                method:'POST',
                headers:{
                  'Content-Type':'application/json',
                },
                body:JSON.stringify({member_id:member_id}),
              });
              const resData=await res.json();
              if(resData.success){
                console.log('정상적으로 처리됨.',resData);
                const userInfo={iscert:1};
                await saveLoginInfo(userInfo);
                navigation.navigate('CheckIsCert');
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
      }, [member_id]); 
};
export default UpdateCert;