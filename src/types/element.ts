export type ElementProps = {
  id: string;
  name: string;
  prioLabId: string;
  manufacturer: string;
  model: string;
  function: string;
  appearancePhysical: string;
  densityMin: number;
  densityMax: number;
  phMin: number;
  phMax: number;
  phSpec: number;
  supplier: string;
  serialNumber: string;
  calibrationPeriod: number;
  verificationPeriod: number;
  dateCalibration: Date;
  calibrationStatus: string;
  calibrationRequired: boolean;
  verificationRequired: boolean;
  qualityControlRequired: boolean;
  consumable: boolean;
  elementType: ElementTypeProps[];
};

export type ElementTypeProps = {
  id: string;
  name: string;
};

export type ElementItemStatusProps = {
  id: string;
  name: string;
  abbreaviation: string;
};
