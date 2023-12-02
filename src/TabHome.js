import React, {useState, useEffect,useLayoutEffect} from 'react';
import moment from 'moment';
import {View, Text, FlatList, TouchableOpacity,StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';

function TabHome({navigation}){
    const [boards, setBoards] = useState([]);
    const route=useRoute();
    const category=route.params.category;
    const [noCategory,setNoCategory]=useState(false);
    console.log(category);

    useLayoutEffect(() => {
        navigation.setOptions({
          title: category,
          
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        });
      }, [navigation]);

    useEffect(() => {
        const fetchBoards = async () => {
            if(category==='전체'){
                try {
                    const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList');
                    const json = await response.json();
                    console.log('tabhome 전체 게시글 불러오기 실행');
                    if (json.success) {
                    setBoards(json.boards);
                    }
                } catch (error) {
                    console.error(error);
                }
            }else if(category==='학과게시판'){
                try {
                    const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList/${category}`);
                    const json = await response.json();
                    console.log('tabhome 학과게시글 불러오기 실행');
                    if (json.success) {
                    setBoards(json.boards);
                    }
                } catch (error) {
                    console.error(error);
                }
            }else if(category==='익명게시판'){
                try {
                    const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList/${category}`);
                    const json = await response.json();
                    console.log('tabhome 익명게시글 불러오기 실행');
                    if (json.success) {
                    setBoards(json.boards);
                    }
                } catch (error) {
                    console.error(error);
                }
            }else if(category==='학사일정'){
                try {
                    const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList/학사일정`);
                    const json = await response.json();
                    console.log('tabhome 학사일정 불러오기 실행');
                    if (json.success) {
                    setBoards(json.boards);
                    }
                } catch (error) {
                    console.error(error);
                }
            }else{
                console.log('선택된 카테고리가 없음..');
                setNoCategory(true);
            }
        };

        fetchBoards();
    }, []);
    const formatDate = (dateString) => {
        return moment(dateString).format('MM-DD');
      };

    return (
        <View style={styles.block}>
            {noCategory ? (
                <Text>카테고리가 선택되지 않았습니다.</Text>
            ):(
                boards===null?(
                <Text>생성된 게시글이 없습니다.</Text>
            ):(
                <FlatList 
                data={boards}
                style={styles.block}
                keyExtractor={item => item.board_id.toString()}
                renderItem={({item}) => (
                <View style={styles.list}>
                <TouchableOpacity  onPress={() => navigation.navigate('BoardDetail', { boardId: item.board_id })}>
                    <View styles={{flexDirection:'row'}}>
                        <Text style={{color:'black', fontSize:20}}>[{item.board_subcategory}]{item.board_title}</Text>
                    </View>
                    <View styles={{flexDirection:'row'}}>
                        <Text style={{color:'gray',marginLeft:5}}>{item.board_mid} 조회 {item.board_hits} 작성일 {formatDate(item.board_postdate)} </Text>
                    </View>
                </TouchableOpacity>
            </View>
            )}
            />
            )
            )}
    </View>
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