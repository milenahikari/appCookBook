import React from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Recipes from '../pages/Recipes';
import NewRecipe from '../pages/NewRecipe';
import Favourites from '../pages/Favourites';

const AppTab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <AppTab.Navigator
    tabBarOptions={{
      labelPosition: 'beside-icon',
      activeTintColor: '#C72828',
      labelStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontWeight: '600',
      },
      inactiveTintColor: '#B7B7CC',
    }}
  >
    <AppTab.Screen
      name="Recipes"
      component={Recipes}
      options={{
        tabBarLabel: 'Receitas',
        tabBarIcon: ({ color }) => <Icon name="list" size={25} color={color} />,
      }}
    />
    <AppTab.Screen
      name="NewRecipe"
      component={NewRecipe}
      options={{
        tabBarLabel: 'Receita',
        tabBarIcon: ({ color }) => (
          <Icon name="plus-circle" size={25} color={color} />
        ),
      }}
    />
    <AppTab.Screen
      name="Favourites"
      component={Favourites}
      options={{
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({ color }) => (
          <Icon name="heart" size={25} color={color} />
        ),
      }}
    />
  </AppTab.Navigator>
);

export default AppRoutes;
