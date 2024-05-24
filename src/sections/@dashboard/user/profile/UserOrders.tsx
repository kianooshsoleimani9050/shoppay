import { useState } from 'react';
// @mui
import { Box, Card, Button, Avatar, Typography } from '@mui/material'; // @types
// @types
import { Follower } from '../../../../@types/user';
// components
import Iconify from '../../../../components/Iconify';
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { useGetUserOrders } from 'src/hooks/query/user/UserGetUserOrders';
import { OrderDto } from 'src/@types/models';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function UserOrders({ id }: Props) {
  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetUserOrders(
    id,
    {
      page: 1,
      take: 10,
    },
    !!tableState
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

// ----------------------------------------------------------------------

type FollowerCardProps = {
  follower: Follower;
};

function FollowerCard({ follower }: FollowerCardProps) {
  const { name, country, avatarUrl, isFollowed } = follower;

  const [toggle, setToogle] = useState(isFollowed);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />

      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {country}
          </Typography>
        </Box>
      </Box>

      <Button
        size="small"
        onClick={() => setToogle(!toggle)}
        variant={toggle ? 'text' : 'outlined'}
        color={toggle ? 'primary' : 'inherit'}
        startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
        sx={{ flexShrink: 0 }}
      >
        {toggle ? 'Followed' : 'Follow'}
      </Button>
    </Card>
  );
}
