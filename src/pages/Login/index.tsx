import React, { useEffect } from 'react';
import { Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-community/google-signin';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import LogoGoogle from '../../assets/img/google-vermelho.png';
import Background from '../../assets/img/home-background.png';
import Logo from '../../assets/img/logo.png';

import {
  Container,
  BackgroundImage,
  Title,
  NavigationButton,
  ButtonText,
  GoogleContainer,
  GoogleImage,
} from './styles';

const Login: React.FC = () => {
  const { signIn } = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '727444475213-g61ab9u1mbtgttdc5fu071ggqcgo6r2n.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
  }, []);

  const navigation = useNavigation();

  async function handleSignInWithGoogle(): Promise<void> {
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = (await GoogleSignin.signIn()) as User;

      const { email, name, photo } = user;

      signIn({ email, name, photo });

      // this.setState({
      //   userInfo: userInfo,
      //   loggedIn: true,
      // });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Erro 1');
        await api.post('/logs/message', {
          errorCode: error.code,
          message: error,
        });
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Erro 2');
        await api.post('/logs/message', {
          errorCode: error.code,
          message: error,
        });
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Erro 3');
        await api.post('/logs/message', {
          errorCode: error.code,
          message: error,
        });
        // play services not available or outdated
      } else {
        Alert.alert('Erro 4');
        await api.post('/logs/message', {
          errorCode: error.code,
          message: error,
        });
        // some other error happened
      }
    }
  }

  return (
    <BackgroundImage
      source={Background}
      imageStyle={{
        width: 313,
        height: 427,
      }}
    >
      <Container>
        <Image source={Logo} />
        <Title>Seu livro de receitas digital.</Title>
      </Container>
      <NavigationButton onPress={handleSignInWithGoogle}>
        <ButtonText>Entrar com</ButtonText>
        <GoogleContainer>
          <GoogleImage source={LogoGoogle} />
        </GoogleContainer>
      </NavigationButton>
    </BackgroundImage>
  );
};

export default Login;
