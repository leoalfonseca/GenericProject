export type SampleProps = {
  id: string;
  clusterId: string;
  laboratoryId: string;
  pointSamplingId: string;
  pointSampling: string;
  analyticIds: string[];
  analytics: string;
  code: string;
  location: string;
  collectionDate: Date;
  status: string;
  rejectionReason: string;
  forecastDate: Date;
  results: ResultsProps[];
  isActive: boolean;
  samplingFiles: string[];
  completedDate: any;
};

export type ResultsProps = {
  name: string;
  result: string;
};
