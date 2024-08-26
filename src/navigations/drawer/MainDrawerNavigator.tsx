import {createDrawerNavigator} from '@react-navigation/drawer';
import ChatScreen from '../../screens/chat/ChatScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import BookmarksScreen from '../../screens/bookmarks/BookmarksScreen';
import {colors, mainNavigations} from '../../constants';

export type MainDrawerParamList = {
  [mainNavigations.CHAT]: undefined;
  [mainNavigations.BOOKMARKS]: undefined;
  [mainNavigations.SETTINGS]: undefined;
};
const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        headerTintColor: colors.ORANGE_800,
        headerTitleStyle: {fontSize: 30},
        headerStyle: {height: 120},
      }}>
      <Drawer.Screen name={mainNavigations.CHAT} component={ChatScreen} />
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
