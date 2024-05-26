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
import { CategoryDto } from 'src/@types/models';
import CategoryNewEditForm from 'src/sections/@dashboard/category/CategoryNewEditForm';

// ----------------------------------------------------------------------

export default function CategoryCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const [categories, setCategories] = useState<CategoryDto[]>([])
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    AxiosApi.categoryList({}).then((res) => {
      setCategories(res.data)
    }).catch((err) => { console.error(err) });
  }, [])
  const currentCategory = categories.find((user) => paramCase(user.id || "") === id);

  return (
    <Page title="Category: Create a new category">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new category' : 'Edit category'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Category', href: PATH_DASHBOARD.category.list },
            { name: !isEdit ? 'New category' : capitalCase(id) },
          ]}
        />

        <CategoryNewEditForm isEdit={isEdit} currentCategory={currentCategory} />
      </Container>
    </Page>
  );
}
