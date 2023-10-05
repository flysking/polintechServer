import React from 'react';
import TabHome from "./TabHome";
import TabNotice from "./TabNotice";
import TabPopular from "./TabPopular";
import TabSearch from "./TabSearch";
import TabWrite from "./TabWrite";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab=createBottomTabNavigator();

function TabBottomMain(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={TabHome}/>
            <Tab.Screen name='Notice' component={TabNotice} />
            <Tab.Screen name='Popular' component={TabPopular} />
            <Tab.Screen name='Search' component={TabSearch} />
            <Tab.Screen name='Write' component={TabWrite} />
        </Tab.Navigator>
    );
}
export default TabBottomMain;