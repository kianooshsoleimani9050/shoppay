import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Container,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { useGetProductRequestList } from 'src/hooks/query/product/useGetProductRequestList';
import { ProductRequestDto } from 'src/@types/models';

// ----------------------------------------------------------------------

export default function ProductRequestList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetProductRequestList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  const navigate = useNavigate()

  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.category.edit(`${rowId}`))
  }

  return (
    <Page title="Product: Request List" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="Product Request List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Product', href: PATH_DASHBOARD.category.root },
            { name: 'Request List' },
          ]}
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
                field: 'description',
                headerName: 'Description',
                flex: 1,
              },
              {
                field: 'category',
                headerName: 'Category',
                flex: 1,
                renderCell: ({ row }: { row: ProductRequestDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.category?.title || ''}
                  </Typography>
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
            onRowClick={(row)=>{
              handleRowClick(row.id)
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}