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
import useProject from 'src/hooks/useProject';
import useWorkspace from 'src/hooks/useWorkspace';
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
import { getWorkspace } from 'src/redux/slices/workspaceSlice';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import WorkspaceCover from 'src/sections/@dashboard/workspace/WorkspaceCover';
import MembersWorkspace from 'src/sections/@dashboard/workspace/MembersWorkspace';
import ProjectCard from 'src/sections/@dashboard/workspace/ProjectCard';

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
  const { isHr, isProjectManager, user } = useAuth();
  const {
    projects,
    archivedProjects,
    unarchivedProjects,
    projectError,
    projectSuccess,
    isLoading,
    isSuccess,
    resetErrorMessageHook,
    resetSuccessMessageHook,
    getWorkspaceProjectsHook,
  } = useProject();
  const { workspace, usersInWorkspace } = useWorkspace();

  const [idWorkspace, setIdWorkspace] = useState(id);
  const [searchValue, setSearchValue] = useState('');

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
    getWorkspaceProjectsHook(idWorkspace, user._id, isHr || isProjectManager);
  }, []);

  const [currentTab, setCurrentTab] = useState('Projects');
  const [findMembers, setfindMembers] = useState('');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const handleFindMembers = (value) => {
    setfindMembers(value);
  };

  const PROFILE_TABS = [
    {
      value: 'Projects',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: (
        <ProjectCard
          loaded={!isLoading && isSuccess}
          projects={isHr || isProjectManager ? projects : unarchivedProjects}
          gallery={_userGallery}
        />
      ),
    },

    {
      value: 'About',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <General idWorkspace={id} myProfile={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'Members',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: (
        <MembersWorkspace members={usersInWorkspace} findMembers={findMembers} onFindMembers={handleFindMembers} />
      ),
    },
    {
      value: 'Leaderboard',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
  ];

  return (
    <Page title="Workspace: Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          key={workspace?.name}
          heading="Workspace"
          links={[
            { key: 0, name: 'Workspace', href: PATH_DASHBOARD.general.landing },
            { key: 1, name: workspace?.name, href: '' },
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
