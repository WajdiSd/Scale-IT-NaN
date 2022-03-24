// @mui
import { Grid, Container, Stack, Box, CircularProgress } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  BankingContacts,
  BankingWidgetSummary,
  BankingCurrentBalance,
  BankingBalanceStatistics,
  BankingRecentTransitions,
  BankingExpensesCategories,
} from '../../sections/@dashboard/general/banking';
import ProjectMembersList from 'src/sections/@dashboard/project/ProjectMembersList';
import { getFullMemberByProject, getProject } from 'src/redux/slices/projectSlice';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useProject from 'src/hooks/useProject';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useWorkspace from 'src/hooks/useWorkspace';
import { PATH_DASHBOARD } from 'src/routes/paths';
import UserList from 'src/sections/@dashboard/project/UserList';
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

export default function GeneralProject() {
  const { themeStretch } = useSettings();

  const { user } = useAuth();
  const { project, usersInProject, isLoading } = useProject();
  const { workspace } = useWorkspace();
  const { id, projectid } = useParams();
  
  console.log(projectid);
  const dispatch = useDispatch();

  
  useEffect(() => {
    const obj = {
      idProject : projectid,
      idUser : user._id,
    }
    dispatch(getProject(obj));
  }, []);

return (
    <Page title="General: Projects">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <HeaderBreadcrumbs
          key={project?.name}
          heading="Project"
          links={[
            { key: 0, name: 'Workspace', href: PATH_DASHBOARD.general.landing },
            { key: 1, name: workspace?.name, href: `${PATH_DASHBOARD.workspaces.details}${id}` },
            { key: 2, name: 'project', href: '' },
            { key: 3, name: project?.name, href: `${PATH_DASHBOARD.workspaces.details}${id}/project/${projectid}` },


          ]}
        />
        {
          isLoading && usersInProject?.length==0?
          (<Box
            sx={{
              mt: 10,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={150} color="success" />
          </Box>)
          :
          (
            <Grid container spacing={3}>
        
          <Grid item xs={12} md={7}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <BankingWidgetSummary
                title="Income"
                icon={'eva:diagonal-arrow-left-down-fill'}
                percent={2.6}
                total={18765}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />
              <BankingWidgetSummary
                title="Expenses"
                color="warning"
                icon={'eva:diagonal-arrow-right-up-fill'}
                percent={-0.5}
                total={8938}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <BankingCurrentBalance />
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <BankingBalanceStatistics />
              <BankingExpensesCategories />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <ProjectMembersList />
              <BankingContacts />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
          <UserList />
          </Grid>

        </Grid>
          )
        }
        
      </Container>
    </Page>
  );
}
