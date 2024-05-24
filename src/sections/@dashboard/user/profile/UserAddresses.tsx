import { useState } from 'react';
// @mui
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material'; // @types
// @types
import { Follower } from '../../../../@types/user';
// components
import Iconify from '../../../../components/Iconify';
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { useGetUserOrders } from 'src/hooks/query/user/UserGetUserOrders';
import { AddressDto, OrderDto } from 'src/@types/models';
import { useGetUserAddresses } from 'src/hooks/query/user/UserGetUserAddresses';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function UserAddresses({ id }: Props) {
  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetUserAddresses(
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
                  {row?.city?.title|| ''}
                </Typography>
              ),
            },
            {
              field: 'province',
              headerName: 'Province',
              flex: 1,
              renderCell: ({ row }: { row: AddressDto }) => (
                <Typography variant="body2" noWrap>
                  {row?.city?.province?.title|| ''}
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
