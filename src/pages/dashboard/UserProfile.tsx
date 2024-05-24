import { capitalCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ProfileCover,
} from '../../sections/@dashboard/user/profile';
import { useGetUserSingle } from 'src/hooks/query/user/UserGetSingle';
import { useParams } from 'react-router';
import UserOrders from 'src/sections/@dashboard/user/profile/UserOrders';
import UserAddresses from 'src/sections/@dashboard/user/profile/UserAddresses';
import Logins from 'src/sections/@dashboard/user/profile/Logins';
import UserLogins from 'src/sections/@dashboard/user/profile/UserLogins';

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

export default function UserProfile() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('profile');

  const { id = '' } = useParams();
  const { data: user } = useGetUserSingle(id);

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Logins myProfile={_userAbout} posts={_userFeeds} id={id} />,
    },
    {
      value: 'orders',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <UserOrders id={id} />,
    },
    {
      value: 'addresses',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <UserAddresses id={id} />,
    },
    {
      value: 'logins',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <UserLogins id={id} />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.fullName || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={_userAbout} id={id} />

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
