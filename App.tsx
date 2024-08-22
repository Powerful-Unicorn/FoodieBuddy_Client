import {NavigationContainer} from '@react-navigation/native';
import './gesture-handler';
import React from 'react';

import RootNavigator from './src/navigations/root/RootNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
