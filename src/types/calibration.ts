import { ElementProps } from "./element";
import { responsibleTechnician } from "./responsibleTechnician";

export type CalibrationProps = {
  id: string;
  description: string;
  dateCalibration: Date;
  userId: string;
  elementItemId: ElementProps;
  elementItem: ElementProps
  responsible: responsibleTechnician;
  certificate: string
};
