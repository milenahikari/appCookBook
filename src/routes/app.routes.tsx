import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppBottomRoutes from './appbottom.routes';
import DetailRecipe from '../pages/DetailRecipe';
import CreateSuccess from '../pages/CreateSuccess';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Home"
      component={AppBottomRoutes}
      options={{
        cardStyle: { backgroundColor: '#fff' },
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="DetailRecipe"
      component={DetailRecipe}
      options={{
        cardStyle: { backgroundColor: '#fff' },
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="CreateSuccess"
      component={CreateSuccess}
      options={{
        cardStyle: { backgroundColor: '#c72828' },
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default Routes;
