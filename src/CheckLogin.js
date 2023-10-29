import React, { useEffect, useState } from 'react';
import { Alert,View} from 'react-native';
import { loadUserInfoAll } from './Common'; 

const CheckLogin=({navigation})=>{
    useEffect(() => {
        const checkLoginStatus = async () => {
          // AsyncStorage에서 사용자 정보를 가져옵니다.
          const userInfo = await loadUserInfoAll();
          console.log('로그인체크 유저정보확인:',userInfo);
          // 사용자 정보가 있다면 로그인 상태로 간주하여 메인 화면으로 이동합니다.
          if (userInfo) {
            Alert.alert('로그인 되어있습니다');
            console.log('로그인 정보 확인함');
            console.log('유저 정보 확인',userInfo);
            navigation.navigate('CheckIsCert',{userInfo});
          }else{
            console.log('로그인 정보 없음');
            navigation.navigate('LoginScreen');
          }
        };
        // 페이지가 마운트될 때 로그인 정보를 확인합니다.
        checkLoginStatus();
      }, []); 

    return(
        <View>
            {/*해당 페이지는 로그인 체크 후 넘겨주는 역할만 수행하기에
                오류가 발생하지 않도록 View 하나만 생성해두었습니다.
            */}
        </View>
    );
};
export default CheckLogin;