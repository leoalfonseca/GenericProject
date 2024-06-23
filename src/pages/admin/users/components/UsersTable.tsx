import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { DataGrid, GridRenderCellParams, ptBR } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IconEdit, IconPlus, IconKey } from '@tabler/icons-react';
import CustomChip from 'components/CustomChip';
import { UserContext } from 'context/UserContext';
import ptBRLocale from 'date-fns/locale/pt-BR';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import UserRegisterForm from 'pages/admin/users/components/UserRegisterForm';
import React, { useContext, useEffect, useState } from 'react';
import { UserProps } from 'types/user';
import * as XLSX from 'xlsx';
import EditUserForm from './EditUserForm';
import { IValueGetter } from 'types/valueGetter';
import { AuthContext } from 'context/AuthContext';
import { api } from 'services/api';
import { GetGroupType } from 'types/group';
import ConfirmationModal from 'components/modal/ConfirmationModal';

const UsersTable = () => {
  // ================================================== //
  interface iUserSwitchStatus {
    userId: string;
    status: boolean;
  }

  const [userSwitchStatus, setUserSwitchStatus] =
    useState<iUserSwitchStatus | null>(null);
  const [isModalComfirmStatusOpen, setIsModalComfirmStatusOpen] =
    useState<boolean>(false);
  // ================================================== //

  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleDownloadMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };

  const handleDownloadMenuClose = () => {
    setDownloadMenuAnchor(null);
  };

  const handleExportToExcel = () => {
    const exportData = rows.map((item) => ({
      Status: item.isUsed ? 'Ativo' : 'Inativo',
      Usuário: item.name,
      Alias: item.username,
      Email: item.email,
      Grupo: item.group?.name,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados');

    const excelBase64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

    const byteCharacters = atob(excelBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const excelBlob = new Blob([new Uint8Array(byteNumbers)], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(excelBlob, 'Exportação Usuários.xlsx');
  };

  const handleExportToPDF = () => {
    const exportData: any = rows.map((item: any) => ({
      Status: item.isUsed ? 'Ativo' : 'Inativo',
      Usuário: item.name,
      Alias: item.username,
      Email: item.email,
      Grupo: item.group?.name,
    }));

    const doc = new jsPDF('l', 'mm', [297, 400]);

    const columns = [
      { header: 'Status', dataKey: 'Status' },
      { header: 'Usuário', dataKey: 'Usuário' },
      { header: 'Alias', dataKey: 'Alias' },
      { header: 'Email', dataKey: 'Email' },
      { header: 'Grupo', dataKey: 'Grupo' },
    ];

    const rowsPDF = exportData.map((row: any) => {
      return [row.Status, row.Usuário, row.Alias, row.Email, row.Grupo];
    });

    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rowsPDF,
    });

    const pdfBlob = doc.output('blob');

    saveAs(pdfBlob, 'Exportação Usuários.pdf');
  };

  const columns = [
    {
      field: 'isUsed',
      headerName: 'Status',
      headerClassName: 'header',
      flex: 0.9,
      minWidth: 140,
      type: 'singleSelect',
      valueOptions: ['Ativo', 'Inativo'],
      valueGetter: (params: any) => {
        return params.value ? 'Ativo' : 'Inativo';
      },
      renderCell: (params: any) => (
        <Box>
          {params.value === 'Ativo' ? (
            <CustomChip label="Ativo" type="success" />
          ) : params.value === 'Inativo' ? (
            <CustomChip label="Inativo" type="error" />
          ) : null}
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Nome',
      headerClassName: 'header',
      flex: 0.9,
      minWidth: 140,
    },
    {
      field: 'username',
      headerName: 'Nome de usuário',
      headerClassName: 'header',
      flex: 0.9,
      minWidth: 140,
    },
    {
      field: 'email',
      headerName: 'Email',
      headerClassName: 'header',
      flex: 0.9,
      minWidth: 140,
    },
    {
      field: 'group',
      valueGetter: (params: IValueGetter) => params?.value?.name,
      headerName: 'Grupo',
      headerClassName: 'header',
      minWidth: 140,
      valueFormatter: (params: any) => {
        if (!params.value) {
          return 'Ainda não associado';
        }
        return params.value;
      },
      flex: 0.9,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.9,
      type: 'actions',
      minWidth: 240,
      headerClassName: 'header',
      renderCell: (params: { row: any }) => (
        <Box>
          <Button
            startIcon={<IconEdit />}
            onClick={() => handleEditUser(params.row.id)}
            sx={{
              mx: 0.3,
              backgroundColor: '#004645',
              color: 'white',
              '&:hover': {
                backgroundColor: `#002d2d`,
                color: 'white',
              },
              '& .MuiButton-startIcon': {
                margin: 'auto',
              },
            }}
          />
        </Box>
      ),
    },
  ];

  const [rows, setRows] = useState<UserProps[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProps | null>(null);
  const [editingGroup, setEditingGroup] = useState<GetGroupType | null>(null);
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [initialSwitchStates, setInitialSwitchStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const [userObj, setGroupObj] = useState<any>({
    menus: [],
    groups: [],
  });

  const [groupObjToEdit, setGroupObjEdit] = useState<any>({
    menus: [],
    groups: [],
  });

  const handleOpen = () => setOpen(true);

  const handleOpenEdit = async () => {
    try {
      setOpenEdit(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setOpenPermissionModal(false);
    getUsersList();
  };

  const { getUsers } = useContext(UserContext);

  const getUsersList = async () => {
    const usersList = await getUsers();
    setRows(usersList);

    const initialSwitchStatesObj: { [key: string]: boolean } = {};
    usersList.forEach((user) => {
      initialSwitchStatesObj[user.id] = user.isUsed;
    });
    setInitialSwitchStates(initialSwitchStatesObj);
  };

  const handleEditUser = (userId: string) => {
    const userToEdit = rows.find((user) => user.id === userId);

    if (userToEdit) {
      setEditingUser(userToEdit);
      handleOpenEdit();
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBRLocale}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            display={'flex'}
            alignItems={'right'}
            justifyContent={'right'}
            marginRight={5}
          >
            <Button
              onClick={handleDownloadMenuOpen}
              sx={{
                mx: 0.3,
                backgroundColor: '#004645',
                color: 'white',
                '&:hover': {
                  backgroundColor: `#002d2d`,
                  color: 'white',
                },
                '& .MuiButton-startIcon': {
                  margin: 'auto',
                },
              }}
            >
              Exportar
            </Button>
            <Menu
              anchorEl={downloadMenuAnchor}
              open={Boolean(downloadMenuAnchor)}
              onClose={handleDownloadMenuClose}
            >
              <MenuItem onClick={handleExportToExcel}>Excel</MenuItem>
              <MenuItem onClick={handleExportToPDF}>PDF</MenuItem>
            </Menu>
            <Button
              onClick={handleOpen}
              startIcon={<IconPlus />}
              sx={{
                backgroundColor: '#004645',
                color: 'white',
                '&:hover': {
                  backgroundColor: `#002d2d`,
                  color: 'white',
                },
                '& .MuiButton-startIcon': {
                  margin: 'auto',
                },
              }}
            >
              Adicionar Novo
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            height={350}
            width="100%"
            paddingX={5}
            sx={{
              '& .header': {
                backgroundColor: 'primary',
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooterSelectedRowCount
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              autoHeight
              pageSizeOptions={[5, 10, 50, 100]}
              sx={{
                border: 1,
                borderColor: 'divider',
                '& .MuiDataGrid-cell': {
                  border: 1,
                  borderColor: 'divider',
                  ':focus': {
                    outline: 'none',
                  },
                  cursor: 'default',
                },
              }}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
          </Box>
        </Grid>
      </Grid>

      <UserRegisterForm
        open={open}
        handleClose={handleClose}
        userObj={userObj}
      />
      <EditUserForm
        open={openEdit}
        handleClose={handleClose}
        user={editingUser}
        userObj={userObj}
      />
    </LocalizationProvider>
  );
};

export default UsersTable;
