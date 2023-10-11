import React from "react";
import Loading from './src/Loading';
import MainTest from './src/MainTest';
import Main from './src/Main';
import Login from './src/Login';
import LoginScreen from './src/LoginScreen';
import Sign from './src/Sign';
import TabBottomMain from "./src/TabBottomMain";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const RootStack = createNativeStackNavigator();
const BottomStack=createNativeStackNavigator();

function App(){
    return(
        
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name="LoginScreen" component={LoginScreen} />
                <RootStack.Screen name="Loading" component={Loading} />
                <RootStack.Screen name="Login" component={Login} />
                <RootStack.Screen name="Sign" component={Sign} />
                <RootStack.Screen name="MainTest" component={MainTest} 
                 options={{title :'메인화면',}}
                />
            </RootStack.Navigator>
        </NavigationContainer>

    );
}
export default App;