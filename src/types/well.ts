import { InstallationProps } from './installations';

export type WellProps = {
  id: string;
  name: string;
  code: string;
  description: string;
  installationId: string;
  installation: InstallationProps;
  field: string;
  isActive: boolean;
  isUsed: boolean;
};
