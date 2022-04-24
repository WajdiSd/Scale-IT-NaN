import PropTypes from 'prop-types';
import { capitalCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Avatar, Typography, AvatarGroup, IconButton } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import BadgeStatus from '../../../components/BadgeStatus';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
}));

// ----------------------------------------------------------------------

export default function ChatHeaderDetail() {

  return (
    <RootStyle>
      <OneAvatar/>

      {/*
        <Box sx={{ flexGrow: 1 }} />
        <IconButton>
          <Iconify icon="eva:phone-fill" width={20} height={20} />
        </IconButton>
        <IconButton>
          <Iconify icon="eva:video-fill" width={20} height={20} />
        </IconButton>
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
        </IconButton>
      */}
      
    </RootStyle>
  );
}

// ----------------------------------------------------------------------



function OneAvatar() {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar src="/images/avatars/brain.png" alt='Mrs. Brain' />
        <BadgeStatus status='online' sx={{ position: 'absolute', right: 2, bottom: 2 }} />
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">Mrs. Brain</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {capitalCase('Online')}
        </Typography>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

GroupAvatar.propTypes = {
  participants: PropTypes.array.isRequired,
};

function GroupAvatar({ participants }) {
  return (
    <div>
      <AvatarGroup
        max={3}
        sx={{
          mb: 0.5,
          '& .MuiAvatar-root': { width: 32, height: 32 },
        }}
      >
        {participants.map((participant) => (
          <Avatar key={participant.id} alt={participant.name} src={participant.avatar} />
        ))}
      </AvatarGroup>
      <Link variant="body2" underline="none" component="button" color="text.secondary" onClick={() => {}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {participants.length} persons
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </Box>
      </Link>
    </div>
  );
}
