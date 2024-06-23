export type GasProps = {
  id?: string;
  userId: string;
  clusterId: string;
  sampleType?: string;
  status: string;
  description: string;
  rejectionReason: string;
  collectedTimeDate: Date;
  collectionHour?: Date;
  h2SContent: number | null;
  waterContent: number | null;
  ph: number | null;
  waterCut: number | null;
  collapseTime: number | null;
  chloride: number | null;
  codeSample: string;
  collectedByUserId: string;
  pointSamplingId: string;
  pointSampling?: {
    id: string;
    name: string;
  };
};

export type GasEditingProps = {
  id: string;
  userId: string;
  clusterId: string;
  sampleType: string;
  status: string;
  description: string;
  rejectionReason: string;
  collectedTimeDate: Date;
  h2SContent: number | null;
  waterContent: number | null;
  ph: number | null;
  waterCut: number | null;
  collapseTime: number | null;
  chloride: number | null;
  codeSample: string;
  pointSamplingId: string;
  pointSampling: string;
  collectedByUserId: string;
  collectedBy: {
    id: string;
    name: string;
  };
};
