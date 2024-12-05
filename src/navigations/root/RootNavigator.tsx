import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import {RootState} from '../../states/store';

export type RootStackParamList = {
  AuthStack: undefined; // AuthStackNavigator를 나타냅니다
  MainDrawerNavigator: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  DRFirst: undefined;
  DRSecond: {
    selectedDR: string;
    dietRestrictions: {
      meat: string;
      egg: boolean;
      dairy: string;
      seafood: string;
      nuts: string;
      gluten: boolean;
      fruit: string;
      vegetable: string;
      other: string;
    };
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      <RootStack.Screen
        name="MainDrawerNavigator"
        component={MainDrawerNavigator}
      />
    </RootStack.Navigator>
  );
}

export default RootNavigator;
