import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <StackNavigator />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
