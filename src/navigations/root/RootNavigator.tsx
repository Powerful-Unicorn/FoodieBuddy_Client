import AuthStackNavigator from '../AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import {View} from 'react-native';

function RootNavigator() {
  const isLoggedIn = true;

  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
