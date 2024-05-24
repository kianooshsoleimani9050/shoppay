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
import SettingNewEditForm from '../../sections/@dashboard/setting/SettingNewEditForm';
import AxiosApi from 'src/utils/axios';
import { useEffect, useState } from 'react';
import { SettingDto } from 'src/@types/models';

// ----------------------------------------------------------------------

export default function SettingCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const [settings, setSetting ] = useState<SettingDto[]>([])
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    AxiosApi.settingList({}).then((res) => {
      setSetting(res.data)
    }).catch((err) => {console.error(err)});
  }, [])
  const currentSetting = settings.find((item) => paramCase(item.id) === id);

  return (
    <Page title="Setting: Create a new setting">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new setting' : 'Edit setting'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Setting', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New Setting' : capitalCase(id) },
          ]}
        />

        <SettingNewEditForm isEdit={isEdit} currentSetting={currentSetting} />
      </Container>
    </Page>
  );
}
