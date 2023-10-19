import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { loadUserInfo} from './Common/Common';
const CheckLogin=({navigation})=>{
    const [isLoggedIn, setLoggedIn] = useState(false);
    //컴포넌트 isLoggedIn 상태를 false로 설정, 상태를 설정할 setLoggedIn 함수 생성

    useEffect(() => {
        const checkLoginStatus = async () => {
          // AsyncStorage에서 사용자 정보를 가져옵니다.
          const userInfo = await loadUserInfo();
    
          // 사용자 정보가 있다면 로그인 상태로 간주하여 메인 화면으로 이동합니다.
          if (userInfo) {
            setLoggedIn(true);
            navigation.navigate('MainTest');
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