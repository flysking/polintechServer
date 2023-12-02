import React, {useState, useEffect,useLayoutEffect} from 'react';
import {ScrollView,Dimensions,Image,KeyboardAvoidingView,View, Text, FlatList, TouchableOpacity,StyleSheet, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import DrawerModal from './DrawerModal';
import ImageButton from './ImageButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
function MainTest ({navigation,route}) {
    const {userInfo}=route.params;
    console.log(userInfo.id);  
    const [boards, setBoards] = useState([]);
    const [notices, setNotices]=useState([]);
    const [category,setCategory]=useState('전체');
    const [modalVisible,setModalVisible]=useState(false);

    useEffect(() => {
        const fetchBoards = async () => {
            //선택한 카테고리에 해당하는 게시글을 불러옵니다.
        if(category==='전체'){
            console.log('전체 게시글 불러오기');
            try {
                const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList');
                const json = await response.json();
                if (json.success) {
                setBoards(json.boards);
                }
            } catch (error) {
                console.error(error);
            }
        }else if(category==='학과게시판'){
            console.log('학과 카테고리 선택함');
            try {
                const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList/${category}`);
                const json = await response.json();
                if (json.success) {
                setBoards(json.boards);
                }
            } catch (error) {
                console.error(error);
            }
        }else if(category==='익명게시판'){
            console.log('익명 카테고리 선택함');
            try {
                const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList/${category}`);
                const json = await response.json();
                if (json.success) {
                setBoards(json.boards);
                }
            } catch (error) {
                console.error(error);
            }
        }
        }; 
        fetchBoards();
    }, [category]); 

    useEffect(()=>{
        const fetchNotices=async()=>{
            try {
                const response = await fetch('https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList/학사일정');
                const json = await response.json();
                if (json.success) {
                setNotices(json.boards);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchNotices();
    },[]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"",
            headerBackVisible: false,
            headerStyle: {
                backgroundColor: '#003497',
            },
            headerLeft: () => (
                <View>
                    <Image
                        source={require('../image/Logo.png')}
                        style={{width:80,height:30}}
                    />
                </View>
            ),
            headerRight: () => (
                <View>
                    <TouchableOpacity onPress={()=>setModalVisible(true)}>
                            <Icon name="dehaze" style={styles.icon}color={'#ffffff'} size={25} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const handleBoardList=()=>{
        navigation.navigate('TabBottomMain',{category:category});
    };
    const handleNoticeList=()=>{
        navigation.navigate('TabBottomMain',{category:'학사일정'});
    };
    const formatDate = (dateString) => {
        return moment(dateString).format('YYYY-MM-DD');
      };

    const top5Board = boards.slice(0,4);
    const top5Notice= notices.slice(0,4);

      // 그림자 효과를 정의한 상수
    const shadowStyle = {
    //IOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },  //이동거리
    shadowOpacity: 0.8, //투명도
    shadowRadius: 4,    //흐린 정도
    //안드로이드
    elevation: 6,
  };

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={{display:'flex', width:'100%',height:'100%',}}>
            <View style={styles.topMenu}>
                <TouchableOpacity onPress={()=>setCategory('전체')}
                style={styles.category}
                >
                    <Text style={{color:'#000000'}}>전체</Text>
                </TouchableOpacity >
                    <Text style={{color:'gray',fontSize:15}}>|</Text>
                <TouchableOpacity onPress={()=>setCategory('학과게시판')}>
                    <Text style={{color:'#000000'}}>학과</Text>
                </TouchableOpacity>
                    <Text style={{color:'gray',fontSize:15}}>|</Text>
                <TouchableOpacity onPress={()=>setCategory('익명게시판')}>
                    <Text style={{color:'#000000'}}>익명</Text>
                </TouchableOpacity>
            </View>

        {/* 스크롤뷰랑 리스트 구분선 */}
        <View
            style={{
            borderBottomWidth: 1,
            borderColor: '#D9D9D9',
            ...shadowStyle, //그림자 효과 추가
            }}
        />
            <View style={styles.containerWrap}>
                <View style={styles.wrapTop}>
                    <Text style={{ marginTop:15, marginLeft:10, fontSize:18, color:'#003497', fontWeight:'bold' }}>{category}</Text>
                    <TouchableOpacity onPress={handleBoardList}>
                        <Icon name="arrow-forward-ios" style={{ marginTop:15,}}color={'#000000'} size={18}/>
                    </TouchableOpacity>
                </View> 
                <View style={styles.listContainer}>
                    <FlatList 
                        data={top5Board}
                        keyExtractor={item => item.board_id.toString()}
                        scrollEnabled={false}
                        renderItem={({item}) => (
                    <View style={styles.list}>
                        <TouchableOpacity onPress={()=>navigation.navigate('BoardDetail', { boardId: item.board_id })} style={{flexDirection:'column'}}>
                                <Text style={{ color:'#000000', fontSize: 14 , fontWeight: 'bold' }}>{item.board_title}</Text>
                                <Text style={{fontSize:12,color:'gray',marginTop:5,}}>{item.member_name}  {formatDate(item.board_postdate)}</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                    />
                </View>
            </View>


            <View style={styles.containerWrap}>
                <View style={styles.wrapTop}>
                    <Text style={{ marginTop:15, marginLeft:10, fontSize:18, color:'#003497', fontWeight:'bold' }}>학사 일정</Text>
                    <TouchableOpacity onPress={handleNoticeList}>
                        <Icon name="arrow-forward-ios" style={{ marginTop:15,}}color={'#000000'} size={18}/>
                    </TouchableOpacity>
                </View> 
                <View style={styles.listContainer2}>
                <FlatList 
                        data={top5Notice}
                        keyExtractor={item => item.board_id.toString()}
                        scrollEnabled={false}
                        renderItem={({item}) => (
                    <View style={styles.list}>
                        <TouchableOpacity onPress={()=>navigation.navigate('BoardDetail', { boardId: item.board_id })} style={{flexDirection:'column'}}>
                            <Text style={{ color:'#000000', fontSize: 14 , fontWeight: 'bold' }}>{item.board_title}</Text>
                            <Text style={{fontSize:12,color:'gray',marginTop:5,}}>{item.member_name}  {formatDate(item.board_postdate)}</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                    />
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={{marginBottom:40,}}>
                    <Text style={{color:'gray',fontSize:14,textAlign:'center'}}>
                        고객 상담 접수 : 카카오톡 @Polintech
                    </Text>
                </View>

                <Image
                    source={require('../image/KopoLogo.png')}
                    style={{width:150,height:45}}
                    resizeMode='contain'
                />
                <Text style={{color:'gray',fontSize:10,textAlign:'center'}}>
                © Copyright 2023 by Team Polintech{'\n'}
                All rights reserved.
                </Text>

            </View>
            </ScrollView>
            <ImageButton
                    onPress={() => {
                    navigation.navigate('CreateBoard');
                    }}
                    source={require('../image/write.png')}
                />
            {modalVisible && ( //드로어 네비게이터
            <View style={styles.drawerBackground}>
            <Pressable style={styles.overlayBackground}
            onPress={()=>setModalVisible(false)}>
                <View>
                    <DrawerModal />
                </View>
            </Pressable>
            </View>
            )}
        </SafeAreaView>

        
    ); 
};
const styles=StyleSheet.create({
    bottom:{
        marginTop:40,
        marginBottom:30,
        alignItems:'center'
    },
    block:{
        width:'100%',
        height:'100%',
    },
    title:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'left',
        
    },
    container:{
        backgroundColor:'#e8e8e8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topMenu:{
        backgroundColor:'#ffffff',
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
    containerWrap:{
        marginTop:20,
        backgroundColor:'#ffffff',
        borderWidth:1.5,
        borderColor: '#ffffff', 
        borderRadius: 10,
        marginHorizontal:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },  //이동거리
        shadowOpacity: 0.8, //투명도
        shadowRadius: 4,    //흐린 정도
        //안드로이드
        elevation: 6,

    },
    wrapTop:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:15,

    },
    listContainer:{
        marginHorizontal:10,
         height:265,

    },
    listContainer2:{
        marginHorizontal:10,
        height:200,
    },
    list:{
        flex:1,
        width:'90%',
        paddingHorizontal:5,
        paddingVertical:10,
        marginTop:4,
        marginLeft:10,
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
});
export default MainTest;