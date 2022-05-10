// @mui
import { Grid, Container, Typography, CircularProgress, Box } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
} from '../../sections/@dashboard/general/analytics';

// ----------------------------------------------------------------------
import { useDispatch } from '../../redux/store';
import { getScoreByWorkspace, getRankByWorkspace, getFinishedProjectsInTimePourcentage, getFinishedProjectsLatePourcentage } from '../../redux/slices/performanceSlice';
import useAuth from 'src/hooks/useAuth';
import useWorkspace from 'src/hooks/useWorkspace';
import usePerformance from 'src/hooks/usePerformance';
import { useEffect } from 'react';
import { useParams } from 'react-router';

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { user, isHr } = useAuth();
  const { workspace } = useWorkspace();
  const { scoreInWorkspace, rankInWorkspace, finishedProjectsInTimePourcentage, finishedProjectsLatePourcentage, isLoading } = usePerformance();

  const { id } = useParams(); // this is the workspace id 
  const memberId = user._id;
  const workspaceId = id;

  const getScoreInWorkspace = () => {
    try {
        dispatch(getFinishedProjectsInTimePourcentage(workspaceId));
        dispatch(getFinishedProjectsLatePourcentage(workspaceId));
        dispatch(getScoreByWorkspace({memberId, workspaceId}));
        dispatch(getRankByWorkspace({workspaceId, memberId}));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getScoreInWorkspace();
  }, []);

  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
            check your work quality
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AnalyticsWidgetSummary title="Score" total={scoreInWorkspace} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AnalyticsWidgetSummary title="Rank in leaderboard" total={rankInWorkspace} color="info" icon={'ant-design:apple-filled'} />
          </Grid>


          {isHr&&<Grid item xs={12} md={6} lg={6} sx={{
            mx: 'auto'
          }}
          >


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
                  ) :
                  (<AnalyticsCurrentVisits intime={finishedProjectsInTimePourcentage} late={finishedProjectsLatePourcentage} />)
                  }
                  </Grid>
          }

          {/*
          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks />
          </Grid>
        */}
        </Grid>
      </Container>
    </Page>
  );
}
