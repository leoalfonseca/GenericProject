import { elementItemStatus } from './elementItemStatus';
import { InstallationProps } from './installations';
import { responsibleTechnician } from './responsibleTechnician';
import { IunitOfMeasure } from './unit';

export type ReagentProps = {
  id: string;
  installation: InstallationProps;
  reagentCode: string;
  name: string;
  // elementItemStatus: elementItemStatus;
  unitOfMeasure: IunitOfMeasure;
  responsibleTechnician: responsibleTechnician;
  supplier: string;
  expiryDate: Date;
  replenishmentForecast: Date;
  isControlled: boolean;
  observations: string;
  isActive: boolean;
  isUsed: boolean;
};
