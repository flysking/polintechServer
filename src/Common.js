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

export const saveUserInfoAll = async (data) => {
  try {
    const keys = Object.keys(data);
    // 각 필드에 대한 AsyncStorage 키를 순회하며 데이터 저장
    for (const key of keys) {
      const value = JSON.stringify(data[key]);
      await AsyncStorage.setItem(`@member_${key}`, value);
      console.log('저장한 값 : ',key,'/',value);
    }
  } catch (e) {
    console.error('사용자 정보 필드 저장 중 오류 발생:', e);
  }
};

export const saveHaveProfile=async(data) => {
  try{
    const jsonValue=JSON.stringify(data);
    await AsyncStorage.setItem('@haveProfile',jsonValue);
    console.log('프로필 이미지 정보 저장');
  }catch(e){
    console.error('프로필 이미지가 저장되지 않았음');
  }
};
export const loadHaveProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@haveProfile');
    console.log('프로필 정보 확인');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('프로필 로드 중 오류 발생:', e);
  }
};

export const saveDarkmode=async (data) => {
  try{
    const jsonValue=JSON.stringify(data);
    await AsyncStorage.setItem('@darkmode',jsonValue);
    console.log('다크모드 정보 저장 성공',data);
  }catch(e){
    console.error('다크모드 정보 저장 실패');
  }
};

export const loadDarkmode = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@darkmode');
    console.log('다크모드 불러오기 성공');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('다크모드 로드 중 오류 발생:', e);
  }
};

export const loadUserInfoAll = async () => {
  try {
    const keys = Object.keys({
      id: 'id',
      pw: 'pw',
      name: 'name',
      engname: 'engname',
      nickname: 'nickname',
      email: 'email',
      major: 'major',
      birth: 'birth',
      gender: 'gender',
      iscert: 'iscert',
      isAdmin: 'isAdmin',
      grade: 'grade',
      isLogin:'isLogin',
      //majorname:'majorname',
    });
    const data = {};
    // 각 필드에 대한 AsyncStorage 키를 순회하며 데이터 불러오기
    for (const key of keys) {
      console.log('불러올 항목', key);
      const value = await AsyncStorage.getItem(`@member_${key}`);
      data[key] = JSON.parse(value);
      console.log(key, "데이터 : ", value);
    }
    return data;
  } catch (e) {
    console.error('사용자 정보 필드 불러오기 중 오류 발생:', e);
    return null;
  }
};
export const loadUserInfoAny = async (any) => {
  try {
      //원하는 키값만 가져오기
      const key=any;
    
      //선택한 키 값에 있는 데이터를 반환해줍니다.
      const value = await AsyncStorage.getItem(`@member_${key}`);
      data = value;
      return data;
  } catch (e) {
    console.error('사용자 정보 필드 불러오기 중 오류 발생:', e);
    return null;
  }
};

export const updatingIsCert = async (iscert) => {
  try {
      const jsonValue = JSON.stringify(iscert);
      await AsyncStorage.setItem('@member_iscert', jsonValue);
      console.log('업데이트할 데이터:',jsonValue);
  } catch (e) {
    console.error('사용자 정보 업데이트 중 오류 발생:', e);
  }
};
export const updatingIsLogin = async (isLogin) => {
  try {
      const jsonValue = JSON.stringify(isLogin);
      await AsyncStorage.setItem('@member_isLogin', jsonValue);
      console.log('업데이트할 데이터:',jsonValue);
  } catch (e) {
    console.error('사용자 정보 업데이트 중 오류 발생:', e);
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

export const logOut = async () => 
{
  const keys = Object.keys({
    id: 'id',
    pw: 'pw',
    name: 'name',
    engname: 'engname',
    nickname: 'nickname',
    email: 'email',
    major: 'major',
    birth: 'birth',
    gender: 'gender',
    iscert: 'iscert',
    isAdmin: 'isAdmin',
    grade: 'grade',
    isLogin:'isLogin',
  });
  try {
    for (const key of keys) {
      console.log('삭제할 항목', key);
      await AsyncStorage.removeItem(`@member_${key}`);
    }
  } catch (e) {
    console.error('로그인 정보 제거 중 오류 발생', e);
  }
};
