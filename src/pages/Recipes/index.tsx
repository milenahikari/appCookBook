import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import LogoHeader from '../../assets/img/logo-header.png';
import ImageDefault from '../../assets/img/default.png';
import Searching from '../../assets/img/searching.png';

import {
  Container,
  Header,
  HeaderWrapper,
  HeaderImage,
  ButtonLogout,
  WrapperInputSearchRecipes,
  InputSearchRecipesIcon,
  InputSearchRecipes,
  Content,
  Title,
  ListRecipe,
  CardRecipe,
  CardRecipeImage,
  NameRecipe,
  BoxEmptyRecipes,
  EmptyRecipes,
  EmptyRecipesText,
} from './styles';

export interface Recipe {
  id: string;
  nome: string;
}

const Recipes: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getRecipes = useCallback(() => {
    api.get('recipes').then(response => {
      setRecipes(response.data);
    });
  }, []);

  useFocusEffect(() => {
    if (search.length === 0) {
      getRecipes();
    }
  });

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleSearchRecipe = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await api.get('recipes/search', {
        params: {
          recipe: search,
        },
      });

      setRecipes(response.data);
      setIsLoading(false);
    } catch (e) {
      Alert.alert(
        'Erro',
        'Não foi possível realizar a busca... tente novamente',
      );
      setIsLoading(false);
    }
  }, [search]);

  return (
    <Container>
      <Header>
        <HeaderWrapper>
          <HeaderImage source={LogoHeader} />
          <ButtonLogout onPress={signOut}>
            <Icon name="log-out" size={25} color="#FFB84D" />
          </ButtonLogout>
        </HeaderWrapper>

        <WrapperInputSearchRecipes>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color="#c72828"
              style={{ position: 'absolute', left: 15, top: 15, zIndex: 999 }}
            />
          ) : (
              <InputSearchRecipesIcon
                name="search"
                size={20}
                color={isFocused ? '#c72828' : '#9191A9'}
              />
            )}
          <InputSearchRecipes
            placeholder="Encontre sua receita"
            autoCorrect={false}
            returnKeyType="search"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={() => handleSearchRecipe()}
          />
        </WrapperInputSearchRecipes>
      </Header>

      <Content>
        {recipes.length <= 0 ? (
          <BoxEmptyRecipes>
            <EmptyRecipes source={Searching} />
            <EmptyRecipesText>Nenhuma receita encontrada</EmptyRecipesText>
          </BoxEmptyRecipes>
        ) : (
            <ListRecipe
              data={recipes}
              ListHeaderComponent={<Title>Receitas</Title>}
              keyExtractor={recipe => recipe.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: recipe }) => (
                <CardRecipe
                  onPress={() =>
                    navigation.navigate('DetailRecipe', {
                      id: recipe.id,
                    })}
                >
                  {recipe.photo ? (
                    <CardRecipeImage
                      source={{
                        uri: recipe.photo,
                      }}
                    />
                  ) : (
                      <CardRecipeImage source={ImageDefault} />
                    )}

                  <NameRecipe>{recipe.nome}</NameRecipe>
                </CardRecipe>
              )}
            />
          )}
      </Content>
    </Container>
  );
};

export default Recipes;
