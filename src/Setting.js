import React, {useState, useEffect,useLayoutEffect} from 'react';
import {TextInput,View, Text, TouchableOpacity,StyleSheet, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveDarkmode,loadDarkmode } from './Common';
import Icon from 'react-native-vector-icons/MaterialIcons';
function Setting ({navigation}) {
    const [darkmode,setDarkmode]=useState(null);

    useEffect(()=>{
        const checkDark=async()=>{
            const dark=await loadDarkmode();
            console.log('다크모드여부 ',dark);
            if(dark===null || dark==='0'){
                console.log('다크모드 설정 안되어 있음');
                setDarkmode(0);
            }else{
                console.log('다크모드 설정 되어있음');
                setDarkmode(1);
            }
        };
        checkDark();
    },[]);

    useEffect(()=>{
        const setDark=async()=>{
            await saveDarkmode(darkmode);
            console.log('다크모드 저장 시도했어용');
        };
        setDark();
    },[darkmode]);

    return(
        <SafeAreaView>
            <View>
                <Text>앱 환경 설정</Text>
            </View>
            <View>
                <Text>다크모드 설정</Text>
                <TextInput></TextInput>
            </View>
        </SafeAreaView>

    );
};
const styles=StyleSheet.create({

});
export default Setting;