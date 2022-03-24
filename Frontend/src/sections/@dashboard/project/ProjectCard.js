import PropTypes from 'prop-types';

// hooks
import { useState } from 'react';
import useProjectFilter from 'src/hooks/useProjectFilter';
import useAuth from 'src/hooks/useAuth';
import useProject from 'src/hooks/useProject';
import { useParams } from 'react-router';

// @mui
import { Box, Card, Typography, CircularProgress, Button, InputAdornment, DialogTitle } from '@mui/material';

// components
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { DialogAnimate } from 'src/components/animate';
import AddProjectForm from './AddProjectForm';
import InputStyle from 'src/components/InputStyle';
import ProjectItem from './ProjectItem';

ProjectCard.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default function ProjectCard({ loaded, projects }) {
  const { isProjectManager, user } = useAuth();
  const { deleteProjectHook, restoreProjectHook } = useProject();
  const { query, projectsFilter, searchProjects } = useProjectFilter(projects);
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

      <HeaderBreadcrumbs
        heading=""
        links={[{ name: '', href: '' }]}
        action={
          isProjectManager ? (
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              onClick={handleAddEvent}
            >
              New Project
            </Button>
          ) : null
        }
      />

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

      <Card sx={{ p: 3 }}>
        {!projects || projects.length === 0 ? (
          <Typography variant="h1">No projects found.</Typography>
        ) : (
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
                restoreProjectHook={restoreProjectHook}
                deleteProjectHook={deleteProjectHook}
                project={project}
                isProjectManager={isProjectManager}
              />
            ))}
          </Box>
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
