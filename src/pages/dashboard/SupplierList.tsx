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
// sections
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { useGetSupplierList } from 'src/hooks/query/supplier/useGetSupplierList';
import { SupplierDto } from 'src/@types/models';
import { useNavigate } from 'react-router';

export default function SupplierList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetSupplierList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState,
  );

  const navigate = useNavigate()
  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.supplier.profile(`${rowId}`))
  }

  return (
    <Page title="Supplier: List" sx={{ height: "100%" }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <HeaderBreadcrumbs
          heading="Supplier List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Supplier', href: PATH_DASHBOARD.supplier.root },
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
                field: "title",
                headerName: "Title",
                flex: 1,
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
                field: "user",
                headerName: "User Full Name",
                flex: 1,
                renderCell: ({ row }: { row: SupplierDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.user?.fullName}
                  </Typography>
                ),
              },
              {
                field: "natinoalCode",
                headerName: "Natinoal Code",
                flex: 1,
              },
              {
                field: "telephone",
                headerName: "Telephone",
                flex: 1,
              },
              {
                field: "mobile",
                headerName: "Mobile",
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
            onRowClick={(row) => {
              handleRowClick(row.id)
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}
