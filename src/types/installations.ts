import { ClusterProps } from './cluster';
import { UserProps } from './user';

export type InstallationProps = {
  id: string;
  name: string;
  codeANP: string;
  field: string;
  description: string;
  isActive: boolean;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  user: UserProps;
  wells: [];
  cluster: ClusterProps;
};
