export type OperationProps = {
  operationName: 'PUT' | 'GET' | 'POST' | 'DELETE' | 'PATCH';
};

export type ChildrenProps = {
  hasChildren: boolean;
  hasParent: boolean;
  menuIcon: string;
  menuName: string;
  menuOrder: string;
  menuRoute: string;
  userOperation: OperationProps[];
};

export type PermissionProps = {
  children: ChildrenProps[];
  hasChildren: boolean;
  hasParent: boolean;
  menuIcon: string;
  menuName: string;
  menuOrder: string;
  menuRoute: string;
  userOperation: OperationProps[];
};

export type GetGroupPermission = {
  children: ChildrenProps[];
  hasChildren: boolean;
  hasParent: boolean;
  menuIcon: string;
  menuName: string;
  menuOrder: string;
  menuRoute: string;
  operations: OperationProps[];
};
