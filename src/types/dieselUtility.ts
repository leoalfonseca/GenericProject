export type DieselProps = {
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
  waterContent: number | null;
  codeSample: string;
  collectedByUserId: string;
  pointSamplingId: string;
  pointSampling?: {
    id: string;
    name: string;
  };
};

export type DieselEditingProps = {
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
  waterContent: number | null;
  codeSample: string;
  pointSamplingId: string;
  pointSampling: string;
  collectedByUserId: string;
  collectedBy: {
    id: string;
    name: string;
  };
};
