import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
} from '@mui/material';
import GenericModal from 'components/genericModal/baseModal';
import { UserContext } from 'context/UserContext';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserProps } from 'types/user';
import { compareValues } from 'utils/compareValues';
import * as yup from 'yup';

interface EditUserFormProps {
  open: boolean;
  handleClose: () => void;
  user: UserProps | null;
  userObj: any;
}

interface IOption {
  value: string;
  label: string;
}

const EditUserForm = ({
  open,
  handleClose,
  user,
  userObj,
}: EditUserFormProps) => {
  const { editUser } = useContext(UserContext);

  const [initialValues, setInitialValues] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
  });

  const schemaUsers = yup.object({
    name: yup.string(),
    username: yup.string(),
    email: yup.string().email('Email inválido'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaUsers,
    onSubmit: async (values) => {
      try {
        if (user) {
          const dataUpdated = compareValues(initialValues, values);

          if (Object.keys(dataUpdated).length > 0) {
            await editUser(user.id, dataUpdated);
          } else {
            toast.error('Nenhuma alteração foi feita!');
          }

          formik.resetForm();
          handleCloseAndClear();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

  useEffect(() => {
    if (user) {
      formik.setFieldValue('name', user?.name);
      formik.setFieldValue('username', user?.username);
      formik.setFieldValue('email', user?.email);

      setInitialValues({
        name: user?.name,
        email: user?.email,
        username: user?.username,
      });
    }
  }, [user]);

  return (
    <GenericModal
      isLoading={false}
      handleClose={handleCloseAndClear}
      formikhandleSubmit={formik.handleSubmit}
      isOpen={open}
      title="Editar Usuário"
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
          </FormControl>
        </Grid>
      </Grid>
    </GenericModal>
  );
};

export default EditUserForm;
