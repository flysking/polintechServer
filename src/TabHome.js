import React, {useState, useEffect,useLayoutEffect} from 'react';
import moment from 'moment';
import {View, Text, FlatList, TouchableOpacity,StyleSheet} from 'react-native';

function TabHome({navigation}){
    const [boards, setBoards] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
          title: '11',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        });
      }, [navigation]);

    useEffect(() => {
        const fetchBoards = async () => {
        try {
            const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList');
            const json = await response.json();
            console.log('tabhome 게시글 불러오기 실행');
            if (json.success) {
            setBoards(json.boards);
            }
        } catch (error) {
            console.error(error);
        }
        };

        fetchBoards();
    }, []);
    const formatDate = (dateString) => {
        return moment(dateString).format('MM-DD');
      };

    return (
        <FlatList 
        data={boards}
        style={styles.block}
        keyExtractor={item => item.board_id.toString()}
        renderItem={({item}) => (
        <View style={styles.list}>
        <TouchableOpacity  onPress={() => navigation.navigate('BoardDetail', { boardId: item.board_id })}>
            <View styles={{flexDirection:'row'}}>
                <Text style={{color:'black', fontSize:20}}>{item.board_title} [{item.board_hits}]</Text>
            </View>
            <View styles={{flexDirection:'row'}}>
                <Text style={{color:'gray',marginLeft:5}}>{item.board_mid} 조회 {item.board_hits} 작성일 {formatDate(item.board_postdate)} </Text>
            </View>
        </TouchableOpacity>
    </View>
    )}
    />
    );
};

const styles=StyleSheet.create({
    block:{
        flex:1,
    },
    list:{
        width:'90%',
        paddingHorizontal:5,
        paddingVertical:10,
        marginLeft:10,
        borderTopColor:'#D8D8D8',
        borderTopWidth:1,
        borderBottomColor:'#D8D8D8',
        borderBottomWidth:1,
    },
});

export default TabHome;