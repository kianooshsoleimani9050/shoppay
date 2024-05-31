import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';
import AxiosApi from 'src/utils/axios';
import { useEffect, useState } from 'react';
import { UserDto } from 'src/@types/models';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const [users, setUsers] = useState<UserDto[]>([]);
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    AxiosApi.userList({})
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const currentUser = users.find((user) => paramCase(user.id || '') === id);

  return (
    <Page title="کاربر: ساخت کاربر">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? ' ساخت کاربر' : 'ویرایش کاربر'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'کاربر', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'ساخت کاربر' : capitalCase(id) },
          ]}
        />

        <UserNewEditForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
