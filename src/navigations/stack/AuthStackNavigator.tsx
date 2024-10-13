import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import OnboardingScreen from '../../screens/auth/OnboardingScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import {authNavigations, colors} from '../../constants';
import SignupScreen from '../../screens/auth/SignupScreen';
import DRFirstScreen from '../../screens/dr/DRFirstScreen';
import DRSecondScreen from '../../screens/dr/DRSecondScreen';

export type AuthStackParamList = {
  [authNavigations.ONBOARDING]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
  [authNavigations.DRFIRST]: undefined;
  [authNavigations.DRSECOND]: {
    selectedDR: string; // Keep the selectedDR parameter
    dietRestrictions: {
      // Add dietRestrictions parameter
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

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {shadowColor: 'white'},
      }}>
      <Stack.Screen
        name={authNavigations.ONBOARDING}
        component={OnboardingScreen}
        options={{headerTitle: '', headerShown: false}}
      />
      <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen} />
      <Stack.Screen name={authNavigations.SIGNUP} component={SignupScreen} />
      <Stack.Screen
        name={authNavigations.DRFIRST}
        component={DRFirstScreen}
        options={{
          headerTitle: 'Dietary Restriction',
          headerLeft: () => null,
          headerStyle: {
            borderBottomColor: colors.ORANGE_200,
            borderBottomWidth: 3,
          },
        }}
      />
      <Stack.Screen
        name={authNavigations.DRSECOND}
        component={DRSecondScreen}
        options={{
          headerTitle: 'Ingredients you should avoid',

          headerLeft: () => null,
          headerStyle: {
            //backgroundColor: colors.GRAY_200,
            borderBottomColor: colors.ORANGE_200,
            borderBottomWidth: 3,
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
