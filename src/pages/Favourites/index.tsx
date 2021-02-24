import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import ImageDefault from '../../assets/img/default.png';

import {
  Container,
  Header,
  Title,
  Content,
  ListFavourites,
  CardRecipe,
  CardRecipeImage,
  NameRecipe,
} from './styles';

export interface Recipe {
  id: string;
  nome: string;
}

const Favourites: React.FC = () => {
  const navigation = useNavigation();
  const [favourites, setFavourites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useFocusEffect(() => {
    api.get('likes').then(response => {
      setFavourites(response.data);
      setIsLoading(false);
    });
  });

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="small" color="#c72828" style={{ flex: 1 }} />
      ) : (
          <Container>
            <Header>
              <Title>Meus favoritos</Title>
            </Header>
            <Content>
              <ListFavourites
                data={favourites}
                keyExtractor={favourite => favourite.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: favourite }) => (
                  <CardRecipe
                    onPress={() =>
                      navigation.navigate('DetailRecipe', {
                        id: favourite.id,
                      })}
                  >
                    {favourite.photo ? (
                      <CardRecipeImage
                        source={{
                          uri: favourite.photo,
                        }}
                      />
                    ) : (
                        <CardRecipeImage source={ImageDefault} />
                      )}
                    <NameRecipe>{favourite.nome}</NameRecipe>
                  </CardRecipe>
                )}
              />
            </Content>
          </Container>
        )}
    </>
  );
};

export default Favourites;
