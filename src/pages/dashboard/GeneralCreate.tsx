import { capitalCase } from 'change-case';
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
import { SettingDto } from 'src/@types/models';
import GeneralNewEditForm from 'src/sections/@dashboard/setting/GeneralNewEditForm';

// ----------------------------------------------------------------------

export default function GeneralCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const [settings, setSetting] = useState<SettingDto>();
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    AxiosApi.generalSetting()
      .then((res) => {
        setSetting(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Page title="تنظیمات: ساخت تنظیمات عمومی">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'ساخت تنظیمات عمومی' : 'ویرایش تنظیمات عمومی'}
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'تنظیمات عمومی', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'ساخت تنظیمات عمومی' : capitalCase(id) },
          ]}
        />

        <GeneralNewEditForm isEdit={isEdit} currentSetting={settings} />
      </Container>
    </Page>
  );
}
