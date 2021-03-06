import PropTypes from 'prop-types';

// hooks
import { useState } from 'react';
import useProjectFilter from 'src/hooks/useProjectFilter';
import useAuth from 'src/hooks/useAuth';
import useProject from 'src/hooks/useProject';
import { useParams } from 'react-router';

// @mui
import {
  Divider,
  Box,
  Card,
  Typography,
  CircularProgress,
  Button,
  InputAdornment,
  DialogTitle,
  Grid,
} from '@mui/material';

// components
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { DialogAnimate } from 'src/components/animate';
import AddProjectForm from './AddProjectForm';
import InputStyle from 'src/components/InputStyle';
import ProjectItem from './ProjectItem';
import { Stack } from '@mui/material';
import EmptyComponent from 'src/components/EmptyComponent';
import SearchNotFound from 'src/components/SearchNotFound';

ProjectCard.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default function ProjectCard({ loaded, projects }) {
  const { isProjectManager, user, isHr } = useAuth();
  const { deleteProjectHook, restoreProjectHook, updateProjectHook, unarchivedProjects } = useProject();
  const { query, projectsFilter, managedProjects, ledProjects, normalProjects, searchProjects } =
    useProjectFilter(projects);
  const { id } = useParams();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAddEvent = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return loaded ? (
    <Box sx={{ mt: 5 }}>
      <DialogAnimate sx={{ minWidth: '50%' }} open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>{'Add Project'}</DialogTitle>
        <AddProjectForm onCancel={handleCloseModal} />
      </DialogAnimate>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Projects
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 0.75 }}>
        <InputStyle
          stretchStart={240}
          value={query}
          onChange={(event) => searchProjects(event.target.value)}
          placeholder="Find projects..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 5 }}
        />
        {isProjectManager ? (
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
            onClick={handleAddEvent}
          >
            New Project
          </Button>
        ) : null}
      </Stack>

      <Card sx={{ p: 3 }}>
        {!projects || projects.length === 0 ? (
          <Grid item xs={12} sm={12} md={12}>
            <EmptyComponent />
          </Grid>
        ) : (
          <>
            {isHr && projectsFilter.length > 0 ? (
              <>
                <Typography sx={{ mb: 3 }} variant="h5">
                  Projects in your workspace.
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                  }}
                >
                  {projectsFilter.map((project) => (
                    <ProjectItem
                      key={project._id}
                      workspaceId={id}
                      userId={user._id}
                      project={project}
                      authority={'member'}
                      isProjectManager={isProjectManager}
                    />
                  ))}
                </Box>
                <Divider sx={{ my: 3 }} />
              </>
            ) : (
              ''
            )}
            {managedProjects.length === 0 ? (
              ''
            ) : (
              <>
                <Typography variant="h5">Projects you manage.</Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                    mb: 8,
                  }}
                >
                  {managedProjects.map((project) => (
                    <ProjectItem
                      key={project._id}
                      workspaceId={id}
                      userId={user._id}
                      restoreProjectHook={restoreProjectHook}
                      deleteProjectHook={deleteProjectHook}
                      updateProjectHook={updateProjectHook}
                      project={project}
                      authority={'manager'}
                      isProjectManager={isProjectManager}
                    />
                  ))}
                </Box>
                <Divider sx={{ my: 3 }} />
              </>
            )}
            {ledProjects.length === 0 ? (
              ''
            ) : (
              <>
                <Typography variant="h5" sx={{ mt: 3 }}>
                  Projects you lead.
                </Typography>
                <Box
                  sx={{
                    my: 3,
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                    mb: 8,
                  }}
                >
                  {ledProjects.map((project) => (
                    <ProjectItem
                      key={project._id}
                      workspaceId={id}
                      userId={user._id}
                      restoreProjectHook={restoreProjectHook}
                      deleteProjectHook={deleteProjectHook}
                      updateProjectHook={updateProjectHook}
                      project={project}
                      authority={'teamleader'}
                      isProjectManager={isProjectManager}
                    />
                  ))}
                </Box>
                <Divider sx={{ my: 3 }} />
              </>
            )}
            {normalProjects.length === 0 ? (
              ''
            ) : (
              <>
                <Typography variant="h5" sx={{ mt: 3 }}>
                  Projects you're in.
                </Typography>
                <Box
                  sx={{
                    my: 3,
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                  }}
                >
                  {normalProjects.map((project) => (
                    <ProjectItem
                      key={project._id}
                      workspaceId={id}
                      userId={user._id}
                      restoreProjectHook={restoreProjectHook}
                      deleteProjectHook={deleteProjectHook}
                      updateProjectHook={updateProjectHook}
                      project={project}
                      authority={'none'}
                      isProjectManager={isProjectManager}
                    />
                  ))}
                </Box>
                <Divider />
              </>
            )}
          </>
        )}
      </Card>
    </Box>
  ) : (
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
  );
}
// ----------------------------------------------------------------------
