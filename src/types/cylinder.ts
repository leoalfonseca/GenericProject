import { InstallationProps } from './installations';
import { elementItemStatus } from './elementItemStatus';
import { responsibleTechnician } from './responsibleTechnician';

export type CylinderProps = {
  id: string;
  installation: InstallationProps;
  prioLabId: string;
  elementItemStatus: elementItemStatus;
  responsibleTechnicianId: responsibleTechnician;
  responsibleTechnician: responsibleTechnician;
  manufacturer: string;
  manufactureDate: string;
  observations: string;
  isActive: boolean;
  isUsed: boolean;
};
