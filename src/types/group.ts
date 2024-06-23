export type GetGroupType = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isUsed: boolean;
};

export type CreateGroupType = {
  name: string;
  description: string;
  menus: menuType;
};

export type menuType = {
  menuId: string;
  childrens: childrensType;
  operations: operations;
};

export type childrensType = {
  childrenId: string;
  operations: operations;
};

export type operations = {
  operationId: string;
};

export type UpdateGroupPermission = Partial<CreateGroupType>;

export type GroupPermissionType = {
  id: string;
  menuName: string;
  menuRoute: string;
  menuIcon: string;
  menuOrder: number;
  hasParent: boolean;
  hasChildren: boolean;
  children: null;
  operations: { operationName: 'GET' | 'POST' | 'PATCH' }[];
};

export type GroupById = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  groupPermissions: GroupPermissionType[];
};

export type EditGroupType = {
  menus: menuType;
};
