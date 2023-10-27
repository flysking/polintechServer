import React, { useEffect,useState } from 'react';
import {Alert,TouchableOpacity,Dimensions,Image,TextInput,Pressable,Platform,SafeAreaView,Text, StyleSheet,Button,View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
//npm install react-native-image-picker;

const ImageTest=({navigation})=>{
    const [response,setResponse]=useState(null);

    const onSelectImage=()=>{
      launchImageLibrary({
        mediaType:'photo',
        maxWidth:512,
        maxHeight:512,
        includeBase64:Platform.OS==='android',
      },
      (res)=>{
        console.log(res);
        if(res.didCancel){
          return;
        }
        setResponse(res);
      },
      );
    };

    return(
      //재학증명서에 있는 정보중 학과(세부전공제외) 학번, 이름만 담기로 결정합니다.
        <SafeAreaView style={styles.block}>
          <View>
            <Text style={styles.title}>재학생 인증 신청</Text>
          </View>
          <Pressable onPress={onSelectImage}>
            <Image 
              style={styles.imageArea}
              source={
                response?{uri:response?.assets[0]?.uri}:
                //response 값이 없을때 default로 보여줄 이미지입니다.
                //만약 이미지를 다른걸 쓰신다면 uri의 AppImage/ 뒤에 다른 이미지를 선택하심됩니다.
                //현재는 user.png파일로 되어있고, 원하는 이미지가 있으시면 카톡에 올려주세요!!
                { uri:'https://storage.googleapis.com/polintech_image/AppImage/user.png'}}
            />
          </Pressable>
          <View style={styles.form}>
            <Text>
                이미지 테스트용 파일입니다. 아래 이미지 영역 클릭해보셔요!

            </Text>
          </View>
      </SafeAreaView>
    );
};
const styles=StyleSheet.create({
  title:{
    marginTop:50,
    fontSize:30,
    color:'#000000',
  },
  block:{
    alignItems:'center',
    marginTop:24,
    paddingHorizontal:16,
    width:'100%',
  },
  imageArea:{
    marginTop:20,
    backgroundColor:'#cdcdcd',
    borderRadius:10,
    width:256,
    height:256,
  },
  form:{
    marginTop:16,
    width:'100%',
    alignItems:'center',
  },
})

export default ImageTest;