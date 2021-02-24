import React, {
  useContext,
  createContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { User } from '@react-native-community/google-signin';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  name: string | null;
  photo: string | null;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@CookBook:token',
        '@CookBook:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, name, photo }) => {
    const response = await api.post('sessions/google', {
      user: {
        email,
        name,
        photo,
      },
    });

    const { token, profile } = response.data;

    await AsyncStorage.multiSet([
      ['@CookBook:token', token],
      ['@CookBook:user', JSON.stringify(profile)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user: profile });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@CookBook:token', '@CookBook:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
