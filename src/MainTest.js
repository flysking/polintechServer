import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView,View, Text, FlatList, TouchableOpacity,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function MainTest ({navigation}) {

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const fetchBoards = async () => {
        try {
            const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList');
            const json = await response.json();
            if (json.success) {
            setBoards(json.boards);
            }
        } catch (error) {
            console.error(error);
        }
        };

        fetchBoards();
    }, []); 
    const handleBoardList=()=>{
        navigation.navigate('TabBottomMain');
    };
    const top5Board = boards.slice(0,5);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.topMenu}>
                <TouchableOpacity onPress={handleBoardList}
                style={styles.category}
                >
                    <Text>전체</Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={handleBoardList}>
                    <Text>학과</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBoardList}>
                    <Text>공지</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{marginTop:20, color:'black', fontSize:15,}}>게시글 목록</Text>
                <View style={styles.listContainer}>
                    <FlatList 
                        data={top5Board}
                        keyExtractor={item => item.board_id.toString()}
                        renderItem={({item}) => (
                    <View style={styles.list}>
                        <TouchableOpacity onPress={()=>navigation.navigate('BoardDetail', { boardId: item.board_id })} style={{flexDirection:'row'}}>
                                <Text style={{color:'black'}}>{item.board_title}</Text>
                                <Text style={{color:'black',marginLeft:5}}>[{item.board_hits}]</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                    />
                </View>
                <TouchableOpacity onPress={handleBoardList}>
                    <Text style={{color:'gray', marginLeft:190}}>더보기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    ); 
};
const styles=StyleSheet.create({
    title:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'left',
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    topMenu:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:60,
        paddingTop:10,
        paddingBottom:10,
        borderBlockColor:'gray',
        borderBottomWidth:1,
    },
    category:{
        fontSize:15,
    },
    listContainer:{
        flexDirection:'row',
        marginTop:10,
        paddingVertical:10,
        width:300,
        borderBlockColor:'#003497',
        //backgroundColor:'#E6FFFF',
        borderTopWidth:3,
        borderBottomWidth:3,
    },
    list:{
        flex:1,
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
export default MainTest;