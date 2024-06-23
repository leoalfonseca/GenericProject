import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { EditGroupType } from 'types/group';
import { PermissionProps } from 'types/permissions';
import { UserProps } from 'types/user';
import OrderListFunction from 'utils/orderList';

interface IUserProvider {
  children: ReactNode;
}

interface IUserContext {
  createUser: (dataUser: CreateUserProps) => void;
  getUsers: () => Promise<UserProps[]>;
  getUser: (id: string) => Promise<void>;
  userPermission: PermissionProps | null;
  getTechLabs: () => Promise<UserProps[]>;
  getTechLabsActive: () => Promise<UserProps[]>;
  deleteUser: (userId: number) => Promise<void>;
  editUser: (
    userId: string,
    updatedData: {
      name?: string;
      username?: string;
      groupId?: string;
      email?: string;
      crq?: string;
    }
  ) => Promise<void>;
  changeStatus: (
    userId: string,
    updatedData: {
      isUsed?: boolean;
    }
  ) => Promise<void>;
  editUserPermission: (
    userId: string,
    updatedData: EditGroupType
  ) => Promise<void>;
}

type CreateUserProps = {
  name: string;
  username: string;
  // groupId?: string | null;
  email: string;
  crq?: string;
  isActive?: boolean;
};

const UserContext = createContext({} as IUserContext);

const UserProvider = ({ children }: IUserProvider) => {
  const [userPermission, setUserPermission] = useState<PermissionProps | null>(
    null
  );

  async function createUser(dataUser: CreateUserProps) {
    try {
      await api.post('users', dataUser);
      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado!');
      throw error;
    }
  }

  const getUsers = async () => {
    try {
      const { data } = await api.get('users?pageNumber=1&pageSize=9999');
      const activeUsers = data.data.filter(
        (user: UserProps) => user.isActive === true
      );
      return activeUsers;
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (userId: string) => {
    try {
      const { data } = await api.get(
        `users/${userId}?pageNumber=1&pageSize=9999`
      );

      setUserPermission(data);
    } catch (error) {
      console.error(error);
    }
  };

  const editUserPermission = async (
    userId: string,
    updatedData: EditGroupType
  ) => {
    try {
      await api.patch(`/users/${userId}/permissions`, updatedData);
      toast.success('Grupo alterado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao editar a permissão do usuário!');
      throw error;
    }
  };

  const getTechLabs = async () => {
    try {
      const { data } = await api.get('/users?pageNumber=1&pageSize=9999');
      const activeUsers = data.data.filter(
        (user: UserProps) =>
          user.crq !== null ||
          user.group.name.toLowerCase() === 'técnicos de laboratório'
      );
      return activeUsers;
    } catch (error) {
      console.error(error);
    }
  };

  const getTechLabsActive = async () => {
    try {
      const { data } = await api.get('/users?pageNumber=1&pageSize=9999');
      const array = data.data.filter(
        (techlab: UserProps) =>
          techlab.isUsed !== false &&
          (techlab.crq !== null ||
            techlab.group.name.toLowerCase() === 'técnicos de laboratório')
      );

      const orderedArray = OrderListFunction(array, 'name');

      return orderedArray;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await api.delete(`users/${userId}`);
      toast.success('Usuário excluído com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao excluir o usuário!');
      throw error;
    }
  };

  const editUser = async (
    userId: string,
    updatedData: {
      name?: string;
      username?: string;
      email?: string;
      groupId?: string | null;
    }
  ) => {
    try {
      await api.patch(`users/${userId}`, updatedData); // Passa os dados a serem atualizados
      toast.success('Usuário alterado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao editar o usuário!');
      throw error;
    }
  };
  const changeStatus = async (
    userId: string,
    updatedData: { isUsed?: boolean }
  ) => {
    try {
      await api.patch(`users/${userId}`, updatedData);

      if (updatedData.isUsed) {
        toast.success('Ativado com sucesso!');
      } else {
        toast.success('Inativado com sucesso!');
      }
    } catch (error) {
      console.error(error);
      if (updatedData.isUsed === true) {
        toast.error('Algo deu errado ao ativar!');
      } else {
        toast.error('Algo deu errado ao inativar!');
        throw error;
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        getUsers,
        deleteUser,
        editUser,
        getTechLabs,
        getTechLabsActive,
        changeStatus,
        getUser,
        editUserPermission,
        userPermission,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
