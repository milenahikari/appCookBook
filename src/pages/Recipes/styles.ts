import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { FlatList } from 'react-native';
import { Recipe } from './index';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  background-color: #c72828;
  padding: 60px 24px 60px;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonLogout = styled.TouchableOpacity``;

export const HeaderImage = styled.Image``;

export const WrapperInputSearchRecipes = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  padding-left: 45px;
  padding-right: 20px;
  background-color: #f0f0f5;
  flex-direction: row;
  position: absolute;
  top: 135px;
`;

export const InputSearchRecipesIcon = styled(FeatherIcon)`
  position: absolute;
  left: 20px;
  top: 15px;
  z-index: 99999;
`;

export const InputSearchRecipes = styled.TextInput`
  width: 100%;
  color: #9191a9;
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
`;

export const Title = styled.Text`
  font-family: 'Poppins-Regular';
  color: #6c6c80;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ListRecipe = styled(FlatList as new () => FlatList<Recipe>)``;

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

export const BoxEmptyRecipes = styled.View`
  flex: 1;
`;

export const EmptyRecipes = styled.Image`
  width: 45%;
  height: 130px;
  margin-top: 50px;
  margin-bottom: 50px;
  align-self: center;
`;

export const EmptyRecipesText = styled.Text`
  font-family: 'Poppins-Regular';
  color: #c72828;
  font-size: 15px;
  text-align: center;
`;
