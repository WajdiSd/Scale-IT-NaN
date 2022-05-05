// hooks
import { useState } from 'react';
import useAuth from 'src/hooks/useAuth';

// @mui
import {
  IconButton,
  Button,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
} from '@mui/material';

//react router link
import { Link as RouterLink } from 'react-router-dom';

// components
import Iconify from '../../../components/Iconify';
import MenuPopover from 'src/components/MenuPopover';
import { updateProject } from 'src/redux/slices/projectSlice';
import UpdateProjectForm from './UpdateProjectForm';
import { DialogAnimate } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function MoreProjectOptions({
  projectId,
  project,
  workspaceId,
  deleteProjectHook,
  updateProjectHook,
  userId,
  linkTo,
  authority,
}) {
  const [openPopover, setOpenPopover] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const deleteProject = () => deleteProjectHook({ projectId, workspaceId, memberId: userId });

  const handleDeleteProject = () => {
    deleteProject();
    setOpenDialog(false);
  };

  const handleUpdateProject = () => {
    updateProject();
    setOpenUpdateDialog(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton sx={{ top: 8, right: 8, position: 'absolute' }} onClick={handleOpenPopover}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(openPopover)}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >

        <Link
          to={linkTo}
          color="inherit"
          component={RouterLink}
          sx={{
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          <MenuItem to={linkTo}>
            <Iconify icon={'eva:plus-fill'} sx={{ ...ICON }} />
            Show Details
          </MenuItem>
        </Link>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {authority === 'manager' && (
          <MenuItem onClick={handleOpenUpdateDialog}>
            <Iconify icon={'ant-design:edit-filled'} sx={{ ...ICON }} />
            Update
          </MenuItem>
        )}
        {authority === 'manager' && (
          <MenuItem onClick={handleClickOpen} sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
            Delete
          </MenuItem>
        )}
      </MenuPopover>
      <DialogAnimate sx={{ minWidth: '50%' }} open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>{'Update Project'}</DialogTitle>
        <UpdateProjectForm project={project} onCancel={handleCloseUpdateDialog} />
      </DialogAnimate>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this project ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">This project will be permanently deleted</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleDeleteProject} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
