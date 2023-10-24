import React, { useEffect } from 'react';
import {SafeAreaView,Text, StyleSheet,Button,View} from 'react-native';
import { saveLoginInfo, loadUserInfo, logOut } from './Common';

const Certificate=({navigation})=>{

    const btnLogout= async ()=>{
        await logOut();
        console.log('로그아웃 눌렀어용');
        navigation.navigate('LoginScreen');
    }
    return(
        <SafeAreaView>
            <View>
                
            </View>
            <Text>
                재학생 인증화면
            </Text>
            <Button title={'로그아웃'} onPress={btnLogout} />
        </SafeAreaView>

    );
}

export default Certificate;