import {createDrawerNavigator} from '@react-navigation/drawer';
import ChatScreen from '../../screens/ChatScreen';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Chat" component={ChatScreen} />
    </Drawer.Navigator>
  );
}
export default MainDrawerNavigator;
