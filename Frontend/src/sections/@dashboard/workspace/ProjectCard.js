import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, IconButton, Typography, CardContent, Button, DialogTitle } from '@mui/material';
// utils
import { fDate, fTimestamp } from '../../../utils/formatTime';
import cssStyles from '../../../utils/cssStyles';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import LightboxModal from '../../../components/LightboxModal';
import Label from 'src/components/Label';
import { useTheme } from '@emotion/react';
import { sentenceCase } from 'change-case';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { DialogAnimate } from 'src/components/animate';
import { CalendarForm } from '../calendar';
import AddProjectForm from '../project/AddProjectForm';
import useAuth from 'src/hooks/useAuth';
import { InputAdornment } from '@mui/material';
import InputStyle from 'src/components/InputStyle';
import useProjectFilter from 'src/hooks/useProjectFilter';

// ----------------------------------------------------------------------
const CaptionStyle = styled(CardContent)(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
}));
// ----------------------------------------------------------------------

ProjectCard.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default function ProjectCard({ projects, gallery }) {
  const [openLightbox, setOpenLightbox] = useState(false);

  const { isProjectManager } = useAuth();
  const { query, projectsFilter, searchProjects } = useProjectFilter(projects);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const imagesLightbox = gallery.map((img) => img.imageUrl);

  const handleAddEvent = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
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
          {!projects ? (
            <Typography variant="h1">No Projects Found!</Typography>
          ) : (
            projectsFilter.map((project) => (
              <ProjectItem key={project._id} project={project} onOpenLightbox={handleOpenLightbox} />
            ))
          )}
        </Box>
        <LightboxModal
          images={imagesLightbox}
          mainSrc={imagesLightbox[selectedImage]}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onCloseRequest={() => setOpenLightbox(false)}
        />
      </Card>
    </Box>
  );
}
// ----------------------------------------------------------------------

ProjectItem.propTypes = {
  image: PropTypes.object,
  onOpenLightbox: PropTypes.func,
};

function ProjectItem({ project, image, onOpenLightbox }) {
  const { description, name, startDate, expectedEndDate } = project;
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const now = new Date();
  const expectedEndDateJs = new Date(expectedEndDate);

  const projectCompleted = expectedEndDateJs.getTime() < now.getTime();

  const color = projectCompleted ? 'error' : 'in_progress' && 'warning';

  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      <Image alt="gallery image" ratio="1/1" src={''} onClick={() => onOpenLightbox(imageUrl)} />
      <Label
        sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
        variant={isLight ? 'ghost' : 'filled'}
        color={color}
      >
        {projectCompleted ? sentenceCase('overdue') : sentenceCase('in progress')}
      </Label>
      <CaptionStyle>
        <div>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Due Date
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {fDate(expectedEndDateJs)}
          </Typography>
        </div>
        <IconButton color="inherit">
          <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
        </IconButton>
      </CaptionStyle>
    </Card>
  );
}
