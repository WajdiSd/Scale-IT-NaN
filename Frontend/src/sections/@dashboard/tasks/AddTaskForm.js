import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions, Typography, MenuItem } from '@mui/material';
import { LoadingButton, MobileDatePicker, MobileDateTimePicker } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';
import { useParams } from 'react-router';

// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSwitch } from '../../../components/hook-form';
import MemberSearchAutocomplete from '../workspace/MemberSearchAutocomplete';
import useAuth from 'src/hooks/useAuth';
import { useState } from 'react';
import { addProject } from 'src/redux/slices/projectSlice';
import AssigneeSeachAutoComplete from './AssigneeSeachAutoComplete';
import { styled } from '@mui/material/styles';
import { addTask } from 'src/redux/slices/tasksSlice';

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
    start: new Date(),
    end: new Date(),
  };

  return _event;
};

// ----------------------------------------------------------------------

AddTaskForm.propTypes = {
  onCancel: PropTypes.func,
};

export default function AddTaskForm({ onCancel, handleAddTask}) {

  const {user} = useAuth();

  const {id, projectid} = useParams();

  const [Assignees, setAssignees] = useState([]);

  const handleSetAssignee = (members) => {
    console.log('handleSetAssignee');
    console.log(members);
    let membersID = [];
    members.forEach(element => {
      membersID.push({memberId: element._id})
    });
    setAssignees(membersID);
  };

  const dispatch = useDispatch();

  const EventSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
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
    
    try {
      const newTask = {
        name: data.name,
        description: data.description,
        startDate: data.start,
        expectedEndDate: data.end,
        teamLeadId: user._id,
        members: Assignees,
        projectId: projectid,
        prority: prioritize,
      };
      onCancel();
      reset();
      handleAddTask(newTask)  
      
    } catch (error) {
      console.error(error);
    }
  };


  const values = watch();

  const PRIORITIZES = ['Low', 'Medium', 'High'];
  const [prioritize, setPrioritize] = useState('Low');
  const handleChangePrioritize = (event) => {
    setPrioritize(event.target.value);
  };
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    width: 140,
    fontSize: 13,
    flexShrink: 0,
    color: theme.palette.text.secondary,
  }));
  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        
        <AssigneeSeachAutoComplete handleSetAssignee={handleSetAssignee}/>

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDatePicker
              {...field}
              label="Start date"
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDatePicker
              {...field}
              label="End date"
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!isDateError}
                  helperText={isDateError && 'End date must be later than start date'}
                />
              )}
            />
          )}
        />

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
