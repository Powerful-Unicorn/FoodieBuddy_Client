import {NavigationContainer} from '@react-navigation/native';
import './gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/states/store'; // Redux 스토어 가져오기
import RootNavigator from './src/navigations/root/RootNavigator';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      {/* Redux Provider로 감싸기 */}
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
