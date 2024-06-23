export type OilProps = {
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
  salinityPTB: number | null;
  waterContent: number | null;
  sandContent: number | null;
  solidContent: number | null;
  h2S: number | null;
  codeSample: string;
  collectedByUserId: string;
  pointSamplingId: string;
  pointSampling?: {
    id: string;
    name: string;
  };
};

export type OilEditingProps = {
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
  salinityPTB: number | null;
  waterContent: number | null;
  sandContent: number | null;
  solidContent: number | null;
  h2S: number | null;
  codeSample: string;
  pointSamplingId: string;
  pointSampling: string;
  collectedByUserId: string;
  collectedBy: {
    id: string;
    name: string;
  };
};
