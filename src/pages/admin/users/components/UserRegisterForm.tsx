import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import GenericModal from 'components/genericModal/baseModal';
import { UserContext } from 'context/UserContext';
import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import OrderListFunction from 'utils/orderList';
import * as yup from 'yup';

interface IUserRegisterProps {
  open: boolean;
  handleClose: () => void;
  userObj: any;
}

interface IFormValues {
  name: string;
  username: string;
  groupId: string;
  email: string;
  isActive: boolean;
}

const UserRegisterForm = ({
  open,
  handleClose,
  userObj,
}: IUserRegisterProps) => {
  const { createUser } = useContext(UserContext);

  const schemaUsers = yup.object({
    name: yup.string().required('Campo Obrigatório'),
    username: yup.string().required('Campo Obrigatório'),
    groupId: yup.string().required('Campo Obrigatório'),
    email: yup.string().email('Email inválido').required('Campo Obrigatório'),
    isActive: yup.boolean().required('Campo Obrigatório'),
  });

  const initialValues: IFormValues = {
    name: '',
    username: '',
    groupId: '',
    email: '',
    isActive: true,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaUsers,
    onSubmit: async (values) => {
      try {
        await createUser(values);
        formik.resetForm();
        handleCloseAndClear();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <GenericModal
      handleClose={handleCloseAndClear}
      isOpen={open}
      formikhandleSubmit={formik.handleSubmit}
      title="Dados do Usuário"
      isLoading={false}
    >
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Nome *"
              fullWidth
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <Typography color="error">
              {formik.touched.name && formik.errors.name}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Nome de usuário *"
              fullWidth
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
            />
            <Typography color="error">
              {formik.touched.username && formik.errors.username}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Email *"
              fullWidth
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <Typography color="error">
              {formik.touched.email && formik.errors.email}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="groupId" htmlFor="groupId">
              Grupo *
            </InputLabel>
            <Select
              label="Grupo *"
              labelId="groupId"
              id="groupId"
              {...formik.getFieldProps('groupId')}
              error={formik.touched.groupId && Boolean(formik.errors.groupId)}
            >
              {userObj &&
                userObj.groups.map((group: any) => {
                  return (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <Typography color="error">
              {formik.touched.groupId && formik.errors.groupId}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </GenericModal>
  );
};

export default UserRegisterForm;
