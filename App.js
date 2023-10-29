import React from 'react';
import Loading from './src/Loading';
import MainTest from './src/MainTest';
import CheckLogin from './src/CheckLogin';
import BoardDetail from './src/BoardDetail';
import LoginScreen from './src/LoginScreen';
import Sign from './src/Sign';
import UpdateCert from './src/UpdateCert';
import CheckIsCert from './src/CheckIsCert';
import Certificate from './src/Certificate';
import TabBottomMain from "./src/TabBottomMain";
import BoardEdit from './src/BoardEdit';
import ReplyAdd from './src/ReplyAdd';
import ReplyEdit from './src/ReplyEdit';
import CommentEdit from './src/CommentEdit';
import StudentIDC from './src/StudentIDC';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

function App(){
    return(
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name="Loading" component={Loading} 
                options={{headerShown:false}}/>
                <RootStack.Screen name="CheckLogin" component={CheckLogin}
                options={{headerShown:false}} />
                <RootStack.Screen name="LoginScreen" component={LoginScreen}
                options={{headerShown:false}} />
                <RootStack.Screen name="CheckIsCert" component={CheckIsCert}
                options={{headerShown:false}} />
                <RootStack.Screen name="Certificate" component={Certificate} 
                options={{headerShown:false}}/>
                <RootStack.Screen name="UpdateCert" component={UpdateCert} 
                options={{headerShown:false}}/>
                <RootStack.Screen name="Sign" component={Sign} 
                options={{headerShown:false}}/>
                <RootStack.Screen name="StudentIDC" component={StudentIDC}
                />
                <RootStack.Screen name="MainTest" component={MainTest} 
                />
                <RootStack.Screen name="BoardDetail" component={BoardDetail}
                options={{title:"게시글 상세보기"}}
                />
                <RootStack.Screen name="BoardEdit" component={BoardEdit}
                options={{title:"게시글 수정하기"}}
                />
                <RootStack.Screen name="ReplyAdd" component={ReplyAdd}
                options={{title:"댓글 추가"}}/>
                <RootStack.Screen name="ReplyEdit" component={ReplyEdit}
                options={{title:"댓글 수정"}}
                />
                <RootStack.Screen name="CommentEdit" component={CommentEdit}
                options={{title:"게시글 상세보기"}}
                />
                <RootStack.Screen name="TabBottomMain" component={TabBottomMain}
                options={{title:"게시판"}}
                />    
            </RootStack.Navigator>
        </NavigationContainer>

    );
}
export default App;