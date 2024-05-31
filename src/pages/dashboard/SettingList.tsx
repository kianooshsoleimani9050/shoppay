import { useState } from 'react';
// @mui
import {
  Button,
  Card,
  Container,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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
import Iconify from 'src/components/Iconify';

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

  const navigate = useNavigate()

  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.setting.edit(`${rowId}`))
  }

  return (
    <Page title="تنظیمات: لیست" sx={{ height: "100%" }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <HeaderBreadcrumbs
          heading="تنظیمات لیست"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'تنظیمات', href: PATH_DASHBOARD.setting.root },
            { name: 'لیست' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.setting.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              ساخت تنظیمات
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
            onRowClick={(row) => {
              handleRowClick(row.id)
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}
