import PropTypes from 'prop-types';
// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import useWorkspace from 'src/hooks/useWorkspace';

// ----------------------------------------------------------------------

WorkspaceCount.propTypes = {
  profile: PropTypes.shape({
    follower: PropTypes.number,
    following: PropTypes.number,
  }),
};

export default function WorkspaceCount() {
  const { workspace } = useWorkspace();

  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{workspace?.assigned_members?.length}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Members
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{0}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Projects
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
