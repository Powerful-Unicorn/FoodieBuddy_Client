import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import DRStackNavigator from '../stack/DRStackNavigatior';
import {View} from 'react-native';

function RootNavigator() {
  const isLoggedIn = true; //여기
  //return <>{isLoggedIn ? <MainDrawerNavigator /> : <DRStackNavigator />}</>;
  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
