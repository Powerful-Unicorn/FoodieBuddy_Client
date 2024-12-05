import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import OnboardingScreen from '../../screens/auth/OnboardingScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignupScreen from '../../screens/auth/SignupScreen';
import DRFirstScreen from '../../screens/dr/DRFirstScreen';
import DRSecondScreen from '../../screens/dr/DRSecondScreen';
import {RootStackParamList} from '../root/RootNavigator';
import {StackScreenProps} from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {shadowColor: 'white'},
      }}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerTitle: '', headerShown: false}}
      />

      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="DRFirst"
        component={DRFirstScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DRSecond"
        component={DRSecondScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
