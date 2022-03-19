// @mui
import { useTheme } from '@mui/material/styles';
import { CardHeader, Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import { BlogPostCard } from 'src/sections/@dashboard/blog';
import { SkeletonPostItem } from 'src/components/skeleton';
import WorkspaceCard from 'src/sections/@dashboard/workspace/WorkspaceCard';
import { useDispatch } from 'react-redux';
import { getWorkspaces } from 'src/redux/slices/workspaceSlice';
import useWorkspace from 'src/hooks/useWorkspace';
import { MotionInView, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function GeneralWorkspace() {
  const { user  } = useAuth();
  const { workspaces  } = useWorkspace();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [userJoinedspaces, setUserJoinedspaces] = useState([]);

  const dispatch = useDispatch();

  const getUserWorkspaces = () => {
    try {
      dispatch(getWorkspaces(user._id))

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserWorkspaces();

    workspaces.map(workspace=>{
      let validated = false;

      workspace.assigned_members.forEach(member => {
        if(member.member == user._id){
          if(member.isHR){
            setUserWorkspaces(oldArray => [...oldArray,workspace] );
          }
          else{
            setUserJoinedspaces(oldArray => [...oldArray,workspace] );
          }
        }
      });
     
    })
    
  }, []);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user?.firstName} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>
        
        </Grid>
        <CardHeader title="Workspaces that you manage" subheader="" />
          <Grid container spacing={3} mt={3}>
          {userWorkspaces ? userWorkspaces.map((workspace, index) =>
            workspace ? (
              <Grid key={workspace._id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <MotionInView key={workspace._id} variants={varFade().inDown}>
                  <WorkspaceCard workspace={workspace} index={index} />
                </MotionInView>
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          ): null}
        </Grid>

        <CardHeader title="Workspaces that you joined" subheader="" />
          <Grid container spacing={3} >
          {userJoinedspaces ? userJoinedspaces.map((workspace, index) =>
            workspace ? (
              <Grid key={workspace._id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <WorkspaceCard workspace={workspace} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          ): null}
        </Grid>
      </Container>
    </Page>
  );
}
