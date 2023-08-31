// App.tsx
import React, {useState} from 'react';
import {View, Button} from 'react-native';
import Login from './src/Login';
import CreateBoard from './src/CreateBoard';
import ViewBoards from './src/ViewBoard';

const App = () => {
  const [activeScreen, setActiveScreen] = useState<
    'login' | 'createBoard' | 'viewBoards'
  >('login');

  return (
    <View style={{flex: 1}}>
      {activeScreen === 'login' && <Login />}
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
          onPress={() => setActiveScreen('createBoard')}
        />
        <Button
          title="View Boards"
          onPress={() => setActiveScreen('viewBoards')}
        />
      </View>
    </View>
  );
};

export default App;
