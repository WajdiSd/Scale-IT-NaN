// @mui
import { styled, alpha } from '@mui/material/styles';
import { Card, Stack, Typography, Button, OutlinedInput, Divider, Chip } from '@mui/material';
// components
import Image from '../../../components/Image';
import { useState } from 'react';
// palette
import palette from '../../../theme/palette';

// ----------------------------------------------------------------------

const ContentStyle = styled(Card)(({ theme }) => ({
  marginTop: -120,
  boxShadow: 'none',
  padding: theme.spacing(5),
  paddingTop: theme.spacing(16),
  color: theme.palette.common.white,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
}));

// ----------------------------------------------------------------------

export default function WorkspaceInviteFriends({ emails }) {
  const [users, setUsers] = useState([]);
  const [member, setMember] = useState('');
  const [manager, setManager] = useState('');

  function addMember() {
    const user = {
      email: member,
      isManager: false,
    };
    setUsers([...users, user]);
    setMember('');
  }

  function handleMemberInput(event) {
    setMember(event.target.value);
  }

  function addManager() {
    const user = {
      email: manager,
      isManager: true,
    };
    setUsers([...users, user]);
    setManager('');
  }

  function handleManagerInput(event) {
    setManager((manager) => event.target.value);
  }

  function removeUser(event) {
    setUsers((users) => users.filter((user) => user.email !== event.target.innerHTML));
  }

  return (
    <div>
      <Image
        visibleByDefault
        disabledEffect
        src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_invite.png"
        sx={{
          left: 40,
          zIndex: 9,
          width: 140,
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
        }}
      />
      <ContentStyle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Invite your Workspace Members</Typography>
          <Typography variant="h2"></Typography>
        </Stack>

        <Stack direction="column" spacing={3}>
          {/* Workspace Invite Members */}
          <Stack direction="column">
            <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
              Send invites so that other users can join your workspace!
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <OutlinedInput
                size="small"
                placeholder="Member Emails"
                type="text"
                value={member}
                onChange={handleMemberInput}
                sx={{
                  width: 0.8,
                  color: 'common.white',
                  fontWeight: 'fontWeightMedium',
                  bgcolor: (theme) => alpha(theme.palette.common.black, 0.16),
                  '& input::placeholder': {
                    color: (theme) => alpha(theme.palette.common.white, 0.48),
                  },
                  '& fieldset': { display: 'none' },
                }}
              />
              <Button onClick={addMember} color="warning" variant="contained">
                Add Member
              </Button>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={{ xs: 1, md: 2 }}
              alignItems="center"
              justifyContent="start"
              sx={{
                width: 1,
                flexWrap: 'wrap',
              }}
            >
              {users.length > 0 && users.find((user) => !user.isManager) ? (
                users.map((user, index) =>
                  !user.isManager ? (
                    <Chip
                      key={index}
                      label={user.email}
                      clickable
                      onClick={removeUser}
                      variant="filled"
                      sx={{
                        p: 1,
                        m: 1,
                        color: 'common.white',
                        fontWeight: 'fontWeightMedium',
                        bgcolor: (theme) => alpha(palette.light.primary.main, 0.7),
                      }}
                    />
                  ) : (
                    ''
                  )
                )
              ) : (
                <Typography variant="h6">No members added yet.</Typography>
              )}
            </Stack>
          </Stack>

          {/* Workspace Invite Managers */}
          <Stack direction="column">
            <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
              Are those users your future Workspace Managers?
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <OutlinedInput
                size="small"
                placeholder="Manager Emails"
                type="text"
                value={manager}
                onChange={handleManagerInput}
                sx={{
                  width: 0.8,
                  color: 'common.white',
                  fontWeight: 'fontWeightMedium',
                  bgcolor: (theme) => alpha(theme.palette.common.black, 0.16),
                  '& input::placeholder': {
                    color: (theme) => alpha(theme.palette.common.white, 0.48),
                  },
                  '& fieldset': { display: 'none' },
                }}
              />
              <Button onClick={addManager} color="warning" variant="contained">
                Add Member
              </Button>
            </Stack>
            <Stack
              direction="row"
              spacing={{ xs: 1, md: 2 }}
              divider={<Divider orientation="vertical" flexItem />}
              alignItems="center"
              justifyContent="start"
              sx={{
                width: 1,
                flexWrap: 'wrap',
              }}
            >
              {users.length > 0 && users.find((user) => user.isManager) ? (
                users.map((user, index) =>
                  user.isManager ? (
                    <Chip
                      key={index}
                      label={user.email}
                      clickable
                      onClick={removeUser}
                      variant="filled"
                      sx={{
                        p: 1,
                        m: 1,
                        color: (theme) => alpha(palette.light.common.white, 1),
                        fontWeight: 'fontWeightMedium',
                        bgcolor: (theme) => alpha(palette.light.primary.main, 1),
                      }}
                    />
                  ) : (
                    ''
                  )
                )
              ) : (
                <Typography variant="h6">No managers added yet.</Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </ContentStyle>
    </div>
  );
}
