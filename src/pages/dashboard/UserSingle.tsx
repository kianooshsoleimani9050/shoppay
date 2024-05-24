import { useState } from 'react';
// @mui
import { Box, Card, Container, Grid, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { ProductDto } from 'src/@types/models';
import { useParams } from 'react-router';
import { useGetUserSingle } from 'src/hooks/query/user/UserGetSingle';
import { RHFSwitch, RHFTextField } from 'src/components/hook-form';

export default function UserSingle() {
  const { themeStretch } = useSettings();

  const { id = '' } = useParams();

  const [tableState, setTableState] = useState<QueryType>();
  const { data: user, isLoading } = useGetUserSingle(id, !!tableState);

  return (
    <Page title="User: Single" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="User Single"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Sinlge' },
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {/* <Box sx={{ mb: 5 }}> */}
              {/* <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box> */}

              <RHFSwitch
                name="isVerified"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="fullName" label="Full Name" value={user?.fullName} />
                <RHFTextField name="email" label="Email Address" value={user?.email}/>
                <RHFTextField name="mobile" label="Phone Number" value={user?.mobile}/>
                <RHFTextField name="role" label="User Role" value={user?.role}/>
 
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* <Card sx={{ flexGrow: 1 }}>
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
                field: 'brand',
                headerName: 'Brand',
                flex: 1,
                renderCell: ({ row }: { row: ProductDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.brand?.title}
                  </Typography>
                ),
              },
              {
                field: 'sale',
                headerName: 'Sale',
                flex: 1,
              },
              {
                field: 'view',
                headerName: 'View',
                flex: 1,
              },
              {
                field: 'status',
                headerName: 'Status',
                flex: 1,
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
            onRowClick={(row) => {
              handleRowClick(row.id);
            }}
          />
        </Card> */}
      </Container>
    </Page>
  );
}
