import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _contacts } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import BadgeStatus from '../../../components/BadgeStatus';
import { IconButtonAnimate } from '../../../components/animate';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';
import useProject from 'src/hooks/useProject';
import createAvatar from 'src/utils/createAvatar';
import { randomInArray } from 'src/_mock/funcs';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/lab';
import useTaskInvite from 'src/hooks/useTaskInvite';
import { Chip } from '@mui/material';
import palette from 'src/theme/palette';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function AssignMembersToTask({ open, taskId, handleClose, setRefreshTasks }) {
  const {
    users,
    notAssignedMembers,
    addMemberUser,
    removeUserHook,
    userError,
    resetUserErrorHook,
    userSuccess,
    resetUserSuccessHook,
    submitInvite,
    fetchTaskMembers,
  } = useTaskInvite(taskId);

  useEffect(() => {
    if (open) {
      fetchTaskMembers(taskId);
    }
  }, [open]);

  function handleSubmit() {
    submitInvite(handleClose, setRefreshTasks);
  }

  function handleMemberInput(email) {
    resetUserErrorHook();
    addMemberUser(email);
  }

  function handleCloseSnackbars() {
    resetUserErrorHook();
    resetUserSuccessHook();
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={userError.length > 0}
        autoHideDuration={5000}
        onClose={handleCloseSnackbars}
      >
        <Alert onClose={handleCloseSnackbars} severity="error" sx={{ width: '100%' }}>
          {userError}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={userSuccess.length > 0}
        autoHideDuration={5000}
        onClose={handleCloseSnackbars}
      >
        <Alert onClose={handleCloseSnackbars} severity="success" sx={{ width: '100%' }}>
          {userSuccess}
        </Alert>
      </Snackbar>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          position: 'relative',
          display: 'block',
          mt: 1.5,
          ml: 0.75,
          width: 320,
          borderRadius: 0.75,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Project Members <Typography component="span">({notAssignedMembers.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {notAssignedMembers &&
            notAssignedMembers.map((contact) => (
              <MenuItem key={contact._id} onClick={() => handleMemberInput(contact.email)}>
                <ListItemAvatar sx={{ position: 'relative' }}>
                  <Avatar alt={contact.firstName} color={createAvatar(contact.firstName).color} sx={{ mr: 2 }}>
                    {createAvatar(contact.firstName).name}
                  </Avatar>
                  <BadgeStatus
                    status={randomInArray(['online', 'offline', 'away', 'busy'])}
                    sx={{ position: 'absolute', right: 1, bottom: 1 }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                  primary={`${contact.firstName} ${contact.lastName}`}
                  secondary={contact.email}
                />
              </MenuItem>
            ))}
        </Scrollbar>
        <div
          style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {users.length > 0 ? (
            <>
              {users.map((user, index) => (
                <Chip
                  key={index}
                  label={user.email}
                  clickable
                  onClick={removeUserHook}
                  variant="filled"
                  sx={{
                    p: 1,
                    m: 1,
                    color: (theme) => alpha(palette.light.common.white, 1),
                    fontWeight: 'fontWeightMedium',
                    bgcolor: (theme) => alpha(palette.light.primary.main, 1),
                  }}
                />
              ))}
              <Stack
                direction="row"
                divider={<Divider orientation="horizontal" flexItem />}
                alignItems="center"
                justifyContent="center"
                sx={{
                  mt: '20px',
                  width: 1,
                  flexWrap: 'nowrap',
                }}
              >
                <Button onClick={handleSubmit} sx={{ color: 'white' }} color="success" variant="contained">
                  Submit
                </Button>
              </Stack>
            </>
          ) : (
            <Typography variant="h6">No members added yet.</Typography>
          )}
        </div>
      </MenuPopover>
    </>
  );
}
