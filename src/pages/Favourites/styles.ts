import styled from 'styled-components/native';

import { FlatList } from 'react-native';
import { Recipe } from './index';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  background: #c72828;
  padding: 65px 24px 65px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Poppins-Regular';
  color: #fff;
  font-size: 20px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: -8%;
`;

export const ListFavourites = styled(FlatList as new () => FlatList<Recipe>)``;

export const CardRecipe = styled.TouchableOpacity`
  background: #f0f0f5;
  flex-direction: row;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  align-items: center;
`;

export const CardRecipeImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin: 10px;
`;

export const NameRecipe = styled.Text`
  width: 70%;
  font-family: 'Poppins-Regular';
  color: #6c6c80;
  font-size: 15px;
`;
