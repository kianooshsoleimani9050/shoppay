import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Container,
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
import { useGetCategoryList } from 'src/hooks/query/category/useGetCategoryList';

// ----------------------------------------------------------------------

export default function CategoryList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetCategoryList(
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
    <Page title="Category: List" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="Category List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Category', href: PATH_DASHBOARD.category.root },
            { name: 'List' },
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
                field: 'icon',
                headerName: 'icon',
                flex: 1,
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