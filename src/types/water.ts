export type WaterProps = {
  id?: string;
  userId: string;
  clusterId: string;
  status: string;
  sampleType: string;
  collectedTimeDate: Date;
  collectionHour?: Date;
  description: string;
  rejectionReason: string;
  ph: number | null;
  tog: number | null;
  codeSample: string;
  pointSamplingId: string;
  collectedByUserId: string;
  pointSampling?: {
    id: string;
    name: string;
  };
};

export type WaterEditingProps = {
  id: string;
  userId: string;
  status: string;
  clusterId: string;
  sampleType: string;
  description: string;
  rejectionReason: string;
  collectedTimeDate: Date;
  ph: number | null;
  tog: number | null;
  codeSample: string;
  pointSamplingId: string;
  pointSampling: string;
  collectedByUserId: string;
  collectedBy: {
    id: string;
    name: string;
  };
};
