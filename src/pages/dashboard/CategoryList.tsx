import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Card, Container, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import Iconify from 'src/components/Iconify';
import { CategoryTreeView } from 'src/components/custom/CategoryTreeView';
// ----------------------------------------------------------------------

export default function CategoryList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="دسته بندی: لیست" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="دسته بندی لیست"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'دسته بندی', href: PATH_DASHBOARD.category.root },
            { name: 'لیست' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.category.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              ساخت دسته بندی
            </Button>
          }
        />
        <Card sx={{ flexGrow: 1 }}>
          <CategoryTreeView />
        </Card>
      </Container>
    </Page>
  );
}
