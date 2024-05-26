import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import { Card, Container, Button, Box } from '@mui/material';
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
// ----------------------------------------------------------------------

type CategoryIconPropsType = {
  iconId: string;
  iconName: string
}
const CategoryIcon = ({ iconId, iconName }: CategoryIconPropsType) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    if (!!iconId) {
      AxiosApi.getFileLocalPath(`media/${iconId}`, iconName).then((res) => {
        if (typeof res === "string") {
          setImage(res)
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card sx={{ width: 60 }}>
      <Image
        src={image}
        alt={image}
        ratio="1/1"
        width="100%"
        height="100%"
      />
    </Card>
  )
}

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

  return (
    <Page title="Category: List" sx={{ height: '100%' }}>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBreadcrumbs
          heading="Category List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Category', href: PATH_DASHBOARD.category.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.category.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Category
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
                headerName: 'icon',
                renderCell: ({ row }: { row: CategoryDto }) => (
                  <Box display="flex" alignItems="center">
                    <CategoryIcon iconId={row.icon} iconName={row.icon} />
                  </Box>
                ),
              },
              {
                field: 'title',
                headerName: 'Title',
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
        </Card>
      </Container>
    </Page>
  );
}
