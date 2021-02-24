import React from 'react';
import { useNavigation } from '@react-navigation/native';

import ImageConfirmation from '../../assets/img/confirmation.png';

import { Container, ImageSuccess, SuccessText } from './styles';

const CreateSuccess: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container onPress={() => navigation.navigate('Home')}>
      <ImageSuccess source={ImageConfirmation} />
      <SuccessText>Receita criada com sucesso!</SuccessText>
    </Container>
  );
};

export default CreateSuccess;
