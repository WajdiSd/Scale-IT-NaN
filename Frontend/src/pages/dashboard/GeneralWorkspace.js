// @mui
import { useTheme } from '@mui/material/styles';
import { Box, CardHeader, CircularProgress, Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AppFeatured } from '../../sections/@dashboard/general/app';
// import { WorkspaceLandingAdd } from '../../sections/@dashboard/workspace';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import { SkeletonPostItem } from 'src/components/skeleton';
import WorkspaceCard from 'src/sections/@dashboard/workspace/WorkspaceCard';
import { useDispatch } from 'react-redux';
import { getWorkspaces } from 'src/redux/slices/workspaceSlice';
import useWorkspace from 'src/hooks/useWorkspace';
import { MotionInView, varFade } from 'src/components/animate';
import WorkspaceLandingAdd from 'src/sections/@dashboard/workspace/WorkspaceLandingAdd';
import EmptyComponent from '../../components/EmptyComponent';
import { askBot, senduserId, setParticiants } from 'src/redux/slices/chatbotSlice';
import { uuid } from 'uuidv4';
import useChat from 'src/hooks/useChat';

// ----------------------------------------------------------------------

export default function GeneralWorkspace() {
  const { user } = useAuth();
  const { conversation, participants } = useChat();
  const { workspaces, isLoading } = useWorkspace();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [userJoinedspaces, setUserJoinedspaces] = useState([]);

  const dispatch = useDispatch();

  const getUserWorkspaces = () => {
    try {
      workspaces?.map((workspace) => {
        workspace?.assigned_members?.forEach((member) => {
          if (member.member == user._id) {
            if (member.isHR) {
              setUserWorkspaces((oldArray) => [...oldArray, workspace]);
            } else {
              setUserJoinedspaces((oldArray) => [...oldArray, workspace]);
            }
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const senduserInfo = () => {
    console.log('senduserInfo');
    try {
      dispatch(askBot({ message: 'userid', senderId: user._id }));
      dispatch(askBot({ message: 'username', senderId: user._id }));
      // dispatch(askBot({ message: 'none workspaceid None', senderId: user._id }));
    } catch (error) {
      console.error(error);
    }
  };

  const setParticipants = () => {
    try {
      const data = [
        {
          id: user._id,
          name: user.firstName,
          type: 'me',
          avatar: '',
        },
        {
          id: uuid(),
          name: 'Mrs. Brain',
          type: 'chatbot',
          avatar: '',
        },
      ];
      dispatch(setParticiants(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (participants.length == 0) setParticipants();
    getUserWorkspaces();
    senduserInfo();
  }, []);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <WorkspaceLandingAdd displayName={user?.firstName} />
          </Grid>
          {/*
            <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>
          */}
        </Grid>
        {isLoading ? (
          <Box
            sx={{
              mt: 10,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={150} color="success" />
          </Box>
        ) : (
          <>
            {workspaces ? (
              <>
                <CardHeader title="Workspaces that you manage" subheader="" />
                <Grid container spacing={3} mt={3}>
                  {userWorkspaces?.length > 0 ? (
                    userWorkspaces.map((workspace, index) =>
                      workspace ? (
                        <Grid key={workspace._id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                          <MotionInView key={workspace._id} variants={varFade().inDown}>
                            <WorkspaceCard workspace={workspace} index={index} />
                          </MotionInView>
                        </Grid>
                      ) : (
                        <SkeletonPostItem key={index} />
                      )
                    )
                  ) : (
                    <Grid item xs={12} sm={12} md={12}>
                      <EmptyComponent />
                    </Grid>
                  )}
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={12} md={12}>
                <EmptyComponent />
              </Grid>
            )}
            {workspaces ? (
              <>
                <CardHeader title="Workspaces that you joined" subheader="" />
                <Grid container spacing={3} mt={3}>
                  {userJoinedspaces?.length > 0 ? (
                    userJoinedspaces.map((workspace, index) =>
                      workspace ? (
                        <Grid key={index} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                          <WorkspaceCard workspace={workspace} index={index} />
                        </Grid>
                      ) : (
                        <SkeletonPostItem key={index} />
                      )
                    )
                  ) : (
                    <Grid item xs={12} sm={12} md={12}>
                      <EmptyComponent />
                    </Grid>
                  )}
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={12} md={12}>
                <EmptyComponent />
              </Grid>
            )}
          </>
        )}
      </Container>
    </Page>
  );
}
