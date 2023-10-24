import React, { useEffect, useState } from 'react';
import {SafeAreaView,Text, StyleSheet, Button, Alert} from 'react-native';
import { saveLoginInfo, loadUserInfo, logOut } from './Common';

const CheckIsCert = ({navigation}) =>{

    useEffect(()=>{
        const checkCert=async()=>{
            const userInfo=await loadUserInfo();

            console.log('재학생체크:',userInfo.iscert);
            if(userInfo.iscert!=1){
                Alert.alert('재학생 인증이 필요합니다.');
                navigation.navigate('Certificate');
            }else{
                navigation.navigate('MainTest');
            }
        };
        checkCert();
    },[]);

    const btnLogout= async ()=>{
        await logOut();
        console.log('로그아웃 눌렀어용');
        navigation.navigate('LoginScreen');
    
    }
    return(
        <SafeAreaView>
            <Button title={'로그아웃'} onPress={btnLogout} />
        </SafeAreaView>

    );
}

export default CheckIsCert;