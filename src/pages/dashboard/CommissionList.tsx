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
import Iconify from 'src/components/Iconify';
import { useGetCommissionList } from 'src/hooks/query/setting/useGetCommissionList';

export default function CommissionList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate()

  const [tableState, setTableState] = useState<QueryType>();
  const { data, isLoading } = useGetCommissionList(
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
    <Page title="Commission: List" sx={{ height: "100%" }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <HeaderBreadcrumbs
          heading="Commission List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Commission', href: PATH_DASHBOARD.commission.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.commission.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Setting
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
                field: "percentage",
                headerName: "Percentage",
                flex: 1,
              },
              {
                field: "lessThan",
                headerName: "Less than",
                flex: 1,
              },
              {
                field: "moreThan",
                headerName: "More than",
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
