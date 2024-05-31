import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import { Card, Container, Button, Box, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CustomDataGrid, QueryType } from 'src/components/custom/CustomDataGrid';
import Iconify from 'src/components/Iconify';
import { BrandDto, CategoryDto } from 'src/@types/models';
import { useGetBrandList } from 'src/hooks/query/brand/useGetBrandList';
import AxiosApi from 'src/utils/axios';
import Image from 'src/components/Image';
import moment from 'jalali-moment';
// ----------------------------------------------------------------------

type BrandIconPropsType = {
  iconId: string;
  iconName: string;
};
const BrandIcon = ({ iconId, iconName }: BrandIconPropsType) => {
  const [image, setImage] = useState('');
  useEffect(() => {
    if (!!iconId) {
      AxiosApi.getFileLocalPath(`media/${iconId}`, iconName).then((res) => {
        if (typeof res === 'string') {
          setImage(res);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card sx={{ width: 60 }}>
      <Image src={image} alt={image} ratio="1/1" width="100%" height="100%" />
    </Card>
  );
};

export default function BrandList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetBrandList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  const navigate = useNavigate();

  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.brand.edit(`${rowId}`));
  };

  return (
    <Page title="برند: لیست" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="لیست برند"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'برند', href: PATH_DASHBOARD.brand.root },
            { name: 'لیست' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.brand.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              ساخت برند
            </Button>
          }
        />
        <Card sx={{ flexGrow: 1 }}>
          <CustomDataGrid
            loading={isLoading}
            rows={data?.data || []}
            rowCount={data?.meta?.itemCount || 0}
            rowHeight={80}
            columns={[
              {
                field: 'icon',
                headerName: 'آیکون',
                renderCell: ({ row }: { row: CategoryDto }) => (
                  <Box display="flex" alignItems="center">
                    <BrandIcon iconId={row.icon} iconName={row.icon} />
                  </Box>
                ),
              },
              {
                field: 'title',
                headerName: 'عنوان فارسی',
                flex: 1,
              },
              {
                field: 'enTitle',
                headerName: 'عنوان انگلیسی',
                flex: 1,
              },
              {
                field: 'order',
                headerName: 'اولویت',
                flex: 1,
              },
              {
                field: 'status',
                headerName: 'وضعیت',
                flex: 1,
                renderCell: ({ row }: { row: BrandDto }) => (
                  <Typography variant="body2" noWrap>
                    {row.status === true ? 'فعال' : 'غیرفعال'}
                  </Typography>
                ),
              },
              {
                field: 'updatedAt',
                headerName: 'تاریخ ویرایش',
                flex: 1,
                renderCell: ({ row }: { row: BrandDto }) => (
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
