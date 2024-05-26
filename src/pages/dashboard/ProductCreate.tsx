import { capitalCase, paramCase } from 'change-case';
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
import ProductNewEditForm from 'src/sections/@dashboard/product/ProductNewEditForm';
import { useEffect, useState } from 'react';
import AxiosApi from 'src/utils/axios';
import { ProductDto } from 'src/@types/models';

// ----------------------------------------------------------------------

export default function ProductCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    AxiosApi.productList({})
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const currentProduct = products.find((item) => paramCase(item.id || '') === id);

  return (
    <Page title="Product: Create a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new product' : 'Edit product'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Product', href: PATH_DASHBOARD.product.list },
            { name: !isEdit ? 'New product' : capitalCase(id) },
          ]}
        />

        <ProductNewEditForm isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
