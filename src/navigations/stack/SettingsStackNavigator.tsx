import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsFirstScreen from '../../screens/settings/SettingsFirstScreen';
import SettingsSecondScreen from '../../screens/settings/SettingsSceondScreen';
import {colors} from '../../constants';

export type SettingsStackParamList = {
  SettingsFirstScreen: undefined;
  SettingsSecondScreen: {selectedDR: string[]};
};

const Stack = createStackNavigator<SettingsStackParamList>();

function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="SettingsFirstScreen"
        component={SettingsFirstScreen}
        options={{title: 'Settings - Step 1'}}
      />
      <Stack.Screen
        name="SettingsSecondScreen"
        component={SettingsSecondScreen}
        options={{title: 'Settings - Step 2'}}
      />
    </Stack.Navigator>
  );
}

export default SettingsStackNavigator;
