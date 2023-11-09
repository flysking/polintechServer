import React from 'react';
import TabHome from "./TabHome";
import TabNotice from "./TabNotice";
import TabPopular from "./TabPopular";
import TabSearch from "./TabSearch";
import TabWrite from "./TabWrite";
import CreateBoard from './CreateBoard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab=createBottomTabNavigator();

function TabBottomMain({route}){
    //const category = route.params;

    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={TabHome}
                options={{
                    title:"홈",
                    headerShown:false,
                    tabBarIcon:({color,size})=>(
                        <Icon name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Notice" component={TabNotice}
                options={{
                    title:"공지",
                    headerShown:false,
                    tabBarIcon:({color,size})=>(
                        <Icon name="announcement" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Popular" component={TabPopular}
                options={{
                    title:"인기",
                    headerShown:false,
                    tabBarIcon:({color,size})=>(
                        <Icon name="star" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Search" component={TabSearch} 
                options={{
                    title:"검색",
                    headerShown:false,
                    tabBarIcon:({color,size})=>(
                        <Icon name="search" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Write" component={CreateBoard} 
                options={{
                    title:"글쓰기",
                    headerShown:false,
                    
                    tabBarIcon:({color,size})=>(
                        <Icon name="edit" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default TabBottomMain;