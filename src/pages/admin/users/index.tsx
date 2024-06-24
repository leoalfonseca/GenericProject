import Head from 'next/head';
import Box from '@mui/material/Box';
import Breadcrumb from 'layouts/full/shared/breadcrumb/Breadcrumb';
import UsersTable from './components/UsersTable'; // Alteramos a importação para o novo componente
import { ProtectRoute } from 'components/ProtectRoute';

const GroupPage = () => {
  const breadcrumbItems = [
    {
      title: 'Administração',
      to: '/home',
    },
  ];

  return (
    <ProtectRoute>
      <Box display="flex" flexDirection="column" height="80vh">
        <Head>
          <title>Usuários</title>
        </Head>

        <Box>
          <Breadcrumb title="Usuários" items={breadcrumbItems} />
        </Box>

        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          marginTop={3}
        >
          {/* Usando o novo componente UsersTable com campos adicionais */}
          <UsersTable />
        </Box>
      </Box>
    </ProtectRoute>
  );
};

export default GroupPage;
