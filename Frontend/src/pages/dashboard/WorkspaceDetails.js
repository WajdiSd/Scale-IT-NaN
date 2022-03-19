import React from 'react';
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../sections/@dashboard/user/profile';
import General from 'src/sections/@dashboard/workspace/General';
import useWorkspace from 'src/hooks/useWorkspace';
import { getWorkspace } from 'src/redux/slices/workspaceSlice';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import WorkspaceCover from 'src/sections/@dashboard/workspace/WorkspaceCover';

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

export default function WorkspaceDetails() {
  const { themeStretch } = useSettings();
  let { id } = useParams();
  const [idWorkspace, setIdWorkspace] = useState(id);
  const { workspace } = useWorkspace();
  const dispatch = useDispatch();

  const getUserWorkspace = () => {
    try {
      dispatch(getWorkspace(idWorkspace));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserWorkspace();
  }, [idWorkspace]);

  const [currentTab, setCurrentTab] = useState('Projects');
  const [findFriends, setFindFriends] = useState('');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'Projects',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },

    {
      value: 'About',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <General idWorkspace={id} myProfile={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'Members',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: <ProfileFriends friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends} />,
    },
    {
      value: 'Leaderboard',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileGallery gallery={_userGallery} />,
    },
  ];

  return (
    <Page title="Workspace: Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Workspace"
          links={[
            { name: 'Workspace', href: PATH_DASHBOARD.general.landing },
            { name: workspace?.name, href: '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <WorkspaceCover />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
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
