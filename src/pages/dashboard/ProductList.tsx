import { useState } from 'react';
// @mui
import {
  Card,
  Container,
  Typography,
} from '@mui/material';
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
import { useGetProductList } from 'src/hooks/query/product/useGetProductList';
import { useNavigate } from 'react-router';

export default function ProductList() {
  const { themeStretch } = useSettings();

  const navigate = useNavigate()

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetProductList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState,
  );

  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.product.single(`${rowId}`))
  }

  return (
    <Page title="Product: List" sx={{ height: "100%" }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Product', href: PATH_DASHBOARD.product.root },
            { name: 'List' },
          ]}
        />
        <Card sx={{ flexGrow: 1 }}>
          <CustomDataGrid
            loading={isLoading}
            rows={data?.data || []}
            rowCount={data?.meta?.itemCount || 0}
            columns={[
              {
                field: "title",
                headerName: "Title",
                flex: 1,
              },
              {
                field: "brand",
                headerName: "Brand",
                flex: 1,
                renderCell: ({ row }: { row: ProductDto }) => (
                  <Typography variant="body2" noWrap>
                    {row?.brand?.title}
                  </Typography>
                ),
              },
              {
                field: "sale",
                headerName: "Sale",
                flex: 1,
              },
              {
                field: "view",
                headerName: "View",
                flex: 1,
              },
              {
                field: "status",
                headerName: "Status",
                flex: 1,
              },
              {
                field: "createdAt",
                headerName: "CreatedAt",
                flex: 1,
              },
            ]}
            onQueryChange={(tableState) => {
              setTableState(tableState);
            }}
            onRowClick={(row) => {
              handleRowClick(row.id)
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}
