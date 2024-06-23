export type WaterProps = {
  id?: string;
  userId: string;
  clusterId: string;
  status: string;
  collectedTimeDate: Date;
  description: string;
  rejectionReason: string;
  ph: number | null;
  tog: number | null;
  oxygen: number | null;
  ironContent: number | null;
  sulfateContent: number | null;
  sulfideContent: number | null;
  codeSample: string;
  pointSamplingId: string;
  responsibilityTechinalId: string;
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
  description: string;
  rejectionReason: string;
  collectedTimeDate: Date;
  ph: number | null;
  tog: number | null;
  oxygen: number | null;
  ironContent: number | null;
  sulfateContent: number | null;
  sulfideContent: number | null;
  codeSample: string;
  pointSamplingId: string;
  responsibilityTechinalId: string;
  collectedByUserId: string;
  responsibilityTechinal: {
    id: string;
    name: string;
  };
  collectedBy: {
    id: string;
    name: string;
  };
  pointSampling: string;
};
