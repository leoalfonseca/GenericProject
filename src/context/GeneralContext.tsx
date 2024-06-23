import { ReactNode, createContext } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { AttachmentInnerProps, AttachmentProps } from 'types/attachment';

interface IGeneralProvider {
  children: ReactNode;
}

interface IGeneralContext {
  createAttachment: (dataAttachment: AttachmentProps) => void;
  getAttachment: (
    type: string,
    entityId: string
  ) => Promise<AttachmentInnerProps[]>;
  deleteAttachment: (attachmentId: string | undefined) => Promise<void>;
}

const GeneralContext = createContext({} as IGeneralContext);

const GeneralProvider = ({ children }: IGeneralProvider) => {
  // Attachments

  async function getAttachment(type: string, entityId: string) {
    try {
      const { data } = await api.get(
        'attachment?entityType=' +
          type +
          '&entityId=' +
          entityId +
          `&pageNumber=1&pageSize=${30000 * 30000}`
      );
      return data.reverse();
    } catch (error: any) {
      console.error(error.response?.data?.message);
    }
  }

  async function createAttachment(dataAttachment: AttachmentProps) {
    try {
      await api.post('attachment', dataAttachment);
      toast.success('Arquivo anexado com sucesso!');
    } catch (error: any) {
      if (error.response?.status === 500) {
        toast.error('Internal Server Error');
      } else {
        toast.error(error.response?.data?.message);
      }
    }
  }

  async function deleteAttachment(attachmentName: string | undefined) {
    try {
      await api.patch(`attachment?fileName=${attachmentName}`);
      toast.success('Anexo excluído com sucesso!');
    } catch (error: any) {
      console.error(error.response?.data?.message);
      toast.error('Algo deu errado ao excluir o Anexo!');
      throw error;
    }
  }

  //

  return (
    <GeneralContext.Provider
      value={{
        createAttachment,
        getAttachment,
        deleteAttachment,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export { GeneralContext, GeneralProvider };
