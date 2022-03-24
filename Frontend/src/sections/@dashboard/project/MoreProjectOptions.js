import PropTypes from 'prop-types';

// hooks
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import useProjectFilter from 'src/hooks/useProjectFilter';
import useProject from 'src/hooks/useProject';
import { useParams } from 'react-router';
import useAuth from 'src/hooks/useAuth';

// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  IconButton,
  Typography,
  CardContent,
  CircularProgress,
  Button,
  InputAdornment,
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

// utils
import { fDate, fTimestamp } from '../../../utils/formatTime';
import cssStyles from '../../../utils/cssStyles';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import LightboxModal from '../../../components/LightboxModal';
import Label from 'src/components/Label';
import { sentenceCase } from 'change-case';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { DialogAnimate } from 'src/components/animate';
import { CalendarForm } from '../calendar';
import AddProjectForm from './AddProjectForm';
import InputStyle from 'src/components/InputStyle';
import MenuPopover from 'src/components/MenuPopover';

// ----------------------------------------------------------------------

export default function MoreProjectOptions({ projectId, workspaceId, deleteProjectHook, user, linkTo }) {
  const { isProjectManager } = useAuth();
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const deleteProject = () => deleteProjectHook({ projectId, workspaceId, memberId: user._id });

  const handleAddEvent = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleDeleteProject = () => {
    deleteProject();
    setOpenDialog(false);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      <IconButton sx={{ top: 8, right: 8, position: 'absolute' }} onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:plus-fill'} sx={{ ...ICON }} />
          <Link to={linkTo} color="inherit" component={RouterLink}>
            Show Details
          </Link>
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {isProjectManager && (
          <MenuItem onClick={handleClickOpen} sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
            Delete
          </MenuItem>
        )}
      </MenuPopover>

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
