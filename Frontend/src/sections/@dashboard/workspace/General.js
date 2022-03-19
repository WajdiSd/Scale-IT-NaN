import PropTypes from 'prop-types';
// @mui
import { Grid, Stack, Button } from '@mui/material';
//
import ProfileAbout from '../user/profile/ProfileAbout';
import ProfilePostCard from '../user/profile//ProfilePostCard';
import ProfilePostInput from '../user/profile//ProfilePostInput';
import ProfileFollowInfo from '../user/profile//ProfileFollowInfo';
import ProfileSocialInfo from '../user/profile//ProfileSocialInfo';
import WorkspaceAbout from './WorkspaceAbout';
import { isHr } from 'src/redux/slices/authSlice';

// ----------------------------------------------------------------------

General.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function General({ myProfile, posts }) {
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
    </Grid>
  );
}
