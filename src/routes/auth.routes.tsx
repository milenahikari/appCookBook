import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        cardStyle: { backgroundColor: '#C72828' },
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default Routes;
