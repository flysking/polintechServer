// App.tsx
import React, {useState} from 'react';
import {View, Button, SafeAreaView} from 'react-native';
import CreateBoard from './CreateBoard';
import ViewBoards from './ViewBoard';

const Main = () => {
  const [activeScreen, setActiveScreen] = useState<
    'login' | 'createBoard' | 'viewBoards'
  >('login');

  return (
    <SafeAreaView>
    <View style={{flex: 1}}>
      {activeScreen === 'createBoard' && <CreateBoard />}
      {activeScreen === 'viewBoards' && <ViewBoards />}
      
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Button title="Login" onPress={() => setActiveScreen('login')} />
        <Button
          title="Create Board"
          onPress={() => {console.log("보드버튼누름");setActiveScreen('createBoard')}}
        />
        <Button
          title="View Boards"
          onPress={() => setActiveScreen('viewBoards')}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

export default Main;
