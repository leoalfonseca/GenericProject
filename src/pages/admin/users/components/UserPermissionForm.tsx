import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GenericModal from 'components/genericModal/baseModal';
import { GroupContext } from 'context/GroupContext';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//@ts-ignore
import { GroupProps } from 'types/group';

interface EditGroupFormProps {
  open: boolean;
  handleClose: () => void;
  group: GroupProps | null;
  groupObj: any;
}

type IFormValues = {
  name: string;
  menus: string[];
  childrens: any[];
  operations: any[];
  description?: string;
  isActive: boolean;
};

type IFormValuesEdit = Partial<IFormValues>;

const UserPermissionForm = ({
  open,
  handleClose,
  group,
  groupObj,
}: EditGroupFormProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [hasChildrenMenu, sethasChildrenMenu] = useState(false);
  const [childrensMenu, setChildrensMenu] = useState([]);
  const [operationsMenu, setOperationsMenu] = useState([]);

  const { editGroupPermission, operationList } = useContext(GroupContext);

  const formik = useFormik({
    initialValues: {
      name: group?.name || '',
      description: group?.description || '',
      isActive: group?.isActive,
      menus: [],
      childrens: [],
      operations: [],
    },
    onSubmit: async (values) => {
      const response = transformData(values);

      try {
        if (group) {
          // const dataUpdated = compareValues(initialValues, values);

          if (values.menus.length === 0) {
            toast.error('Selecione as permissões');
            throw new Error('Selecione as permissões');
          }

          // if (Object.keys(dataUpdated).length > 0) {
          await editGroupPermission(group.id, response);
          // } else {
          //   toast.error('Nenhuma alteração foi feita!');
          // }

          formik.resetForm();
          handleCloseAndClear();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (group) {
      formik.setFieldValue('name', group.name);
      formik.setFieldValue('description', group.description);
    }
  }, [group]);

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
    setSelectedPermissions([]);
    sethasChildrenMenu(false);
  };

  const handleMenuChange = (event: any) => {
    const idSelectedMenus = event.target.value;
    formik.handleChange(event);

    const selectedChildrens = groupObj.menus
      .filter((menu: any) => idSelectedMenus.includes(menu.id))
      .map((menu: any) => menu.children)
      .flat();

    if (selectedChildrens.length > 0) {
      sethasChildrenMenu(true);
    } else {
      sethasChildrenMenu(false);
    }

    setChildrensMenu(selectedChildrens);
    setSelectedPermissions(idSelectedMenus);
  };

  const handleChildrenChange = (event: any) => {
    formik.handleChange(event);

    const selectedOperations = groupObj.menus
      .flatMap((menu: any) => menu.children)
      //@ts-ignore
      .filter((children: any) => formik.values.childrens.includes(children.id))
      .flatMap((children: any) => children.operations);

    setOperationsMenu(selectedOperations);
  };

  const transformData = (inputData: any) => {
    const transformedData = {
      name: inputData.name,
      description: inputData.description,
      menus: inputData.menus.map((menuId: any) => {
        const menu = {
          menuId,
          childrens: [],
          operations: [],
        };

        const selectedMenu = groupObj.menus.find(
          (menu: any) => menu.id === menuId
        );

        if (selectedMenu) {
          if (selectedMenu.children.length > 0) {
            const childrensForMenu = selectedMenu.children.filter(
              (child: any) => inputData.childrens.includes(child.id)
            );

            menu.childrens = childrensForMenu.map((children: any) => {
              if (operationList && operationList.length > 0) {
                const operationsForChildren = operationList.filter(
                  (operation: any) =>
                    inputData.operations.includes(operation.id)
                );

                return {
                  childrenId: children.id,
                  operations: operationsForChildren.map((operation: any) => ({
                    operationId: operation.id,
                  })),
                };
              }

              return {
                childrenId: children.id,
                operations: [],
              };
            });
          } else {
            if (operationList && operationList.length > 0) {
              const operationsForMenu = operationList.filter((operation: any) =>
                inputData.operations.includes(operation.id)
              );
              // @ts-ignore
              menu.operations = operationsForMenu.map((operation: any) => ({
                operationId: operation.id,
              }));
            }
          }
        }

        return menu;
      }),
    };

    return transformedData;
  };

  return (
    <GenericModal
      isLoading={false}
      handleClose={handleCloseAndClear}
      formikhandleSubmit={formik.handleSubmit}
      isOpen={open}
      title="Editar Grupo"
    >
      <>
        <FormControl sx={{ paddingY: 1.5 }} fullWidth>
          <TextField
            label="Nome do Grupo *"
            sx={{ paddingY: 0.5 }}
            fullWidth
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
        </FormControl>

        <FormControl sx={{ paddingY: 1.5 }} variant="outlined" fullWidth>
          <InputLabel sx={{ paddingY: 1 }} id="menus" htmlFor="menus">
            Permissões
          </InputLabel>
          <Select
            label="Permissões"
            labelId="menus"
            id="menus"
            name="menus"
            multiple
            value={formik.values.menus}
            onChange={handleMenuChange}
            error={formik.touched.menus && Boolean(formik.errors.menus)}
          >
            {groupObj &&
              groupObj.menus.map((menus: any) => (
                <MenuItem key={menus.id} value={menus.id}>
                  <Checkbox checked={selectedPermissions.includes(menus.id)} />
                  {menus.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {hasChildrenMenu && (
          <FormControl sx={{ paddingY: 1.5 }} variant="outlined" fullWidth>
            <InputLabel sx={{ paddingY: 1 }} id="childrens" htmlFor="childrens">
              Subpermissões
            </InputLabel>
            <Select
              label="Subpermissões"
              labelId="childrens"
              id="childrens"
              multiple
              {...formik.getFieldProps('childrens')}
              value={formik.values.childrens}
              onChange={handleChildrenChange}
            >
              {childrensMenu.map((children: any) => (
                <MenuItem key={children.id} value={children.id}>
                  <Checkbox
                    //@ts-ignore
                    checked={formik.values.childrens.includes(children.id)}
                  />
                  {children.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {selectedPermissions.length > 0 && (
          <FormControl sx={{ paddingY: 1.5 }} variant="outlined" fullWidth>
            <InputLabel
              sx={{ paddingY: 1 }}
              id="operations"
              htmlFor="operations"
            >
              Operações
            </InputLabel>
            <Select
              label="Operações"
              labelId="operations"
              id="operations"
              multiple
              {...formik.getFieldProps('operations')}
              value={formik.values.operations}
            >
              {operationList &&
                operationList.map((operation: any) => (
                  <MenuItem key={operation.id} value={operation.id}>
                    <Checkbox
                      //@ts-ignore
                      checked={formik.values.operations.includes(operation.id)}
                    />
                    {operation.method}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        <FormControl sx={{ paddingY: 1.5 }} fullWidth>
          <TextField
            label="Descrição *"
            sx={{ paddingY: 0.5 }}
            fullWidth
            name="description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
          />
        </FormControl>
      </>
    </GenericModal>
  );
};

export default UserPermissionForm;
