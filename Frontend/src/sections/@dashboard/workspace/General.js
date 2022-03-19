import PropTypes from 'prop-types';
// @mui
import {
  Grid,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
//
import ProfileFollowInfo from '../user/profile//ProfileFollowInfo';
import ProfileSocialInfo from '../user/profile//ProfileSocialInfo';
import WorkspaceAbout from './WorkspaceAbout';
import { deleteWorkspace } from 'src/redux/slices/workspaceSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from 'src/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

General.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function General({ idWorkspace, myProfile, posts }) {
  const dispatch = useDispatch();
  const { user, isHr } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const DeleteWorkspace = () => {
    try {
      dispatch(deleteWorkspace(idWorkspace, user._id)).then((res) => {
        enqueueSnackbar('Deleted workspace successfully');
        navigate(PATH_DASHBOARD.general.landing);
      });
    } catch (error) {
      enqueueSnackbar('Unauthorized to delete workspace');
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
          {isHr && (
            <Button sx={{ mt: 5 }} onClick={handleClickOpen} color="error">
              Delete Workspace
            </Button>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <WorkspaceAbout profile={myProfile} />
          {/* 
          <ProfilePostInput />
          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        */}
        </Stack>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete your workspace ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Your workspace will be permanetly deleted</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={DeleteWorkspace} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
