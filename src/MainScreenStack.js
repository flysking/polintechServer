import React from "react";
import Loading from './Loading';
import MainTest from './MainTest';
import Login from './Login';
import Sign from './Sign';
import BoardList from "./BoardList";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainStack=createNativeStackNavigator();

function MainScreenStack(){
    return(
        <MainStack.Navigator>
                <MainStack.Screen name="Loading" component={Loading} />
                <MainStack.Screen name="Login" component={Login} />
                <MainStack.Screen name="Sign" component={Sign} />
                <MainStack.Screen name="MainTest" component={MainTest} 
                 options={{title :'메인화면',}}
                />
                <MainStack.Screen name="BoardList" component={BoardList} />
        </MainStack.Navigator>
    );
}
export default MainScreenStack;