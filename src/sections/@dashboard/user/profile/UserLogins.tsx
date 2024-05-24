import { useState } from 'react';
// @mui
import { Box, Card, Typography } from '@mui/material';
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { UserDto } from 'src/@types/models';
import { useGetUserLogins } from 'src/hooks/query/user/UserGetUserLogins';

// ----------------------------------------------------------------------

type Props = {
  profile: UserDto | undefined;
  id: string;
};

export default function UserLogins({ profile, id }: Props) {
  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetUserLogins(
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
        Logins
      </Typography>

      <Card sx={{ flexGrow: 1 }}>
        <CustomDataGrid
          loading={isLoading}
          rows={data?.data || []}
          rowCount={data?.meta?.itemCount || 0}
          columns={[
            {
              field: 'method',
              headerName: 'Method',
              flex: 1,
            },
            {
              field: 'path',
              headerName: 'Path',
              flex: 1,
            },
            {
              field: 'action',
              headerName: 'Action',
              flex: 1,
            },
            {
              field: 'userAgent',
              headerName: 'UserAgent',
              flex: 1,
            },
            {
              field: 'ip',
              headerName: 'Ip',
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
