import React, { useEffect } from 'react';
import {Image,SafeAreaView,Text, StyleSheet,View} from 'react-native';
import FastImage from 'react-native-fast-image';

const Loading=({ navigation })=>{

    useEffect(() => {
        // 일정 시간이 지난 후에 메인 화면으로 이동하기 위한 타이머 설정
        const timer = setTimeout(() => {
          navigation.navigate('CheckLogin');
        }, 2000); // 2초 대기 (원하는 시간으로 조정)
    
        // 컴포넌트가 언마운트될 때 타이머 제거
        return () => clearTimeout(timer);
      }, [navigation]);
      
    return(
        <SafeAreaView style={styles.full}>
                <Image
                    source={require('../image/logo1.png')} 
                    style={styles.toplogo}
                    resizeMode='contain'
                />
                <FastImage
                    source={{ uri: 'https://github.com/flysking/polintechServer/raw/master/image/loading-7528_256.gif', }} 
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Image
                    source={require('../image/KopoLogo.png')} 
                    style={styles.logo}
                    resizeMode='contain'
                />
        </SafeAreaView>
    );
};
const styles=StyleSheet.create({
    full:{
        flex:1,
        backgroundColor:"#ffffff",
        width:"100%",
        height:"100%",
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        borderRadius:10,
        width:50,
        height:50,
        marginTop:50
    },
    toplogo:{
        borderRadius:10,
        width:175,
        height:175,
        //marginTop:50
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        color:'black',

    },
    logo:{
        position:'absolute',
        width:150,
        bottom:-150,

    }

});
export default Loading;