import React, {useState, useEffect,useLayoutEffect} from 'react';
import moment from 'moment';
import {SafeAreaView,View, Text, FlatList, TouchableOpacity,StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
function TabHome({navigation}){
    const [boards, setBoards] = useState([]);
    const route=useRoute();
    const category=route.params.category;
    const [subcategory,setSubcategory]=useState('');
    const [noCategory,setNoCategory]=useState(false);
    console.log(category);
    const categorySub_Options1 = ['자격증', '동아리','질문'];
    const categorySub_Options2 = ['익명게시판'];
    const categorySub_Options3=['학사일정','식단표', '학과공지'];

    useLayoutEffect(() => {
        navigation.setOptions({
          title: category,
          headerStyle: {
            backgroundColor: '#003497',
          },
          headerTintColor: '#ffffff',
        });
      }, [navigation]);

    useEffect(() => {
        //라우트 객체에서 카테고리 값을 받아와 어떤 게시판을 보여줄지 판단합니다.
        const fetchBoards = async () => {
            if(category==='전체게시판'){
                try {
                    const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList/${category}`);
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

    useEffect(() => {
        const fetchBoards = async () => {
            if(category==='전체게시판'){
                try {
                    const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardList/${category}`);
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
    }, [subcategory]);

    const formatDate = (dateString) => {
        return moment(dateString).format('MM-DD');
      };
    const btnSubCate=(subcategory)=>{
        console.log('서브카테고리 설정하기',subcategory);
        setSubcategory(subcategory);
    };

    return (
        //학과 게시판을 제외하고, 해당 게시판에 지정된 서브 카테고리들을 선택해 게시글을 볼 수 있도록 합니다.
        //충돌 현상을 고치지 못해 최종 결과물에선 제외하였습니다.
        <SafeAreaView style={{flex:1, backgroundColor:'#ffffff'}}>
        <View style={{width:'100%'}}>
        {category !== '학과게시판' ?(
            <View style={styles.subcategoryBar}>
                    {category ==='전체게시판' &&
                     categorySub_Options1.map((option,index)=>(
                        <TouchableOpacity style={styles.topBar} key={index} onPress={()=>btnSubCate(option)}>
                            <Text style={{fontSize:15,color:'#000000',marginHorizontal:15,}}>{option}</Text>
                        </TouchableOpacity>
                     ))}
                    {category ==='익명게시판' &&
                     categorySub_Options2.map((option,index)=>(
                        <TouchableOpacity style={styles.topBar} key={index} onPress={()=>btnSubCate(option)}>
                            <Text style={{fontSize:15,color:'#000000',marginHorizontal:15,}}>{option}</Text>
                        </TouchableOpacity>
                     ))}
                    {category ==='학사일정' &&
                     categorySub_Options3.map((option,index)=>(
                        <TouchableOpacity style={styles.topBar} key={index} onPress={()=>btnSubCate(option)}>
                            <Text style={{fontSize:15,color:'#000000',marginHorizontal:15,}}>{option}</Text>
                        </TouchableOpacity>
                     ))}
            </View>
            ):null}
        </View>
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
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'black', fontSize:20}}>[{item.board_subcategory}]</Text>
                        <Text style={{color:'black', fontSize:20}}> {item.board_title}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'gray',marginLeft:5}}>{item.member_name} 조회 {item.board_hits} 작성일 {formatDate(item.board_postdate)} </Text>
                    </View>
                </TouchableOpacity>
            </View>
            )}
            />
            )
            )}
            
    </View>
    </SafeAreaView>
    );
};

const styles=StyleSheet.create({
    subcategoryBar:{
        zIndex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        position:'absolute',
        width:'100%',
        height:40,
        top:0,
        backgroundColor:'#ffffff',
        borderBottomWidth:1,
        borderColor:'gray',
        marginBottom:20,
    },
    block:{
        flex:1,
        marginTop:20,
    },
    topBar:{
        justifyContent:'center',
        alignItems:'center',

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