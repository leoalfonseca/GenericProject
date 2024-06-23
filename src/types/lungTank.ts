export type LungTankProps = {
  id?: string;
  pId: string;
  nomenclature: string;
  projectApplicationId: string;
  projectApplication?: ApplicationProps;
  currentApplicationId: string;
  currentApplication?: ApplicationProps;
  capacity: number | null;
  storageLITsAndLG: string;
  description: string;
  isActive?: boolean;
  isUsed?: boolean;
};

export type EditingLungTankProps = {
  id: string;
  pId: string;
  nomenclature: string;
  projectApplicationId: string;
  projectApplication: ApplicationProps;
  currentApplicationId: string;
  currentApplication: ApplicationProps;
  capacity: number | null;
  storageLITsAndLG: string;
  description: string;
  isActive?: boolean;
  isUsed?: boolean;
};

export type ApplicationProps = {
  id: string;
  name: string;
};
