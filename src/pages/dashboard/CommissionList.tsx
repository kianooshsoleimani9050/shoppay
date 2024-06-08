import { useState } from 'react';
// @mui
import { Button, Card, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import Iconify from 'src/components/Iconify';
import { useGetCommissionList } from 'src/hooks/query/setting/useGetCommissionList';

export default function CommissionList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetCommissionList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.commission.edit(`${rowId}`));
  };

  return (
    <Page title="کمیسیون: لیست" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="کمیسیون لیست"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'کمیسیون', href: PATH_DASHBOARD.commission.root },
            { name: 'لیست' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.commission.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              ساخت کمیسیون
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
                field: 'percentage',
                headerName: 'درصد کمیسیون',
                flex: 1,
              },
              {
                field: 'lessThan',
                headerName: 'کمتر از',
                flex: 1,
              },
              {
                field: 'moreThan',
                headerName: 'بیشتر از',
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
