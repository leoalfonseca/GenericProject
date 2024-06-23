import { ElementProps } from "./element";
import { responsibleTechnician } from "./responsibleTechnician";

export type VerificationProps = {
  id: string;
  reason: string;
  description: string;
  dateVerification: Date;
  approved: boolean;
  disapproved: boolean;
  responsible: responsibleTechnician;
  userId: string;
  elementItem: ElementProps;
};
