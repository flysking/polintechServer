import AsyncStorage from '@react-native-async-storage/async-storage';

// 앱에 저장 기능 npm install @react-native-async-storage/async-storage
// 로컬 저장소인 AsyncStorage에 정보를 저장하기 위해 Common 페이지에 
// 사용할 함수들을 생성하였습니다.

export const saveUserInfoAll = async (data) => {
  try {
    //로그인 페이지에서 keys에 해당하는 값들을 저장하도록 하였습니다.
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
//다크모드 설정 값을 저장하는 함수이지만 아직 개발중입니다.
export const saveDarkmode=async (data) => {
  try{
    const jsonValue=JSON.stringify(data);
    await AsyncStorage.setItem('@darkmode',jsonValue);
    console.log('다크모드 정보 저장 성공',data);
  }catch(e){
    console.error('다크모드 정보 저장 실패');
  }
};
//다크모드 설정 값을 로드하는 함수이지만 아직 개발중입니다.
export const loadDarkmode = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@darkmode');
    console.log('다크모드 불러오기 성공');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('다크모드 로드 중 오류 발생:', e);
  }
};
//유저의 모든 정보를 불러옵니다.
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
      profile:'profile',
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
  //특정 키값을 받아오기 위해 생성한 함수이나 아직까지 사용된 적이 없습니다.
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

export const logOut = async () => 
//로그아웃 시 앱에 저장되어 있는 정보들을 모두 지워야합니다.
//유사한 기능으로 JSP의 session.invalidate() 가 있습니다
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
    profile:'profile',
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
