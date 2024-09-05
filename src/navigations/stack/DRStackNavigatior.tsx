import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {drNavigations} from '../../constants';
import DRFirstScreen from '../../screens/dr/DRFirstScreen';
import DRSecondScreen from '../../screens/dr/DRSecondScreen';

export type DRStackParamList = {
  [drNavigations.DRFIRST]: undefined;
  [drNavigations.DRSECOND]: undefined;
};

const Stack = createStackNavigator<DRStackParamList>();

function DRStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {shadowColor: 'white'},
      }}>
      <Stack.Screen
        name={drNavigations.DRFIRST}
        component={DRFirstScreen}
        options={{title: 'Dietary Restriction Setting'}}
      />
      <Stack.Screen
        name={drNavigations.DRSECOND}
        component={DRSecondScreen}
        options={{title: 'Dietary Restriction Setting'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default DRStackNavigator;
