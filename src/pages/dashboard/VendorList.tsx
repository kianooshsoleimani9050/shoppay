import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Card, Button, Container, Typography } from '@mui/material';
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
import { VendorDto, VendorDtoStatusEnum } from 'src/@types/models';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AxiosApi from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function VendorList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetVendorList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  const navigate = useNavigate();
  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.vendor.profile(`${rowId}`));
  };

  const featured = (rowId: string) => {
    AxiosApi.vendorFeatured(rowId).then(() => {
      navigate(PATH_DASHBOARD.vendor.list);
    });
  };
  const unFeatured = (rowId: string) => {
    AxiosApi.vendorUnFeatured(rowId).then(() => {
      navigate(PATH_DASHBOARD.vendor.list);
    });
  };
  const deActivate = (rowId: string) => {};
  const accept = (rowId: string) => {};

  return (
    <Page title="Vendor: List" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
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
                field: 'title',
                headerName: 'Name',
                flex: 1,
              },
              {
                field: 'user',
                headerName: 'User',
                flex: 1,
                renderCell: ({ row }: { row: VendorDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.user?.fullName}
                  </Typography>
                ),
              },
              {
                field: 'category',
                headerName: 'Category',
                flex: 1,
                renderCell: ({ row }: { row: VendorDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.category?.title}
                  </Typography>
                ),
              },
              {
                field: 'balance',
                headerName: 'Balance',
                flex: 1,
              },
              {
                field: 'mobile',
                headerName: 'Mobile',
                flex: 1,
              },
              {
                field: 'telephone',
                headerName: 'Telephone',
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
              {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                getActions: ({ row }: { row: VendorDto }) => [
                  <>
                    {row.featured ? (
                      <GridActionsCellItem
                        icon={<Iconify icon={'eva:trash-2-outline'} width={24} height={24} />}
                        onClick={() => {
                          featured(row.id);
                        }}
                        color="success"
                        key="Delete"
                        label="Featured"
                      />
                    ) : !row.featured ? (
                      <GridActionsCellItem
                        icon={<Iconify icon={'eva:trash-2-outline'} width={24} height={24} />}
                        onClick={() => {
                          unFeatured(row.id);
                        }}
                        color="error"
                        key="deActive"
                        label="un-Featured"
                      />
                    ) : (
                      row.status === VendorDtoStatusEnum.Pending && (
                        <GridActionsCellItem
                          icon={<Iconify icon={'eva:trash-2-outline'} width={24} height={24} />}
                          onClick={() => {
                            accept(row.id);
                          }}
                          color="success"
                          key="accept"
                          label="Accept"
                        />
                      )
                    )}
                  </>,
                ],
              },
            ]}
            onQueryChange={(tableState) => {
              setTableState(tableState);
            }}
            onRowClick={(row) => {
              handleRowClick(row.id);
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}
