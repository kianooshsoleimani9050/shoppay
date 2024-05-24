import { useState } from 'react';
// @mui
import { Box, Card, Typography } from '@mui/material';
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { useGetSupplierVendors } from 'src/hooks/query/supplier/GetSupplierVendors';
import { VendorDto } from 'src/@types/models';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function SupplierVendors({ id }: Props) {
  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetSupplierVendors(
    id,
    {
      page: 1,
      take: 10,
    },
    !!tableState && !!id
  );

  const navigate = useNavigate()
  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.vendor.profile(`${rowId}`))
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Vendors
      </Typography>

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
            onRowClick={(row) => {
              handleRowClick(row.id)
            }}
          />
      </Card>
    </Box>
  );
}
