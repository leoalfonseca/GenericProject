import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { EditingLungTankProps, LungTankProps } from 'types/lungTank';

interface ILungTankProvider {
  children: ReactNode;
}

interface ILungTankContext {
  createLungTank: (dataTank: LungTankProps) => void;
  getLungTank: () => Promise<LungTankProps[]>;
  deleteLungTank: (tankId: string) => Promise<void>;
  editLungTank: (
    tankId: string,
    updatedData: EditingLungTankProps
  ) => Promise<void>;
  isTableLabsLoading: boolean;
  setIsTableLabsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  submitLoading: boolean;
  isRequestFormLoading: boolean;
  setIsRequestFormLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LungTankContext = createContext({} as ILungTankContext);

const LungTankProvider = ({ children }: ILungTankProvider) => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [isTableLabsLoading, setIsTableLabsLoading] = useState<boolean>(false);
  const [isRequestFormLoading, setIsRequestFormLoading] =
    useState<boolean>(false);

  async function createLungTank(dataTank: LungTankProps) {
    try {
      setIsTableLabsLoading(true);
      setIsRequestFormLoading(true);
      await api.post('lungTank', dataTank);
      toast.success('Tanque Pulmão criado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsTableLabsLoading(false);
      setIsRequestFormLoading(true);
    }
  }

  const getLungTank = async () => {
    try {
      const { data } = await api.get(
        `lungTank?pageNumber=1&pageSize=${30000 * 30000}`
      );

      return data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const deleteLungTank = async (tankId: string) => {
    try {
      await api.delete(`lungTank/${tankId}`);
      toast.success('Tanque Pulmão excluído com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  };

  const editLungTank = async (
    tankId: string,
    updatedData: EditingLungTankProps
  ) => {
    try {
      await api.patch(`lungTank/${tankId}`, updatedData);
      toast.success('Tanque Pulmão alterado com sucesso!');

      setSubmitLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <LungTankContext.Provider
      value={{
        createLungTank,
        getLungTank,
        deleteLungTank,
        editLungTank,
        isTableLabsLoading,
        setIsTableLabsLoading,
        submitLoading,
        isRequestFormLoading,
        setIsRequestFormLoading,
      }}
    >
      {children}
    </LungTankContext.Provider>
  );
};

export { LungTankContext, LungTankProvider };
