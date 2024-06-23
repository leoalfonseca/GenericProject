export type WellTestProps = {
  id?: string;
  userId: string;
  clusterId?: string;
  status: string;
  description: string;
  rejectionReason: string;
  collectedTimeDate: Date;
  collectionHour?: Date;
  api: number | null;
  bsew: number | null;
  density: number | null;
  salinity: number | null;
  h2S: number | null;
  h2SGas: number | null;
  solids: number | null;
  codeSample: string;
  pointSamplingId: string;
  responsibilityTechinalId: string;
  collectedByUserId: string;
  wellId: string;
  well?: {
    id: string;
    name: string;
  };
  pointSampling?: {
    id: string;
    name: string;
  };
  responsibilityTechinal?: {
    id: string;
    name: string;
  };
};

export type WellTestEditingProps = {
  id: string;
  userId: string;
  clusterId: string;
  status: string;
  description: string;
  rejectionReason: string;
  collectedTimeDate: Date;
  api: number | null;
  bsew: number | null;
  density: number | null;
  salinity: number | null;
  h2S: number | null;
  h2SGas: number | null;
  solids: number | null;
  codeSample: string;
  pointSamplingId: string;
  responsibilityTechinalId: string;
  collectedByUserId: string;
  responsibilityTechinalName: string;
  responsibilityTechinal: {
    id: string;
    name: string;
  };
  collectedBy: {
    id: string;
    name: string;
  };
  wellId: string;
  wellName: string;
  well: {
    id: string;
    name: string;
  };
  pointSamplingName: string;
};
