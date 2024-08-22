import {createDrawerNavigator} from '@react-navigation/drawer';
import ChatScreen from '../../screens/ChatScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import BookmarksScreen from '../../screens/BookmarksScreen';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
export default MainDrawerNavigator;
