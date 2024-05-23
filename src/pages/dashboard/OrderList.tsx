import { useState } from 'react';
// @mui
import {
  Card,
  Container,
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
import { useGetOrderList } from 'src/hooks/query/order/useGetOrderList';

export default function OrderList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetOrderList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState,
  );

  return (
    <Page title="Orders: List" sx={{ height: "100%" }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <HeaderBreadcrumbs
          heading="Orders List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Order', href: PATH_DASHBOARD.order.root },
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
                field: "code",
                headerName: "Code",
                flex: 1,
              },
              {
                field: "totalPrice",
                headerName: "Total price",
                flex: 1,
              },
              {
                field: "status",
                headerName: "Status",
                flex: 1,
              },
              {
                field: "address",
                headerName: "Address",
                flex: 1,
              },
              {
                field: "userName",
                headerName: "User Full Name",
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
          />
        </Card>
      </Container>
    </Page>
  );
}
