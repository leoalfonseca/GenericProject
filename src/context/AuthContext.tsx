import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { api } from 'services/api';
import { storageRemoveToken, storageSetToken } from 'storage/storageToken';
import encrypt from 'utils/crypto/encrypt';
import { apiSSO } from '../services/apiSSO';

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthContext {
  signIn: (dataLogin: AuthProps) => void;
  signOut: () => void;
  signInSSO: () => void;
}

type AuthProps = {
  username: string;
  password: string;
};

const AuthContext = React.createContext({} as IAuthContext);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const router = useRouter();

  const signIn = async (dataLogin: AuthProps) => {
    try {
      const { username, password } = dataLogin;
      const encryptedUsername = encrypt({ text: username });
      const encryptedPassword = encrypt({ text: password });

      const mode = process.env.MODE ? process.env.MODE.toLowerCase() : '';
      const route = mode === 'dev' ? 'loginDev' : 'login';

      const { data } = await api.post(route, {
        username: encryptedUsername,
        password: encryptedPassword,
      });

      storageSetToken(data.token);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      toast.success('Usuário logado com sucesso!');

      router.push('/home');
    } catch (error: any) {
      toast.error('Usuário ou senha inválidos');
      throw error;
    }
  };

  const signInSSO = async () => {
    try {
      const { data } = await apiSSO.post('sso');
      storageSetToken(data.token);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      toast.success('Usuário logado com sucesso!');

      router.push('/home');
    } catch (error: any) {
      toast.error('Usuário ou senha inválidos');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      router.push('/login');
      storageRemoveToken();
      api.defaults.headers.Authorization = '';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signInSSO,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
