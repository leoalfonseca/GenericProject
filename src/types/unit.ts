export type UnitProps = {
  id: string;
  unit: string;
  isActive: boolean;
  isUsed: boolean;
};

export interface IunitOfMeasure {
  id: string;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
