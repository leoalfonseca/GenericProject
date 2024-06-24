import UsersData from 'pages/admin/users/components/UsersData';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { UserProps } from 'types/user';

interface IUserProvider {
  children: ReactNode;
}

interface IUserContext {
  createUser: (dataUser: UserProps) => void;
  getUsers: () => Promise<UserProps[]>;
  deleteUser: (userId: string) => Promise<void>;
  editUser: (userId: string, updatedData: UserProps) => Promise<void>;
  users: UserProps[];
}

const UserContext = createContext({} as IUserContext);

const UserProvider = ({ children }: IUserProvider) => {
  const [users, setUsers] = useState<UserProps[]>(UsersData);

  async function createUser(dataUser: UserProps) {
    try {
      // await api.post('users', dataUser);
      setUsers((prevUsers) => [...prevUsers, dataUser]);
      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado!');
      throw error;
    }
  }

  const getUsers = async () => {
    try {
      // const { data } = await api.get('users?pageNumber=1&pageSize=9999');
      // setUsers(data);
      // return data;

      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setUsers((prevUsers) => {
        const userIndex = prevUsers.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          const updatedUsers = [...prevUsers];
          updatedUsers.splice(userIndex, 1);
          toast.success('Usuário excluído com sucesso!');
          return updatedUsers;
        } else {
          toast.error('Usuário não encontrado!');
          return prevUsers;
        }
      });
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao excluir o usuário!');
      throw error;
    }
  };

  const editUser = async (userId: string, updatedData: UserProps) => {
    try {
      await api.patch(`users/${userId}`, updatedData); // Passa os dados a serem atualizados
      toast.success('Usuário alterado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao editar o usuário!');
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        getUsers,
        createUser,
        deleteUser,
        editUser,
        users,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
