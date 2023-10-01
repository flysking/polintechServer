import React, { useEffect } from 'react';
import {SafeAreaView,Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const Loading=({ navigation })=>{

    useEffect(() => {
        // 일정 시간이 지난 후에 메인 화면으로 이동하기 위한 타이머 설정
        const timer = setTimeout(() => {
          // 예: 3초 후에 'MainScreen'으로 이동
          navigation.navigate('Login');
        }, 3000); // 3초 대기 (원하는 시간으로 조정)
    
        // 컴포넌트가 언마운트될 때 타이머 제거
        return () => clearTimeout(timer);
      }, [navigation]);
      
    return(
        <SafeAreaView style={styles.full}>
            <Text style={styles.text}>Welcome Polintech</Text>
            <FastImage
                source={require('../image/tools-7049_128.gif')} 
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
            />
        </SafeAreaView>

    );
};
const styles=StyleSheet.create({
    full:{
        flex:1,
        backgroundColor:"#B2EBF4",
        width:"100%",
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:150,
        height:150,
        marginTop:50
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        color:'black',

    }

});
export default Loading;