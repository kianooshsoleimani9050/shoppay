import { useState } from 'react';
// @mui
import { Box, Card, Typography } from '@mui/material';
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { OrderDto } from 'src/@types/models';
import { useGetSupplierOrders } from 'src/hooks/query/supplier/GetSupplierOrders';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function SupplierOrders({ id }: Props) {
  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetSupplierOrders(
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
        Orders
      </Typography>

      <Card sx={{ flexGrow: 1 }}>
        <CustomDataGrid
          loading={isLoading}
          rows={data?.data || []}
          rowCount={data?.meta?.itemCount || 0}
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
    </Box>
  );
}
