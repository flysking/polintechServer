import React, {useState, useEffect,useLayoutEffect} from 'react';
import {Dimensions,Image,KeyboardAvoidingView,View, Text, FlatList, TouchableOpacity,StyleSheet, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
function MainTest ({navigation}) {

    const [boards, setBoards] = useState([]);
    const [modalVisible,setModalVisible]=useState(false);
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

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Polintech',
            headerBackVisible: false,
            headerStyle: {
                backgroundColor: '#003497',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
            },
            headerRight: () => (
                <View>
                    <TouchableOpacity onPress={()=>setModalVisible(true)}>
                        <Image
                            source={require('../image/profile.gif')}
                            style={{ width: 35, height: 35 }}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    
    const handleBoardList=()=>{
        navigation.navigate('TabBottomMain');
    };
    const top5Board = boards.slice(0,5);

    const drawerModal=(
        <View style={styles.overlayBox}>
            <TouchableOpacity>
                <Text>안녕</Text>
            </TouchableOpacity>
        </View>
    );

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
            {modalVisible && ( //드로어 네비게이터
            <View style={styles.drawerBackground}>
            <Pressable style={styles.overlayBackground}
            onPress={()=>setModalVisible(false)}>
                <View>
                    {drawerModal}
                </View>
            </Pressable>
            </View>
            )}
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
    drawerBackground:{
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width, // 화면 너비
        height: Dimensions.get('window').height,    

    },
    overlayBackground: {
        width: Dimensions.get('window').width, // 화면 너비
        height: Dimensions.get('window').height,
        position: 'absolute',
        marginTop:-24,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // 어두운 배경
      },
      overlayBox: {
        position:'absolute',
        width: 256,
        height: Dimensions.get('window').height,
        right:0,
        backgroundColor: 'white',
        justifyContent: 'center',
        //alignItems: 'center',
      },
});
export default MainTest;