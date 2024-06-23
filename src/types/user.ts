import { GetGroupType } from "./group";
import { PermissionProps } from "./permissions";

export type UserProps = {
  id: string;
  email: string;
  isActive: boolean;
  isUsed: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  crq: string;
  groupId: string;
  group: {
    id: string;
    name: string;
  };
  userPermissions: PermissionProps[];
};
export type UserEditingProps = {
  id: string;
  email: string;
  isActive: boolean;
  isUsed: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  crq: string;
  groupId: string;
  group: string;
  userPermissions: PermissionProps[];
};


