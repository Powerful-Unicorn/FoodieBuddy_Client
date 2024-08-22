import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import OnboardingScreen from '../../screens/OnboardingScreen';
import LoginScreen from '../../screens/LoginScreen';
import {authNavigations} from '../../constants';
import SignupScreen from '../../screens/SignupScreen';

export type AuthStackParamList = {
  [authNavigations.ONBOARDING]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNavigations.ONBOARDING}
        component={OnboardingScreen}
      />
      <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen} />
      <Stack.Screen name={authNavigations.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
