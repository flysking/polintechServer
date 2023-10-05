import React from "react";
import MainTest from "./MainTest";
import TabBottomMain from "./TabBottomMain";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

function BoardList(){
    return(
            <RootStack.Navigator>
                <RootStack.Screen name="MainTest" component={MainTest}
                    options={{headerShown:false}}
                />
                <RootStack.Screen
                    name="Bottom"
                    component={TabBottomMain}
                    options={{headerShown:false}}
                />
            </RootStack.Navigator>
    );
}
export default BoardList;