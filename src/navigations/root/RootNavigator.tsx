import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import {RootState} from '../../states/store'; // Redux 상태 타입 가져오기

const RootStack = createStackNavigator();

function RootNavigator() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // 로그인 상태 확인

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <RootStack.Screen name="MainDrawer" component={MainDrawerNavigator} />
      ) : (
        <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
}

export default RootNavigator;
