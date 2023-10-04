import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function MainTest(){

    const [boards, setBoards] = useState([]);
    
    useEffect(() => {
        const fetchBoards = async () => {
        try {
            const response = await fetch('https://port-0-polintechserver-ac2nlkzlq8aw.sel4.cloudtype.app/getAllBoards');
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

    return(
        <SafeAreaView>
            <View>
                <Text>
                    상단 뷰

                </Text>
            </View>

            <View>
        <FlatList
            data={boards}
            keyExtractor={item => item.board_id.toString()}
            renderItem={({item}) => (
            <View>
                <Text>{item.board_title}</Text>
                <Text>{item.board_content}</Text>
                <Text>{item.board_mid}</Text>
                <Text>{item.board_category}</Text>
          </View>
        )}
      />
    </View>
    </SafeAreaView>

    );

 }
export default MainTest;