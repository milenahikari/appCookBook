import React, { useCallback, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import IconAddPhoto from '../../assets/img/add-photo.png';

import {
  Container,
  Header,
  Title,
  Content,
  AddImageWrapper,
  ImageRecipe,
  SectionTitle,
  Section,
  WrapperLine,
  Input,
  AddButton,
  AddText,
  RemoveButton,
  ButtonSubmitRecipe,
  ButtonSubmitRecipeText,
} from './styles';

const NewRecipe: React.FC = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [listIngredientes, setListIngredientes] = useState<string[]>(['']);
  const [listModoPreparo, setListModoPreparo] = useState<string[]>(['']);
  const [listOutrasInformacoes, setListOutrasInformacoes] = useState<string[]>([
    '',
  ]);

  const handleInputChangeIngrediente = useCallback(
    (text, index) => {
      const ingredientes = [...listIngredientes];
      ingredientes[index] = text;
      setListIngredientes(ingredientes);
    },
    [listIngredientes],
  );

  const handleInputChangeModoPreparo = useCallback(
    (text, index) => {
      const modoPreparo = [...listModoPreparo];
      modoPreparo[index] = text;
      setListModoPreparo(modoPreparo);
    },
    [listModoPreparo],
  );

  const handleInputChangeOutrasInformacoes = useCallback(
    (text, index) => {
      const outrasInformacoes = [...listOutrasInformacoes];
      outrasInformacoes[index] = text;
      setListOutrasInformacoes(outrasInformacoes);
    },
    [listOutrasInformacoes],
  );

  const handleAddIngrediente = useCallback(() => {
    setListIngredientes([...listIngredientes, '']);
  }, [listIngredientes]);

  const handleAddModoPreparo = useCallback(() => {
    setListModoPreparo([...listModoPreparo, '']);
  }, [listModoPreparo]);

  const handleAddOutrasInformacoes = useCallback(() => {
    setListOutrasInformacoes([...listOutrasInformacoes, '']);
  }, [listOutrasInformacoes]);

  const handleRemoveIngrediente = useCallback(
    index => {
      const list = [...listIngredientes];
      list.splice(index, 1);
      setListIngredientes(list);
    },
    [listIngredientes],
  );

  const handleRemoveModoPreparo = useCallback(
    index => {
      const modoPreparo = [...listModoPreparo];
      modoPreparo.splice(index, 1);
      setListModoPreparo(modoPreparo);
    },
    [listModoPreparo],
  );

  const handleRemoveOutrasInformacoes = useCallback(
    index => {
      const outrasInformacoes = [...listOutrasInformacoes];
      outrasInformacoes.splice(index, 1);
      setListOutrasInformacoes(outrasInformacoes);
    },
    [listOutrasInformacoes],
  );

  const handleSubmitRecipe = useCallback(async () => {
    if (!image) return Alert.alert('Adicione uma imagem para a receita');
    if (!title) return Alert.alert('Adicione um nome para a receita');
    if (listIngredientes.length <= 1 && listIngredientes[0] === '')
      return Alert.alert('Adicione pelo menos um ingrediente para a receita');
    if (listModoPreparo.length <= 1 && listModoPreparo[0] === '')
      return Alert.alert('Adicione pelo menos um passo para o modo de preparo');

    try {
      setIsLoading(true);
      const response = await api.post('recipes', {
        name: title,
        photo: image,
        section: [
          {
            nome: 'Ingredientes',
            conteudo: listIngredientes,
          },
          {
            nome: 'Modo de Preparo',
            conteudo: listModoPreparo,
          },
          {
            nome: 'Outras informações',
            conteudo: listOutrasInformacoes,
          },
        ],
      });

      setIsLoading(false);

      // LIMPA DADOS DO ESTADO APOS FAZER O POST
      setImage('');
      setTitle('');
      setListIngredientes(['']);
      setListModoPreparo(['']);
      setListOutrasInformacoes(['']);

      navigation.navigate('CreateSuccess');
    } catch (e) {
      Alert.alert(
        'Ops ocorreu um erro',
        'Não foi possível salvar a receita, tente novamente',
      );
    }
  }, [
    title,
    image,
    listIngredientes,
    listModoPreparo,
    listOutrasInformacoes,
    navigation,
  ]);

  const handleSelectImage = useCallback(() => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      sortOrder: 'none',
      mime: 'image/jpeg',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    })
      .then(image => {
        const imageData = image.path.split('/');

        const imageName = imageData[imageData.length - 1];

        const imageUpload = {
          uri: image.path,
          type: image.mime,
          name: imageName,
        };

        return imageUpload;
      })
      .then(image => {
        const data = new FormData();
        data.append('avatar', image);

        api
          .patch('recipes/avatar', data)
          .then(response => {
            setImage(response.data.photo);
          })
          .catch(e => {
            Alert.alert('Erro ao adicionar a imagem, tente novamente');
          });
      });
  }, []);

  return (
    <Container>
      <Header>
        <Title>Nova receita</Title>
      </Header>

      <Content>
        <AddImageWrapper onPress={handleSelectImage}>
          {image ? (
            <ImageRecipe
              source={{ uri: image }}
              resizeMode="cover"
              style={{ width: '100%', height: '100%', borderRadius: 10 }}
            />
          ) : (
              <ImageRecipe
                source={IconAddPhoto}
                resizeMode="cover"
                style={{ width: 90, height: 90 }}
              />
            )}
        </AddImageWrapper>
        <SectionTitle>Nome da receita</SectionTitle>
        <Input value={title} onChangeText={title => setTitle(title)} />

        <SectionTitle>Ingredientes</SectionTitle>
        {listIngredientes.map((ingrediente, index) => {
          return (
            <Section>
              <WrapperLine>
                <Input
                  value={ingrediente}
                  onChangeText={text =>
                    handleInputChangeIngrediente(text, index)
                  }
                />
                {listIngredientes.length !== 1 && (
                  <RemoveButton onPress={() => handleRemoveIngrediente(index)}>
                    <Icon name="x" size={20} color="#6c6c80" />
                  </RemoveButton>
                )}
              </WrapperLine>
              {listIngredientes.length - 1 === index && (
                <AddButton onPress={handleAddIngrediente}>
                  <Icon name="plus" size={20} color="#6c6c80" />
                  <AddText>Adicionar ingrediente</AddText>
                </AddButton>
              )}
            </Section>
          );
        })}

        <SectionTitle>Modo de preparo</SectionTitle>
        {listModoPreparo.map((modoPreparo, index) => {
          return (
            <Section>
              <WrapperLine>
                <Input
                  value={modoPreparo}
                  onChangeText={text =>
                    handleInputChangeModoPreparo(text, index)
                  }
                />
                {listModoPreparo.length !== 1 && (
                  <RemoveButton onPress={() => handleRemoveModoPreparo(index)}>
                    <Icon name="x" size={20} color="#6c6c80" />
                  </RemoveButton>
                )}
              </WrapperLine>
              {listModoPreparo.length - 1 === index && (
                <AddButton onPress={handleAddModoPreparo}>
                  <Icon name="plus" size={20} color="#6c6c80" />
                  <AddText>Adicionar passo</AddText>
                </AddButton>
              )}
            </Section>
          );
        })}

        <SectionTitle>Outras informações</SectionTitle>
        {listOutrasInformacoes.map((informacao, index) => {
          return (
            <Section>
              <WrapperLine>
                <Input
                  value={informacao}
                  onChangeText={text =>
                    handleInputChangeOutrasInformacoes(text, index)
                  }
                />
                {listOutrasInformacoes.length !== 1 && (
                  <RemoveButton
                    onPress={() => handleRemoveOutrasInformacoes(index)}
                  >
                    <Icon name="x" size={20} color="#6c6c80" />
                  </RemoveButton>
                )}
              </WrapperLine>
              {listOutrasInformacoes.length - 1 === index && (
                <AddButton onPress={handleAddOutrasInformacoes}>
                  <Icon name="plus" size={20} color="#6c6c80" />
                  <AddText>Adicionar informação</AddText>
                </AddButton>
              )}
            </Section>
          );
        })}

        <ButtonSubmitRecipe onPress={handleSubmitRecipe}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color="#c72828"
              style={{
                flex: 1,
                padding: 16,
              }}
            />
          ) : (
              <ButtonSubmitRecipeText>Salvar</ButtonSubmitRecipeText>
            )}
        </ButtonSubmitRecipe>
      </Content>
    </Container>
  );
};

export default NewRecipe;
