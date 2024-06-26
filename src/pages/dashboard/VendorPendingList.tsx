import { useState } from 'react';
// @mui
import { Card, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CustomDataGrid, QueryType } from '../../components/custom/CustomDataGrid';
import { VendorDto } from 'src/@types/models';
import { useGetPendingVendorList } from 'src/hooks/query/vendor/useGetPendingVendorList';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

export default function PendingVendorList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetPendingVendorList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  const handleRejectItem = (rowId: string) => {
    console.info('reject');
  };

  const handleApproveItem = (rowId: string) => {
    console.info('approved');
  };

  return (
    <Page title="Pending Vendor: List" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="Pending Vendor List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pending Vendor', href: PATH_DASHBOARD.vendor.pending },
            { name: 'List' },
          ]}
        />
        <Card sx={{ flexGrow: 1 }}>
          <CustomDataGrid
            loading={isLoading}
            rows={data?.data || []}
            rowCount={data?.meta.itemCount || 0}
            columns={[
              {
                field: 'title',
                headerName: 'Name',
                flex: 1,
              },
              {
                field: 'user',
                headerName: 'User',
                flex: 1,
                renderCell: ({ row }: { row: VendorDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.user?.fullName}
                  </Typography>
                ),
              },
              {
                field: 'category',
                headerName: 'Category',
                flex: 1,
                renderCell: ({ row }: { row: VendorDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.category?.title}
                  </Typography>
                ),
              },
              {
                field: 'balance',
                headerName: 'Balance',
                flex: 1,
              },
              {
                field: 'mobile',
                headerName: 'Mobile',
                flex: 1,
              },
              {
                field: 'telephone',
                headerName: 'Telephone',
                flex: 1,
              },
              {
                field: 'status',
                headerName: 'Status',
                flex: 1,
              },
              {
                field: 'createdAt',
                headerName: 'CreatedAt',
                flex: 1,
              },
              {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                getActions: ({ row }: { row: VendorDto }) => [
                  <GridActionsCellItem
                    icon={<Iconify icon={'eva:trash-2-outline'} width={24} height={24} />}
                    onClick={() => {
                      handleRejectItem(row.id);
                    }}
                    color="error"
                    key="Delete"
                    label="Delete"
                  />,
                  <GridActionsCellItem
                    icon={<Iconify icon={'eva:checkmark-square-2-fill'} width={24} height={24} />}
                    onClick={() => {
                      handleApproveItem(row.id);
                    }}
                    color="error"
                    key="Delete"
                    label="Delete"
                  />,
                ],
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
