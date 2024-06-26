import { useState } from 'react';
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
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CustomDataGrid, QueryType } from '../../components/custom/CustomDataGrid';
import { SupplierDto } from 'src/@types/models';
import { useGetPendingSupplierList } from 'src/hooks/query/supplier/useGetPendingSupplierList';

// ----------------------------------------------------------------------

export default function PendingSupplierList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetPendingSupplierList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState,
  );

  return (
    <Page title="Pending Supplier: List" sx={{ height: "100%" }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <HeaderBreadcrumbs
          heading="Pending Supplier List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pending Supplier', href: PATH_DASHBOARD.supplier.pending },
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
                field: "title",
                headerName: "Name",
                flex: 1,
              },
              {
                field: "user",
                headerName: "User",
                flex: 1,
                renderCell: ({ row }: { row: SupplierDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.user?.fullName}
                  </Typography>
                ),
              },
              {
                field: "category",
                headerName: "Category",
                flex: 1,
                renderCell: ({ row }: { row: SupplierDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.category?.title}
                  </Typography>
                ),
              },
              {
                field: "balance",
                headerName: "Balance",
                flex: 1,
              },
              {
                field: "mobile",
                headerName: "Mobile",
                flex: 1,
              },
              {
                field: "telephone",
                headerName: "Telephone",
                flex: 1,
              },
              {
                field: "status",
                headerName: "Status",
                flex: 1,
              },
              {
                field: "createdAt",
                headerName: "CreatedAt",
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