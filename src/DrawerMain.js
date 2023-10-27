import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerProfileImage from './DrawerProfileImage';
import MainTest from './MainTest';

const Drawer=createDrawerNavigator();

function DrawerMain(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="ProfileImage" component={DrawerProfileImage} />
        </Drawer.Navigator>
    );
}
export default DrawerMain;
