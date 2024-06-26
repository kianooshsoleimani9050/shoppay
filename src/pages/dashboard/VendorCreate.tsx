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
import { VendorDto } from 'src/@types/models';
import VendorNewEditForm from 'src/sections/@dashboard/vendor/VendorNewEditForm';

// ----------------------------------------------------------------------

export default function VendorCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const [vendor, setVendor] = useState<VendorDto>();
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    AxiosApi.singleVendor(id)
      .then((res) => {
        setVendor(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <Page title="فروشنده: ساخت فروشنده">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'ساخت فروشنده' : 'ویرایش فروشنده'}
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'فروشنده', href: PATH_DASHBOARD.vendor.list },
            { name: !isEdit ? 'ساخت فروشنده' : capitalCase(vendor?.title as unknown as string) },
          ]}
        />

        <VendorNewEditForm isEdit={isEdit} currentVendor={vendor} />
      </Container>
    </Page>
  );
}
