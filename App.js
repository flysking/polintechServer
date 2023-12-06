import {React,useEffect} from 'react';
import Loading from './src/Loading';
import Main from './src/Main';
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
import IdRecover from './src/IdRecover';
import PwAuthCode from './src/PwAuthCode';
import PwEmailAuth from './src/PwEmailAuth';
import PwRecover from './src/PwRecover';
import PwUpdate from './src/PwUpdate';
import MyPage from './src/MyPage';

import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateBoard from './src/CreateBoard';

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
                <RootStack.Screen name="IdRecover" component={IdRecover} 
                options={{headerShown:false}}/>
                <RootStack.Screen name="PwAuthCode" component={PwAuthCode} 
                options={{headerShown:false}}/>
                <RootStack.Screen name="PwEmailAuth" component={PwEmailAuth} 
                options={{headerShown:false}}/>                               
                <RootStack.Screen name="PwRecover" component={PwRecover}
                options={{title:"비밀번호 복구"}}/>
                <RootStack.Screen name="PwUpdate" component={PwUpdate} 
                options={{headerShown:false}}/>
                <RootStack.Screen name="MainTest" component={Main} 
                />
                <RootStack.Screen name="MyPage" component={MyPage} />
                <RootStack.Screen name="StudentIDC" component={StudentIDC}
                options={{title:"학생증"}}
                />
                <RootStack.Screen name="BoardDetail" component={BoardDetail}
                options={{title:"게시글 상세보기"}}
                />
                <RootStack.Screen name="BoardEdit" component={BoardEdit}
                options={{title:"게시글 수정하기"}}
                />
                <RootStack.Screen name="ReplyAdd" component={ReplyAdd}
                options={{title:"답글 추가"}}/>
                <RootStack.Screen name="ReplyEdit" component={ReplyEdit}
                options={{title:"답글 수정"}}
                />
                <RootStack.Screen name="CommentEdit" component={CommentEdit}
                options={{title:"댓글 수정"}}
                />
                <RootStack.Screen name="TabBottomMain" component={TabBottomMain}
                options={{headerShown:false}}
                />  
                <RootStack.Screen name="CreateBoard" component={CreateBoard} 
                /> 
            </RootStack.Navigator>
        </NavigationContainer>

    );
}
export default App;