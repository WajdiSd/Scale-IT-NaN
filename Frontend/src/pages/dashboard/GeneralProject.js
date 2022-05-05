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
import ProjectStatus from 'src/sections/@dashboard/project/ProjectStatus';
import { getFullMemberByProject, getProject, getProjectleaderboard } from 'src/redux/slices/projectSlice';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useProject from 'src/hooks/useProject';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useWorkspace from 'src/hooks/useWorkspace';
import { PATH_DASHBOARD } from 'src/routes/paths';
import UserList from 'src/sections/@dashboard/project/UserList';
import useAuth from 'src/hooks/useAuth';
import TopMembersProject from 'src/sections/@dashboard/project/TopMembersProject';
import FinishedTasksStats from 'src/sections/@dashboard/project/FinishedTasksStats';
import ProjectFinishedTasksStats from 'src/sections/@dashboard/project/ProjectFinishedTasksStats';
import { askBot } from 'src/redux/slices/chatbotSlice';
import { getMemberContribution, getnbrTasksLeft, getProjectProgress } from 'src/redux/slices/performanceSlice';

//pdf related
import jsPDF from 'jspdf';
import { pdfGenerator } from 'src/components/pdf/pdfGenerator';
import logo from 'src/logo.png';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { BookingWidgetSummary } from 'src/sections/@dashboard/general/booking';
import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from 'src/assets';
import { useSelector } from 'src/redux/store';
import usePerformance from 'src/hooks/usePerformance';
import ProjectProgressIllustration from 'src/assets/illustration_projectprogress';
import TasksLeftWidget from 'src/sections/@dashboard/general/booking/TasksLeftWidget';
import MemberContributionIllustration from 'src/assets/illustration_membercontribution';
import MemberToDoIllustration from 'src/assets/illustration_memberstodo';
//END pdf related

// ----------------------------------------------------------------------

export default function GeneralProject() {
  const { themeStretch } = useSettings();
  const { user, isHr } = useAuth();
  const { projectprogress, membercontribution, numbertasksleft } = usePerformance();
  const { project, usersInProject, isTL, isPM, isLoading } = useProject();
  const { workspace } = useWorkspace();
  const { id, projectid } = useParams();

  const dispatch = useDispatch();

  const sendProjectInfo = () => {
    console.log('sendProjectInfo');
    try {
      dispatch(askBot({ message: `getting projectid ${projectid}`, senderId: user._id }));
    } catch (error) {
      console.error(error);
    }
  };

  const projectprog = () => {
    console.log('progress');
    try {
      dispatch(getProjectProgress(projectid));
    } catch (error) {
      console.error(error);
    }
  };

  const membercontrib = () => {
    console.log('contrib');
    try {
      const data = {
        idprojet: projectid,
        idmember: user._id,
      };
      dispatch(getMemberContribution(data));
    } catch (error) {
      console.error(error);
    }
  };

  const nbrtsksleft = () => {
    console.log('tasks left');
    try {
      const data = {
        idprojet: projectid,
        idmember: user._id,
      };
      dispatch(getnbrTasksLeft(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    nbrtsksleft();
    projectprog();
    console.log(projectprogress);
    membercontrib();
    sendProjectInfo();
    console.log('useEffect');
    const obj = {
      idProject: projectid,
      idUser: user._id,
    };
    dispatch(getProject(obj));
    dispatch(getProjectleaderboard(projectid));
  }, []);

  //Get pdf funtion
  const jsPdfGenerator = () => {
    //new doc
    var y = 180;
    var x = 80;
    var i = 0;
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');
    //personalize the PDF:
    doc.addImage(logo, 'png', 65, 20, 500, 400);
    doc.addPage();
    //Labels
    doc.setFont('Helvertica', 'bold');
    doc.text(10, 20, 'Project report');
    doc.text(440, 20, 'Status :');
    doc.text(60, 60, 'Project NAME :');
    doc.text(60, 80, 'Project DESCRIPTION :');
    doc.text(60, 100, 'Created AT :');
    doc.text(60, 120, 'Start Date :');
    doc.text(60, 140, 'Expected End Date :');
    doc.text(60, 160, 'Project MEMBERS :');
    //Dynamic Data
    doc.setFont('Helvertica', 'Normal');
    doc.text(500, 20, project?.status);
    doc.text(200, 60, project?.name);
    doc.text(200, 80, project?.description);
    doc.text(200, 100, project?.createdAt);
    doc.text(200, 120, project?.startDate);
    doc.text(200, 140, project?.expectedEndDate);
    //Add project's members in report
    usersInProject.forEach((element) => {
      if (element.isValidated && !element.isDeleted) {
        i = i + 1;
        doc.text(80, y, '');
        doc.setFont('Helvertica', 'bold');
        doc.text(80, y, 'MEMBER' + i + ' :');
        doc.setFont('Helvertica', 'Normal');
        doc.text(100, y + 20, 'First & Last name : ' + element.firstName + element.lastName);
        doc.text(100, y + 40, 'Phone : ' + element.phone);
        if (element.isProjectManager) {
          doc.text(100, y + 60, 'Role : Project Manager');
        } else if (element.isTeamLeader) {
          doc.text(100, y + 60, 'Role : Team Leader');
        } else {
          doc.text(100, y + 60, 'Role :Member');
        }
      }
      y = y + 80;
    });
    //adding components
    /*
          const data = document.querySelector("#finished");
          doc.html(data).then(() => {
            doc.save(project?.name+"Report.pdf")*
          })*/

    //Download PDF
    doc.save(project?.name + ' Report.pdf');
  };

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
          action={
            isTL ? (
              <Button variant="contained" onClick={jsPdfGenerator} startIcon={<Iconify icon={'eva:plus-fill'} />}>
                Get Report
              </Button>
            ) : (
              <></>
            )
          }
        />

        {isLoading && usersInProject?.length == 0 ? (
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
          <Grid container spacing={3}>
            <jsPdfGenerator />
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <BookingWidgetSummary
                  title="Project Progress"
                  total={projectprogress}
                  icon={<ProjectProgressIllustration />}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <BookingWidgetSummary
                  title="Member Contribution"
                  total={membercontribution}
                  icon={<MemberContributionIllustration />}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TasksLeftWidget
                  title="Number of tasks left"
                  total={numbertasksleft}
                  icon={<MemberToDoIllustration />}
                />
              </Grid>
            </Grid>

            {!isHr && !isTL && !isPM && (
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <FinishedTasksStats />
                </Stack>
              </Grid>
            )}

            {(isHr || isTL || isPM) && (
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <div id="finish">
                    <ProjectFinishedTasksStats />
                  </div>
                </Stack>
              </Grid>
            )}

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <ProjectStatus />
                <ProjectMembersList />
                <TopMembersProject />
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <UserList />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
