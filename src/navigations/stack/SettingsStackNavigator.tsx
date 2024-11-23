import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsFirstScreen from '../../screens/settings/SettingsFirstScreen';
import SettingsSecondScreen from '../../screens/settings/SettingsSceondScreen';
import {colors} from '../../constants';
import SettingsMainScreen from '../../screens/settings/SettingsMainScreen';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export type SettingsStackParamList = {
  SettingsMainScreen: undefined;
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
        name="SettingsMainScreen"
        component={SettingsMainScreen}
        options={{title: 'Settings'}}
      />
      <Stack.Screen
        name="SettingsFirstScreen"
        component={SettingsFirstScreen}
      />
      <Stack.Screen
        name="SettingsSecondScreen"
        component={SettingsSecondScreen}
      />
    </Stack.Navigator>
  );
}

export default SettingsStackNavigator;
