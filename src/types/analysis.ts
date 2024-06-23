import { InstallationProps } from './installations';

export type AnalysisProps = {
  id: string;
  name: string;
  fluid: string;
  quantity: number;
  subAnalitycs: string[];
  installationsIds: string[];
  installations: InstallationProps;
  isActive: boolean;
};

export type AnalysisEditProps = {
  id: string;
  name: string;
  fluid: string;
  quantity: number;
  subAnalitycs: iSubAnalysis[];
  installationsIds: string[];
  installations: InstallationProps;
  isActive: boolean;
};

export interface iSubAnalysis {
  id: string;
  name: string;
}
