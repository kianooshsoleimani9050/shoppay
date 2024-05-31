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
import { useGetCategoryList } from 'src/hooks/query/category/useGetCategoryList';
import Iconify from 'src/components/Iconify';
import { CategoryDto } from 'src/@types/models';
import AxiosApi from 'src/utils/axios';
import Image from 'src/components/Image';
import { GridActionsCellItem } from '@mui/x-data-grid';
import moment from 'jalali-moment';
// ----------------------------------------------------------------------

type CategoryIconPropsType = {
  iconId: string;
  iconName: string;
};
const CategoryIcon = ({ iconId, iconName }: CategoryIconPropsType) => {
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

// const flattenCategories = (categories: CategoryDto[]) => {
//   const flatList: CategoryDto[] = [];

//   for (const item of categories) {
//     if(item.children?.length !== 0){
//       flatList.push(...item.children)
//     } else {
//       flatList.push(item);
//     }
//   }

//   return flatList
// };

export default function CategoryList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();

  const { data, isLoading } = useGetCategoryList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState
  );

  const navigate = useNavigate();

  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.category.edit(`${rowId}`));
  };

  const handleDeleteRow = (rowId: string) => {
    AxiosApi.deleteCategory(rowId).then(() => {
      navigate(PATH_DASHBOARD.category.list);
    });
  };

  return (
    <Page title="دسته بندی: لیست" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="دسته بندی لیست"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'دسته بندی', href: PATH_DASHBOARD.category.root },
            { name: 'لیست' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.category.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              ساخت دسته بندی
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
                field: 'title',
                headerName: 'عنوان',
                flex: 1,
              },
              {
                field: 'icon',
                headerName: 'آیکون',
                renderCell: ({ row }: { row: CategoryDto }) => (
                  <Box display="flex" alignItems="center">
                    <CategoryIcon iconId={row.icon} iconName={row.icon} />
                  </Box>
                ),
              },
              {
                field: 'childrenCount',
                headerName: 'تعداد زیر دسته',
                flex: 1,
              },
              {
                field: 'updatedAt',
                headerName: 'تاریخ ویرایش',
                flex: 1,
                renderCell: ({ row }: { row: CategoryDto }) => (
                  <Typography variant="body2" noWrap>
                    {moment(row?.updatedAt || row?.createdAt, 'YYYY/MM/DD')
                      .locale('fa')
                      .format('YYYY/MM/DD')}
                  </Typography>
                ),
              },
              {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                getActions: ({ row }: { row: CategoryDto }) => [
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
            onRowClick={(row) => {
              handleRowClick(row.id);
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}
