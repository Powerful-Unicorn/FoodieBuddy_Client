import {createDrawerNavigator} from '@react-navigation/drawer';
import ChatScreen from '../../screens/chat/ChatScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import BookmarksScreen from '../../screens/bookmarks/BookmarksScreen';
import {colors, mainNavigations} from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RouteProp} from '@react-navigation/native';
import CustomDrawerContent from './CustomDrawerContent';

export type MainDrawerParamList = {
  [mainNavigations.CHAT]: undefined;
  [mainNavigations.BOOKMARKS]: undefined;
  [mainNavigations.SETTINGS]: undefined;
};
const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(route: RouteProp<MainDrawerParamList>, focused: boolean) {
  let iconName = '';
  switch (route.name) {
    case mainNavigations.CHAT: {
      iconName = 'chat';
      break;
    }
    case mainNavigations.BOOKMARKS: {
      iconName = 'bookmark';
      break;
    }
    case mainNavigations.SETTINGS: {
      iconName = 'settings';
      break;
    }
  }
  return (
    <MaterialIcons
      name={iconName}
      size={18}
      color={focused ? colors.ORANGE_800 : colors.BLACK}
    />
  );
}
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        drawerType: 'front',
        headerTintColor: colors.ORANGE_800,
        headerTitleStyle: {fontSize: 30},
        headerStyle: {height: 120},
        drawerActiveTintColor: colors.ORANGE_800,
        drawerInactiveTintColor: colors.GRAY_700,
        //drawerActiveBackgroundColor 하이라이트 색깔

        drawerStyle: {backgroundColor: colors.WHITE},
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused),
      })}>
      <Drawer.Screen
        name={mainNavigations.CHAT}
        component={ChatScreen}
        options={{swipeEnabled: false}} // swipe 방지
      />
      <Drawer.Screen
        name={mainNavigations.BOOKMARKS}
        component={BookmarksScreen}
      />
      <Drawer.Screen
        name={mainNavigations.SETTINGS}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
}
export default MainDrawerNavigator;
