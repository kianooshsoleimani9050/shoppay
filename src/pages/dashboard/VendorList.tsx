import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Card,
  Button,
  Container,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import { useGetVendorList } from '../../hooks/query/vendor/useGetVendorList';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CustomDataGrid, QueryType } from '../../components/custom/CustomDataGrid';
import { VendorDto } from 'src/@types/models';

// ----------------------------------------------------------------------

export default function VendorList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetVendorList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState,
  );

  return (
    <Page title="Vendor: List" sx={{ height: "100%" }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <HeaderBreadcrumbs
          heading="Vendor List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Vendor', href: PATH_DASHBOARD.vendor.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.vendor.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New vendor
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
                field: "title",
                headerName: "Name",
                flex: 1,
              },
              {
                field: "user",
                headerName: "User",
                flex: 1,
                renderCell: ({ row }: { row: VendorDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.user?.fullName}
                  </Typography>
                ),
              },
              {
                field: "category",
                headerName: "Category",
                flex: 1,
                renderCell: ({ row }: { row: VendorDto }) => (
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