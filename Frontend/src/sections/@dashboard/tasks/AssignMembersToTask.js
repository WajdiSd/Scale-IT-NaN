import { useState } from 'react';
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

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function AssignMembersToTask({ open, projectId, handleClose }) {
  const { usersInProject } = useProject();

  return (
    <>
      <Container
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 100,
          width: '100%',
          height: '100vh',
          display: `${open ? 'fixed' : 'none'}`,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(0,0,0,0.2)',
        }}
      >
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
            Contacts <Typography component="span">({_contacts.length})</Typography>
          </Typography>

          <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
            {usersInProject.map((contact) => (
              <MenuItem key={contact._id}>
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
                />
              </MenuItem>
            ))}
          </Scrollbar>
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
            {usersInProject.length > 0 && usersInProject.find((user) => user.isManager) ? (
              usersInProject.map((user, index) =>
                user.isManager ? (
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
                ) : (
                  ''
                )
              )
            ) : (
              <Typography variant="h6">No managers added yet.</Typography>
            )}
          </Stack>
        </MenuPopover>
      </Container>
    </>
  );
}
