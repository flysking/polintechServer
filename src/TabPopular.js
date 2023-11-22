import {React, useLayoutEffect} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
function TabPopular({navigation}){
    const route=useRoute();
    const category=route.params;


    useLayoutEffect(() => {
        navigation.setOptions({
          tabBarLabel:()=>null,
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        });
      }, [navigation]);
    return(
        <View style={styles.block}>
            <Text>좋아요 순으로 인기글 표시</Text>
        </View>

    );
}

const styles=StyleSheet.create({
    block:{},
});

export default TabPopular;