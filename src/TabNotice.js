import {React, useLayoutEffect} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
function TabNotice({navigation}){
    const route=useRoute();
    const category=route.params;
    console.log(category);
    useLayoutEffect(() => {
        navigation.setOptions({
          tabBarLabel:()=>null,
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        });
      }, [navigation]);
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