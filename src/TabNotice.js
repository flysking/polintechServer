import {React, useLayoutEffect,useState,useEffect} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
function TabNotice({navigation}){
  
  const [boards, setBoards] = useState([]);
  const route=useRoute();
  const category=route.params.category;
  const [noCategory,setNoCategory]=useState(false);
    console.log(category);
    useLayoutEffect(() => {
        navigation.setOptions({
          //tabBarLabel:()=>null,
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
                    const response = await fetch('http://10.0.2.2:3000/BoardListNotice');
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
                    const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardListNotice/${category}`);
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
            <Text>공지 사항 준비 중입니다~</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    block:{},
});

export default TabNotice;