import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

function TabSearch({navigation}) {
  const [boards, setBoards] = useState([]);
  const route = useRoute();
  const category = route.params.category;
  console.log(category);

  const [selectedOption, setSelectedOption] = useState('title'); // 선택된 옵션 상태
  const [searchText, setSearchText] = useState(''); // 검색어 입력 상태

  useLayoutEffect(() => {
    navigation.setOptions({
      //tabBarLabel: () => null,
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTintColor: 'white',
    });
  }, [navigation]);

  // 검색 버튼 클릭 핸들러
  const handleSearch = async () => {
    // const word = searchText;
    // const subcategory = selectedOption;

    // // JSON 형태로 데이터를 묶음
    // const searchData = {
    //   word: word,
    //   subcategory: subcategory,
    // };
    console.log(searchText);
    console.log(selectedOption);
    console.log(category);
    try {
      const response = await fetch(`https://port-0-polintechservercode-ac2nlkzlq8aw.sel4.cloudtype.app/BoardSearchList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: searchText,
          subcategory: selectedOption,
          category: category,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setBoards(data.boards);
        console.log('검색 결과:', data);
        // 검색 결과를 처리하세요.
      } else {
        console.error('검색 요청 실패');
      }
    } catch (error) {
      console.error('검색 요청 오류:', error);
    }
  };
  const formatDate = dateString => {
    return moment(dateString).format('MM-DD');
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={itemValue => setSelectedOption(itemValue)}
          style={styles.picker}>
          <Picker.Item label="제목" value="title" />
          <Picker.Item label="내용" value="content" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="검색어를 입력하세요"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>검색</Text>
        </TouchableOpacity>
      </View>
      {boards && boards.length > 0 ? (
        <FlatList
          data={boards}
          style={styles.block}
          keyExtractor={item => item.board_id.toString()}
          renderItem={({item}) => (
            <View style={styles.list}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BoardDetail', {boardId: item.board_id})
                }>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'black', fontSize: 20}}>
                    {item.board_title} [{item.board_hits}]
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'gray', marginLeft: 5}}>
                    {item.board_mid} 조회 {item.board_hits} 작성일{' '}
                    {formatDate(item.board_postdate)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>검색된 게시글이 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginRight: 8,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
  },
  block: {
    flex: 1,
  },
  list: {
    width: '90%',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginLeft: 10,
    borderTopColor: '#D8D8D8',
    borderTopWidth: 1,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
  },
});
export default TabSearch;