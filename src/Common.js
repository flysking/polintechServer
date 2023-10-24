import AsyncStorage from '@react-native-async-storage/async-storage';

// 앱에 저장 기능 npm install @react-native-async-storage/async-storage

export const saveLoginInfo = async data => {
  //로그인 성공시 user 정보 저장
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@login_info', jsonValue); //@login_info : key | jsonValue : value
  } catch (e) {
    console.error('데이터 저장 중 오류가 발생했습니다:', e);
  }
};

export const loadUserInfo = async () => {
  //저장한 user 정보 불러옴
  try {
    const jsonValue = await AsyncStorage.getItem('@login_info');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('데이터 불러오기 중 오류가 발생했습니다:', e);
  }
};
export const logOut = async () => {
  try {
    await AsyncStorage.removeItem('@login_info');
  } catch (e) {
    console.error('로그인 정보 제거 중 오류 발생', e);
  }
};
