import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Stack,
  Button,
  Tooltip,
  TextField,
  IconButton,
  DialogActions,
  OutlinedInput,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { LoadingButton, MobileDatePicker, MobileDateTimePicker } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
import { useParams } from 'react-router';

// components
import { FormProvider, RHFTextField, RHFSwitch } from '../../../components/hook-form';
import MemberSearchAutocomplete from '../workspace/MemberSearchAutocomplete';
import useAuth from 'src/hooks/useAuth';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';

import { inviteMemberToProject } from 'src/redux/slices/projectSlice';
import { setUserError } from 'src/redux/slices/inviteSlice';
import palette from 'src/theme/palette';
import { userExistsInWorkspace } from 'src/redux/slices/workspaceSlice';
// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = () => {
  const _event = {
    title: '',
    description: '',
    invitedMemberId: null,
    start: new Date(),
    end: new Date(),
  };

  return _event;
};

// ----------------------------------------------------------------------

InviteMembersToProjectForm.propTypes = {
  onCancel: PropTypes.func,
  onInviteMembers: PropTypes.func,
};

export default function InviteMembersToProjectForm({ onInviteMembers, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const dispatch = useDispatch();

  let users = [];

  const [invitedMember, setInvitedMember] = useState('');
  const [invitedMembers, setInvitedMembers] = useState([]);

  function handleMemberInput(event) {
    setInvitedMember(event.target.value);
  }

  const validateEmail = (email) => {
    console.log(email);
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const EventSchema = Yup.object().shape({
    title: Yup.string(),
    description: Yup.string(),
  });
  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(),
  });

  const handleRemoveUser = (event) =>
    setInvitedMembers((invitedMembers) => invitedMembers.filter((user) => user !== event.target.innerHTML));

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  let isInWorkspace = false;
  const handleAddMemberToList = (e) => {
    e.preventDefault();
    isInWorkspace = dispatch(userExistsInWorkspace({ id, invitedMember }));
    isInWorkspace.then((res) => {
      if (res && validateEmail(invitedMember)) {
        setInvitedMembers((invitedMembers) => [...invitedMembers, invitedMember]);
        setInvitedMember('');
      } else {
        enqueueSnackbar('User not in workspace', { variant: 'error' });
      }
    });
  };

  const values = watch();

  return (
    <FormProvider methods={methods}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <OutlinedInput
            size="small"
            placeholder="Member Emails"
            type="text"
            value={invitedMember}
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
          <Button onClick={handleAddMemberToList} color="warning" variant="contained">
            Add Member
          </Button>
        </Stack>
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
        {invitedMembers.length > 0 ? (
          invitedMembers.map((user, index) =>
            true ? (
              <Chip
                key={index}
                label={user}
                variant="filled"
                sx={{
                  p: 1,
                  m: 1,
                  color: 'common.white',
                  fontWeight: 'fontWeightMedium',
                  bgcolor: (theme) => alpha(palette.light.secondary.dark, 0.7),
                }}
              />
            ) : (
              ''
            )
          )
        ) : (
          <Chip
            label="no members"
            clickable
            onClick={handleRemoveUser}
            variant="filled"
            sx={{
              p: 1,
              m: 1,
              color: 'common.white',
              fontWeight: 'fontWeightMedium',
              bgcolor: (theme) => alpha(palette.light.primary.main, 0.7),
            }}
          />
        )}
      </Stack>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onCancel();
            onInviteMembers(invitedMembers);
          }}
          variant="contained"
          loading={isSubmitting}
          loadingIndicator="Loading..."
        >
          Invite
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
