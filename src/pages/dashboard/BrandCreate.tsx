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
import { BrandDto } from 'src/@types/models';
import BrandNewEditForm from 'src/sections/@dashboard/brand/BrandNewEditForm';

// ----------------------------------------------------------------------

export default function BrandCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const [brands, setBrands] = useState<BrandDto[]>([]);
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    AxiosApi.brandList()
      .then((res) => {
        setBrands(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const currentBrand = brands.find((user) => paramCase(user.id || '') === id);

  return (
    <Page title="برند: ساخت برند">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'ساخت برند' : 'ویرایش برند'}
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'برند', href: PATH_DASHBOARD.brand.list },
            { name: !isEdit ? 'ساخت برند' : capitalCase(id) },
          ]}
        />

        <BrandNewEditForm isEdit={isEdit} currentBrand={currentBrand} />
      </Container>
    </Page>
  );
}
