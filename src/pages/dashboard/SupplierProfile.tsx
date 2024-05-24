import { capitalCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { useParams } from 'react-router';
import SupplierInformation from 'src/sections/@dashboard/supplier/profile/VendorInformation';
import { useGetSupplierSingle } from 'src/hooks/query/supplier/GetSupplierSingle';
import SupplierOrders from 'src/sections/@dashboard/supplier/profile/SupplierOrders';
import SupplierAddresses from 'src/sections/@dashboard/supplier/profile/SupplierAddresses';
import SupplierVendors from 'src/sections/@dashboard/supplier/profile/SupplierVendors';
import SupplierProfileCover from 'src/sections/@dashboard/supplier/profile/SupplierProfileCover';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function SupplierProfile() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('profile');

  const { id = '' } = useParams();

  const { data: supplier } = useGetSupplierSingle(id);

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <SupplierInformation supplier={supplier} />,
    },
    {
      value: 'orders',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <SupplierOrders id={id} />,
    },
    {
      value: 'addresses',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <SupplierAddresses id={id} />,
    },
    {
      value: 'vendors',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <SupplierVendors id={id} />,
    },
  ];

  return (
    <Page title="Vendor: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Vendor', href: PATH_DASHBOARD.vendor.root },
            { name: supplier?.title || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <SupplierProfileCover profile={supplier} />


          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
