import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <View style={{ flex: 1 }}>
    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
    />
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  </View>
);

export default App;
