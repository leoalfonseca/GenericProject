import { ElementProps } from './element';
import { ProductProps } from './product';

export type QualityProps = {
  id?: string;
  installationId: string;
  chemicalsId: string;
  chemicals?: ElementProps;
  lot: string;
  status: string;
  sampleCode: string;
  serialNumber: string;
  userId: string;
  collectionDate: any;
  expirationDate: any;
  appearanceExpected: boolean;
  observation: string;
  appearance: string | null;
  density: number | null;
  ph: number | null;
};

export type QualityEditingProps = {
  id: string;
  // installationId: string;
  chemicalsId: string;
  lot: string;
  status: string;
  sampleCode: string;
  serialNumber: string;
  userId: string;
  collectionDate: any;
  expirationDate: any;
  appearanceExpected: boolean;
  observation: string;
  appearance: string | null;
  density: number | null;
  ph: number | null;
  chemicals: ProductProps;
};
