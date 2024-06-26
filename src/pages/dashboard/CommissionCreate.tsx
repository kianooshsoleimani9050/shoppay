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
import AxiosApi from 'src/utils/axios';
import { useEffect, useState } from 'react';
import { CommissionDto } from 'src/@types/models';
import CommissionNewEditForm from 'src/sections/@dashboard/setting/CommissionNewEditForm';

// ----------------------------------------------------------------------

export default function SettingCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const [settings, setSetting] = useState<CommissionDto[]>([]);
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    AxiosApi.commissionList({})
      .then((res) => {
        setSetting(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const currentCommission = settings.find((item) => paramCase(item.id) === id);

  return (
    <Page title="کمیسیون: ساخت کمیسیون">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'ساخت کمیسیون' : 'ویرایش کمیسیون'}
          links={[
            { name: 'داشبود', href: PATH_DASHBOARD.root },
            { name: 'کمیسیون', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'ساخت کمیسیون' : capitalCase(id) },
          ]}
        />

        <CommissionNewEditForm isEdit={isEdit} currentCommission={currentCommission} />
      </Container>
    </Page>
  );
}
