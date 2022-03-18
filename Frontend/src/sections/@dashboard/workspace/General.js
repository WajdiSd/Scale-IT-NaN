import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from '../user/profile/ProfileAbout';
import ProfilePostCard from '../user/profile//ProfilePostCard';
import ProfilePostInput from '../user/profile//ProfilePostInput';
import ProfileFollowInfo from '../user/profile//ProfileFollowInfo';
import ProfileSocialInfo from '../user/profile//ProfileSocialInfo';
import WorkspaceAbout from './WorkspaceAbout';

// ----------------------------------------------------------------------

General.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function General({ myProfile, posts }) {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
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
