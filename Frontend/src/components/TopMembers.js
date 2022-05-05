import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Card, Avatar, CardHeader, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../utils/formatNumber';
// _mock_
import { _appAuthors } from '../_mock';
// components
import Iconify from '../components/Iconify';
import useWorkspace from 'src/hooks/useWorkspace';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

// ----------------------------------------------------------------------

export default function TopMembers() {
  const displayAuthor = orderBy(_appAuthors, ['favourite'], ['desc']);
  const { leaderboardWorkspace } = useWorkspace();

  console.log(leaderboardWorkspace);
  return (
    <Card>
      <CardHeader title="Top Members" />
      <Stack spacing={3} sx={{ p: 3 }}>
        {leaderboardWorkspace.map((member, index) => (
          <MemberItem key={member.member} member={member} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

MemberItem.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    favourite: PropTypes.number,
    name: PropTypes.string,
    score: PropTypes.number,
  }),
  index: PropTypes.number,
};

function MemberItem({ member, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={member.first} src={member.avatar} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{member.first}</Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <Iconify icon={'akar-icons:circle-triangle-up-fill'} sx={{ width: 16, height: 16, mr: 0.5 }} />
          {fShortenNumber(member.score)}
        </Typography>
      </Box>

      <IconWrapperStyle
        sx={{
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      >
        <Iconify icon={'ant-design:trophy-filled'} width={20} height={20} />
      </IconWrapperStyle>
    </Stack>
  );
}
