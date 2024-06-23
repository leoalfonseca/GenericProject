import { elementItemStatus } from './elementItemStatus';

export type ProductProps = {
  id: string;
  name: string;
  elementId: string;
  function: string;
  supplier: string;
  installation: any;
  installationId: string;
  phMax: number | null;
  phMin: number | null;
  phSpec: number | null;
  isControlled: boolean;
  densityMin: number | null;
  densityMax: number | null;
  appearancePhysical: string;
  isActive: boolean;
  isUsed: boolean;
  verificationPeriod: number | null;
};
