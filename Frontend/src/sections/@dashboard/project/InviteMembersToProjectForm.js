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
import AssigneeSeachAutoComplete from './AssigneeSeachAutoComplete';
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
  const { id } = useParams();
  const dispatch = useDispatch();

  const [invitedMembers, setInvitedMembers] = useState([]);


  const EventSchema = Yup.object().shape({
    title: Yup.string(),
    description: Yup.string(),
  });
  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleAddMemberToList = (members) => {
        
        let membersID = [];
        members.forEach(element => {
          membersID.push({memberId: element._id})
        });
        setInvitedMembers(membersID);

  };

  const values = watch();

  return (
    <FormProvider methods={methods}>
        <Stack spacing={3} sx={{ p: 3 }}>
        <AssigneeSeachAutoComplete handleSetAssignee={handleAddMemberToList}/>
        </Stack>
     
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

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
