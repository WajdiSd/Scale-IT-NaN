import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton, MobileDatePicker, MobileDateTimePicker } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
import { useParams } from 'react-router';

// components
import { FormProvider, RHFTextField, RHFSwitch } from '../../../components/hook-form';
import MemberSearchAutocomplete from '../workspace/MemberSearchAutocomplete';
import useAuth from 'src/hooks/useAuth';
import { useState } from 'react';

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
};

export default function InviteMembersToProjectForm({ onCancel }) {
  const { enqueueSnackbar } = useSnackbar();

  const {user} = useAuth();

  const {id} = useParams();

  const [invitedMemberId, setInvitedMemberId] = useState(null);

  const handleSetInvitedMemberId = (_id) => {
    console.log("innn dirrab invitemm");
    console.log(_id);
    setInvitedMemberId(_id);
  };
  const dispatch = useDispatch();

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000).required('Description is required'),
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

  const onSubmit = async (data) => {
    console.log("data");
    try {
      const invitedMember = {

      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }

    /*try {
      const newProject = {
        name: data.title,
        description: data.description,
        startDate: data.start,
        expectedEndDate: data.end,
        projectManagerId: user._id,
        teamLeadId: teamLeadId,
        workspaceId: id,
      };
      onCancel();
      reset();
        dispatch(addProject(newProject))
        .then(res=>{
          if(!res.error)
            enqueueSnackbar("Successfully added project")
          else
            enqueueSnackbar("unable to add project",{
              variant: 'error',
            })
      });
      
    } catch (error) {
      console.error(error);
    }
    */
  };


  const values = watch();


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <MemberSearchAutocomplete handleSetInvitedMemberId={handleSetInvitedMemberId}/>
        <RHFTextField name="members" label="colleagues" multiline rows={4} />
      </Stack>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
          Add
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
