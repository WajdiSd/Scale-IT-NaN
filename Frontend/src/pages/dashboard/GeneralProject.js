// @mui
import { Grid, Container, Stack } from '@mui/material';
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

// ----------------------------------------------------------------------

export default function GeneralProject() {
  
  const { themeStretch } = useSettings();

  const { projectid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject(projectid));
  }, [projectid]);

  const { project, usersInProject } = useProject();

  console.log("-----------------project-----------");
  console.log(project);
  console.log(project.assigned_members);


  console.log("-----------------usersInProject-----------");
  console.log(usersInProject);

  return (
    <Page title="General: Projects">
      <Container maxWidth={themeStretch ? false : 'xl'}>
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
              <BankingRecentTransitions />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <ProjectMembersList/>
                <BankingContacts />
              <ProjectMembersList />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
