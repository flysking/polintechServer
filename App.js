import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Loading from './src/Loading';
import MainTest from './src/MainTest';
import Main from './src/Main';
import Login from './src/Login';
import BoardDetail from './src/BoardDetail';
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
            <RootStack.Screen name="Loading" component={Loading} 
                options={{headerShown:false}}/>
                <RootStack.Screen name="LoginScreen" component={LoginScreen}
                options={{headerShown:false}} />
                <RootStack.Screen name="Sign" component={Sign} 
                options={{headerShown:false}}/>
                <RootStack.Screen name="MainTest" component={MainTest} 
                 options={{title :'Polintech',headerBackVisible:false,
                    headerStyle:{
                        backgroundColor:'#003497'
                    },
                    headerTitleStyle:{
                        fontWeight:'bold',
                        color:'white',
                    },
                    headerRight:()=>(
                        <View>
                            <TouchableOpacity>
                            <Image
                            source={require('./image/profile.gif')}
                            style={{ width:35, height:35}}
                            />
                            </TouchableOpacity>
                        </View>
                    )
                }}
                />

                {/*
                <RootStack.Screen name="BoardDetail" component={BoardDetail}
                options={{title:"게시글 상세보기"}}
                />
                 */}
                <RootStack.Screen name="TabBottomMain" component={TabBottomMain}
                options={{title:"게시판"}}
                />
            </RootStack.Navigator>
        </NavigationContainer>

    );
}
export default App;