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
import { useGetVendorSingle } from 'src/hooks/query/vendor/VendorGetSingle';
import VendorInformation from 'src/sections/@dashboard/vendor/profile/VendorInformation';
import VendorOrders from 'src/sections/@dashboard/vendor/profile/VendorOrders';
import VendorAddresses from 'src/sections/@dashboard/vendor/profile/VendorAddresses';
import VendorProfileCover from 'src/sections/@dashboard/vendor/profile/VendorProfileCover';

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

export default function VendorProfile() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('profile');

  const { id = '' } = useParams();

  const { data: vendor } = useGetVendorSingle(id);

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <VendorInformation vendor={vendor} />,
    },
    {
      value: 'orders',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <VendorOrders vendor={vendor} id={id} />,
    },
    {
      value: 'addresses',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <VendorAddresses profile={vendor} id={id} />,
    },
    // {
    //   value: 'logins',
    //   icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
    //   component: <UserLogins profile={user} id={id} />,
    // },
  ];

  return (
    <Page title="Vendor: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Vendor', href: PATH_DASHBOARD.vendor.root },
            { name: vendor?.title || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <VendorProfileCover profile={vendor} />


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
