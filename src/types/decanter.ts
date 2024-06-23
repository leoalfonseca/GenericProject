export type DecanterProps = {
  id?: string;
  date: Date;
  functionApplicationId: string;
  function?: ApplicationProps;
  lungTankId: string;
  lungTank?: LungProps;
  decantedVolume: number | null;
  stock: number | null;
  description: string;
  isActive?: boolean;
  isUsed?: boolean;
};

export type EditingDecanterProps = {
  id: string;
  date: Date;
  functionApplicationId: string;
  function: ApplicationProps;
  lungTankId: string;
  lungTank: LungProps;
  decantedVolume: number | null;
  stock: number | null;
  description: string;
  isActive?: boolean;
  isUsed?: boolean;
};

export type ApplicationProps = {
  id: string;
  name: string;
};

export type LungProps = {
  id: string;
  nomenclature: string;
  pId: string;
};
