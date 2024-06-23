export type CargoTankProps = {
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
  density15C: number | null;
  salinityPTB: number | null;
  salinityMGL: number | null;
  h2S: number | null;
  codeSample: string;
  pointSamplingId: string;
  responsibilityTechinalId: string;
  collectedByUserId: string;
  tankLevelId: string;
  tankLevel?: {
    id: string;
    level: string;
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

export type CargoTankEditingProps = {
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
  density15C: number | null;
  salinityPTB: number | null;
  salinityMGL: number | null;
  h2S: number | null;
  codeSample: string;
  pointSamplingId: string;
  responsibilityTechinalId: string;
  responsibilityTechinal: {
    id: string;
    name: string;
  };
  tankLevelId: string;
  tankLevel: {
    id: string;
    level: string;
  };
  pointSampling: string;
  collectedByUserId: string;
  collectedBy: {
    id: string;
    name: string;
  };
};
