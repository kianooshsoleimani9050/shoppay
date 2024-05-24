import { useState } from 'react';
// @mui
import { Box, Card, Container, Grid, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { useParams } from 'react-router';
import { useGetUserSingle } from 'src/hooks/query/user/UserGetSingle';
import { RHFSwitch, RHFTextField } from 'src/components/hook-form';
import { useGetUserOrders } from 'src/hooks/query/user/UserGetUserOrders';
import { OrderDto } from 'src/@types/models';
import { FormProvider } from 'react-hook-form';

export default function UserSingle() {
  const { themeStretch } = useSettings();

  const { id = '' } = useParams();

  const [tableState, setTableState] = useState<QueryType>();
  const { data: user, isLoading } = useGetUserSingle(id, !!tableState);
  const { data: userOrders, isLoading: userOrdersIsLoading } = useGetUserOrders(
    id,
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  return (
    <Page title="User: Single" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="User Single"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Sinlge' },
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user?.fullName}{' '}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user?.email}{' '}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user?.mobile}{' '}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user?.role}{' '}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ flexGrow: 1 }}>
          <CustomDataGrid
            loading={userOrdersIsLoading}
            rows={userOrders?.data || []}
            rowCount={userOrders?.meta?.itemCount || 0}
            columns={[
              {
                field: 'code',
                headerName: 'Code',
                flex: 1,
              },
              {
                field: 'totalPrice',
                headerName: 'Total price',
                flex: 1,
              },
              {
                field: 'status',
                headerName: 'Status',
                flex: 1,
              },
              {
                field: 'address',
                headerName: 'Address',
                flex: 1,
                renderCell: ({ row }: { row: OrderDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.address?.address || ''}
                  </Typography>
                ),
              },
              {
                field: 'userName',
                headerName: 'User Full Name',
                flex: 1,
                renderCell: ({ row }: { row: OrderDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.user?.fullName || ''}
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
          />
        </Card>
      </Container>
    </Page>
  );
}
