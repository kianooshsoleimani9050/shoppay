import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Card, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { useGetUserList } from 'src/hooks/query/user/useGetUserList';
import moment from 'jalali-moment';
import { ProductDto } from 'src/@types/models';

export default function UserList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetUserList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.user.single(`${rowId}`));
  };

  return (
    <Page title="کاربر: لیست" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="کاربر لیست"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'کاربر', href: PATH_DASHBOARD.user.root },
            { name: 'لیست' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              ساخت کاربر
            </Button>
          }
        />
        <Card sx={{ flexGrow: 1 }}>
          <CustomDataGrid
            loading={isLoading}
            rows={data?.data || []}
            rowCount={data?.meta.itemCount || 0}
            columns={[
              {
                field: 'fullName',
                headerName: 'Full Name',
                flex: 1,
              },
              {
                field: 'email',
                headerName: 'Email',
                flex: 1,
              },
              {
                field: 'role',
                headerName: 'Role',
                flex: 1,
              },
              {
                field: 'isActive',
                headerName: 'IsActive',
                flex: 1,
              },
              {
                field: 'mobile',
                headerName: 'Mobile',
                flex: 1,
              },
              {
                field: 'updatedAt',
                headerName: 'تاریخ ویرایش',
                flex: 1,
                renderCell: ({ row }: { row: ProductDto }) => (
                  <Typography variant="body2" noWrap>
                    {moment(row?.updatedAt || row?.createdAt, 'YYYY/MM/DD')
                      .locale('fa')
                      .format('YYYY/MM/DD')}
                  </Typography>
                ),
              },
              {
                field: 'deletedAt',
                headerName: 'DeletedAt',
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
