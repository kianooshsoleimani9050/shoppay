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
import { useGetSettingList } from 'src/hooks/query/setting/useGetSettingList';

export default function SettingList() {
  const { themeStretch } = useSettings();

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetSettingList(
    {
      page: tableState?.page || 1,
      take: tableState?.pageSize || 10,
    },
    !!tableState,
  );

  return (
    <Page title="Setting: List" sx={{ height: "100%" }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <HeaderBreadcrumbs
          heading="Setting List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Setting', href: PATH_DASHBOARD.setting.root },
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
                field: "key",
                headerName: "Key",
                flex: 1,
              },
              {
                field: "value",
                headerName: "Value",
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