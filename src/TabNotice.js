import React from 'react';
import {StyleSheet,View,Text} from 'react-native';

function TabNotice({route}){
    //const category=route.params;
    return (
        <View style={styles.block}>
            <Text>공지 사항 준비 중입니다~</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    block:{},
});

export default TabNotice;