import React, { useCallback, useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

import FilledHeart from '../../assets/img/filled-heart.png';
import ImageDefault from '../../assets/img/default.png';

import {
  Container,
  Header,
  WrapperBack,
  WrapperFavourite,
  IconFilled,
  Title,
  RecipeData,
  ImageRecipe,
  NameRecipe,
  Section,
  SectionTitle,
  SectionTextDetail,
} from './styles';

interface RouteParams {
  id: string;
}

interface ContentSection {
  nome: string;
  conteudo: string;
}

interface Recipe {
  id: string;
  nome: string;
  photo: string;
  secao: ContentSection[];
}

const DetailRecipe: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const [favourited, setFavourited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);

  const getRecipeById = useCallback(async () => {
    // VALIDA SE A RECEITA ESTA NOS FAVORITOS
    const responseLikes = await api.get('likes');

    const likes = responseLikes.data as Recipe[];

    if (likes.length > 0) {
      const foundLike = likes.find(like => like.id === routeParams.id);

      if (foundLike) {
        setFavourited(true);
      }
    }

    // BUSCA DETALHES DA RECEITA
    const responseRecipe = await api.get(`recipes/${routeParams.id}`);

    setRecipe(responseRecipe.data);
    setIsLoading(false);
  }, [routeParams]);

  useEffect(() => {
    getRecipeById();
  }, [getRecipeById]);

  const handleToggleFavourite = useCallback(async () => {
    if (favourited) {
      await api.delete(`likes/${routeParams.id}`);
      setFavourited(!favourited);
      return;
    }
    await api.post(`likes/${routeParams.id}`);
    setFavourited(!favourited);
  }, [favourited, routeParams]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="small" color="#c72828" style={{ flex: 1 }} />
      ) : (
          <Container>
            <Header>
              <WrapperBack onPress={() => navigation.navigate('Home')}>
                <Icon name="arrow-left" size={25} color="#FFB84D" />
              </WrapperBack>
              <Title>Detalhe da receita</Title>
              <WrapperFavourite onPress={handleToggleFavourite}>
                {favourited ? (
                  <IconFilled source={FilledHeart} />
                ) : (
                    <Icon name="heart" size={25} color="#FFB84D" />
                  )}
              </WrapperFavourite>
            </Header>

            <RecipeData>
              {recipe.photo ? (
                <ImageRecipe source={{ uri: recipe.photo }} resizeMode="cover" />
              ) : (
                  <ImageRecipe source={ImageDefault} resizeMode="cover" />
                )}

              <NameRecipe>{recipe.nome}</NameRecipe>

              {recipe.secao.map(secao => (
                <Section key={secao.nome}>
                  <SectionTitle>{secao.nome}</SectionTitle>
                  {secao.conteudo.map(item => (
                    <SectionTextDetail key={item}>{item}</SectionTextDetail>
                  ))}
                </Section>
              ))}
            </RecipeData>
          </Container>
        )}
    </>
  );
};

export default DetailRecipe;
