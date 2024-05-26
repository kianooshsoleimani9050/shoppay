import { useState } from 'react';
// @mui
import { Box, Card, Typography } from '@mui/material';
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { OrderDto, VendorDto } from 'src/@types/models';
import { useGetVendorOrders } from 'src/hooks/query/vendor/GetVendorOrders';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  vendor: VendorDto | undefined;
  id: string;
};

export default function VendorOrders({ vendor, id }: Props) {
  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetVendorOrders(
    id,
    {
      page: 1,
      take: 10,
    },
    !!tableState && !!id
  );

  const handleDeleteRow = (rowId: string) =>{
    console.info(rowId)
  }

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
            {
              field: 'actions',
              headerName: 'Actions',
              type: 'actions',
              getActions: ({ row }: { row: OrderDto }) => [
                <GridActionsCellItem
                  icon={<Iconify icon={'eva:trash-2-outline'} width={24} height={24} />}
                  onClick={() => {
                    handleDeleteRow(row.id);
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
    </Box>
  );
}
