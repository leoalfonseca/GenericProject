export type LaboratoriesProps = {
  id: string;
  code: string;
  fantasyName: string;
  corporateName: string;
  cnpj: string;
  email: string;
  laboratoryType: { id: string; name: string };
  isActive: boolean;
  isUsed: boolean;
};
