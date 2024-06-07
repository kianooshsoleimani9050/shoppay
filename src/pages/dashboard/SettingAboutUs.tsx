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
import SettingRolesNewEditForm from 'src/sections/@dashboard/setting/SettingRolesNewEditForm';
import SettingAboutUsNewEditForm from 'src/sections/@dashboard/setting/SettingAboutUsNewEditForm';

// ----------------------------------------------------------------------

export default function SettingAboutUs() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const [settings, setSetting] = useState<SettingDto>();
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    AxiosApi.aboutUsSetting()
      .then((res) => {
        setSetting(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Page title="تنظیمات: درباره ما">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'ساخت قوانین تنظیمات ' : 'ویرایش قوانین تنظیمات '}
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'تنظیمات ', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'درباره ما' : capitalCase(id) },
          ]}
        />

        <SettingAboutUsNewEditForm isEdit={isEdit} aboutus={settings} />
      </Container>
    </Page>
  );
}
