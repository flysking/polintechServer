import React from "react";
import Loading from './src/Loading';
import MainTest from './src/MainTest';
import Main from './src/Main';
import Login from './src/Login';
import Sign from './src/Sign';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(){

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sign" component={Sign} />
                <Stack.Screen name="MainTest" component={MainTest} />
            </Stack.Navigator>
        </NavigationContainer>


    );
}
export default App;