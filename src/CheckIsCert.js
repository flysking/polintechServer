import React, { useEffect, useState } from 'react';
import {SafeAreaView,Text, StyleSheet, Button, Alert} from 'react-native';
import {loadUserInfo, logOut } from './Common';

const CheckIsCert = ({navigation,route}) =>{
    const {userInfo}=route.params;
    useEffect(()=>{
        const checkCert=async()=>{
            console.log(userInfo);
            const iscert=userInfo.iscert;
            console.log('재학생체크:',iscert);
            if(iscert===0){
                Alert.alert('재학생 인증이 필요합니다.');
                navigation.navigate('Certificate',{userInfo:userInfo});
                return;
            }else if(iscert===1){
                console.log('인증 대기중인 유저');
                Alert.alert('인증 대기 상태입니다.');
            }else{
                console.log('재학생 인증 완료된 유저',userInfo.name);
                navigation.navigate('MainTest',{userInfo:userInfo});
            }
        };
        checkCert();
    },[userInfo]);

    const btnLogout= async ()=>{
        await logOut();
        console.log('로그아웃 눌렀어용');
        navigation.navigate('LoginScreen');
    
    }
    return(
        <SafeAreaView>
            <Text>재학생 인증 대기중입니다.</Text>
            <Text>앱에 다시 로그인하면 인증 상태가 반영됩니다.</Text>
            <Button title={'로그아웃'} onPress={btnLogout} />
        </SafeAreaView>
    );
}

export default CheckIsCert;