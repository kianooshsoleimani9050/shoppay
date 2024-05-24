import { useState } from 'react';
// @mui
import { Box, Card, Typography } from '@mui/material';
// components
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { AddressDto } from 'src/@types/models';
import { useGetSupplierAddresses } from 'src/hooks/query/supplier/GetSupplierAddresses';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function SupplierAddresses({ id }: Props) {
  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetSupplierAddresses(
    id,
    {
      page: 1,
      take: 10,
    },
    !!tableState && !!id
  );

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Addresses
      </Typography>

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
              field: 'address',
              headerName: 'Address',
              flex: 1,
            },
            {
              field: 'floor',
              headerName: 'Floor',
              flex: 1,
            },
            {
              field: 'plaque',
              headerName: 'Plaque',
              flex: 1,
            },
            {
              field: 'postalCode',
              headerName: 'Postal code',
              flex: 1,
            },
            {
              field: 'city',
              headerName: 'City',
              flex: 1,
              renderCell: ({ row }: { row: AddressDto }) => (
                <Typography variant="body2" noWrap>
                  {row?.city?.title || ''}
                </Typography>
              ),
            },
            {
              field: 'province',
              headerName: 'Province',
              flex: 1,
              renderCell: ({ row }: { row: AddressDto }) => (
                <Typography variant="body2" noWrap>
                  {row?.city?.province?.title || ''}
                </Typography>
              ),
            },
          ]}
          onQueryChange={(tableState) => {
            setTableState(tableState);
          }}
        />
      </Card>
    </Box>
  );
}