import { useState } from 'react';
// @mui
import { Button, Card, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import { ProductDto } from 'src/@types/models';
import { useGetProductList } from 'src/hooks/query/product/useGetProductList';
import Iconify from 'src/components/Iconify';
import moment from 'jalali-moment';

export default function ProductList() {
  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetProductList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.product.single(`${rowId}`));
  };

  return (
    <Page title="محصول: لیست" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="محصول لیست"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'محصول', href: PATH_DASHBOARD.product.root },
            { name: 'لیست' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.product.create}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              ساخت محصول
            </Button>
          }
        />
        <Card sx={{ flexGrow: 1 }}>
          <CustomDataGrid
            loading={isLoading}
            rows={data?.data || []}
            rowCount={data?.meta?.itemCount || 0}
            columns={[
              {
                field: 'title',
                headerName: 'عنوان',
                flex: 1,
              },
              {
                field: 'brand',
                headerName: 'برند',
                flex: 1,
                renderCell: ({ row }: { row: ProductDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.brand?.title}
                  </Typography>
                ),
              },
              {
                field: 'sale',
                headerName: 'تعداد خرید',
                flex: 1,
              },
              {
                field: 'view',
                headerName: 'تعداد بازدید',
                flex: 1,
              },
              {
                field: 'status',
                headerName: 'وضعیت',
                flex: 1,
                renderCell: ({ row }: { row: ProductDto }) => (
                  <Typography variant="body2" noWrap>
                    {row.status === true ? 'فعال' : 'غیرفعال'}
                  </Typography>
                ),
              },
              {
                field: 'updatedAt',
                headerName: 'تاریخ ویرایش',
                flex: 1,
                renderCell: ({ row }: { row: ProductDto }) => (
                  <Typography variant="body2" noWrap>
                    {moment(row?.updatedAt || row?.createdAt, 'YYYY/MM/DD')
                      .locale('fa')
                      .format('YYYY/MM/DD')}
                  </Typography>
                ),
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
