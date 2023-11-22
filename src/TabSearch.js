import {React, useLayoutEffect}from 'react';
import {StyleSheet,View,Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
function TabSearch({navigation}){
  const route=useRoute();
  const category=route.params.category;
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
    return(
        <View style={styles.block}>
            <Text>검색 창 준비중입니다.</Text>
        </View>

    );
}

const styles=StyleSheet.create({
    block:{},
});

export default TabSearch;