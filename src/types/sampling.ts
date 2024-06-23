import { WellProps } from './well';

export type SamplingPointProps = {
  id: string;
  name: string;
  code: string;
  fluidId: string;
  fluid: string;
  installationId: string;
  sampleRoutineResultsTypesId: string[];
  sampleRoutineResultsTypes: RoutineResultsProps[];
  installation: string;
  wellId: string | null;
  well: WellProps;
  isWellAssociated: boolean;
  isActive: boolean;
  isUsed: boolean;
};

export type RoutineResultsProps = {
  id: string;
  typeSample: string;
  isActive: boolean;
};
