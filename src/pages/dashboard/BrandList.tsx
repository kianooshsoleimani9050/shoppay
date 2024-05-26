import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import Iconify from 'src/components/Iconify';
import { CategoryDto } from 'src/@types/models';
import ImageField from 'src/components/custom/ImageField';
import { useGetBrandList } from 'src/hooks/query/brand/useGetBrandList';
// ----------------------------------------------------------------------

export default function BrandList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetBrandList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  const navigate = useNavigate();

  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.brand.edit(`${rowId}`));
  };

  return (
    <Page title="Brand: List" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="Brand List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Brand', href: PATH_DASHBOARD.brand.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.brand.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Brand
            </Button>
          }
        />
        <Card sx={{ flexGrow: 1 }}>
          <CustomDataGrid
            loading={isLoading}
            rows={data?.data || []}
            rowCount={data?.meta?.itemCount || 0}
            columns={[
              {
                field: 'title',
                headerName: 'Title',
                flex: 1,
              },
              {
                field: 'icon',
                headerName: 'icon',
                flex: 1,
                renderCell: ({ row }: { row: CategoryDto }) => (
                  <ImageField imageId={row.icon} />
                ),
              },
              {
                field: 'createdAt',
                headerName: 'CreatedAt',
                flex: 1,
              },
            ]}
            onQueryChange={(tableState) => {
              setTableState(tableState);
            }}
            onRowClick={(row) => {
              handleRowClick(row.id);
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}
