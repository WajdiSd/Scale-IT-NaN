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
//pdf related
import jsPDF from 'jspdf';
import { pdfGenerator } from 'src/components/pdf/pdfGenerator';
import logo from 'src/logo.png'
import html2canvas from 'html2canvas';

//END pdf related 

// ----------------------------------------------------------------------

export default function GeneralProject() {
  const { themeStretch } = useSettings();

  const { user,isHr } = useAuth();
  const { project, usersInProject, isLoading } = useProject();
  const { workspace } = useWorkspace();
  const { id, projectid } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");
    const obj = {
      idProject: projectid,
      idUser: user._id,

    };
    dispatch(getProject(obj));
    dispatch(getProjectleaderboard(projectid))

  }, []);

  //Get pdf funtion
    const jsPdfGenerator = () =>{
          //new doc    
          console.log(project);
          var y = 180;
          var x = 80;  
          var i = 0;      
          var doc = new jsPDF('landscape','px','a4','false');
          //personalize the PDF:
          doc.addImage(logo,'png',65,20,500,400)
          doc.addPage()
          //Labels
          doc.setFont('Helvertica','bold')
          doc.text(10,20,'Project report')          
          doc.text(520,20,'Status :')
          doc.text(60,60,'Project NAME :')
          doc.text(60,80,'Project DESCRIPTION :')
          doc.text(60,100,'Created AT :')
          doc.text(60,120,'Start Date :')
          doc.text(60,140,'Expected End Date :')
          doc.text(60,160,'Project MEMBERS :')
         //Dynamic Data
          doc.setFont('Helvertica','Normal')
          doc.text(560,20,project?.status)
          doc.text(200,60,project?.name)
          doc.text(200,80,project?.description)
          doc.text(200,100,project?.createdAt)
          doc.text(200,120,project?.startDate)
          doc.text(200,140,project?.expectedEndDate)
          //Add project's members in report
          usersInProject.forEach(element => {
            if (element.isValidated && !element.isDeleted)
            {i=i+1
            doc.text(80,y,'')
            doc.setFont('Helvertica','bold')
            doc.text(80,y,'MEMBER'+i+' :')
            doc.setFont('Helvertica','Normal')
            doc.text(100,y+20,'First & Last name : '+ element.firstName+element.lastName)
            doc.text(100,y+40,'Phone : '+element.phone)
            if (element.isProjectManager)
              {doc.text(100,y+60,'Role : Project Manager')}
            else if (element.isTeamLeader)
              {doc.text(100,y+60,'Role : Team Leader')}
            else
              {doc.text(100,y+60,'Role :Member')}
            }
            y=y+80;
          }
            );
          //adding components
          //const data = document.querySelector("#list");
          /*doc.html(data).then(() => {
            doc.save(project?.name+"Report.pdf")
          });*/
          //Download PDF
          doc.save(project?.name+"Report.pdf")
    }
  
          return (
    <Page title="General: Projects">
      <Container maxWidth={themeStretch ? false : 'xl'}>
         <button onClick={jsPdfGenerator}>Report</button>
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
            <jsPdfGenerator/>    
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
                  chartData={[500, 136, 76, 108, 74, 54, 57, 84]}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <BankingCurrentBalance />
            </Grid>

            {!isHr&&<Grid item xs={12} md={8}>
              <Stack spacing={3}>
                {/* <AnalyticsFinishedTasks/> */}
                <FinishedTasksStats/>
              </Stack>
            </Grid>}
            
            {isHr&&<Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <ProjectFinishedTasksStats/>
              </Stack>
            </Grid>}

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <ProjectStatus />
                <ProjectMembersList />
                <TopMembersProject /> 
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
            <div id="list">
            <UserList />
            </div>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
