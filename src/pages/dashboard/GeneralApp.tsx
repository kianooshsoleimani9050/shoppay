// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
// components
import Page from '../../components/Page';
// sections
import { AppNewInvoice, AppWidgetSummary } from '../../sections/@dashboard/general/app';
// assets
import { useEffect, useState } from 'react';
import AxiosApi from 'src/utils/axios';
import { OrderDto } from 'src/@types/models';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const [data, setData] = useState<any>({
    supplier: {
      count: 0,
      percentage: 0,
    },
    vendor: {
      count: 0,
      percentage: 0,
    },
    user: {
      count: 0,
      percentage: 0,
    },
  });

  const [orders, setOrders] = useState<OrderDto[]>([]);

  useEffect(() => {
    AxiosApi.stats().then((res) => setData(res));
    AxiosApi.lastestOrders().then((res) => setOrders(res));
  }, []);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="تعداد کاربران فعال"
              percent={data.user.percentage}
              total={data.user.count}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="تعداد فروشنده ها"
              percent={data.vendor.percentage}
              total={data.vendor.count}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="تعداد تامین کننده ها"
              percent={data.supplier.percentage}
              total={data.supplier.count}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <AppNewInvoice
              title="لیست سفارشات جدید"
              tableData={orders}
              tableLabels={[
                { id: 'id', label: 'شناسه سفارش' },
                { id: 'commission', label: 'کمیسیون' },
                { id: 'totalPrice', label: 'قیمت کل' },
                { id: 'user', label: 'نام کاربر' },
                { id: 'status', label: 'وضعیت' },
                { id: '' },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated title="Top Related Applications" list={_appRelated} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors title="Top Authors" list={_appAuthors} />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />
              <AppWidget
                title="Applications"
                total={55566}
                icon={'eva:email-fill'}
                color="warning"
                chartData={75}
              />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
