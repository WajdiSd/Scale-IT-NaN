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

// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSwitch } from '../../../components/hook-form';
import MemberSearchAutocomplete from '../workspace/MemberSearchAutocomplete';
import { useEffect, useState } from 'react';
import { getProject, updateProject } from 'src/redux/slices/projectSlice';
import useProject from 'src/hooks/useProject';
import useAuth from 'src/hooks/useAuth';

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

// ----------------------------------------------------------------------

UpdateProjectForm.propTypes = {
  onCancel: PropTypes.func,
  projectId: PropTypes.object,
};

export default function UpdateProjectForm({ project,onCancel }) {

  const dispatch = useDispatch();

  const getInitialValues = () => {
    const _event = {
      title: project?.name,
      description: project?.description,
      startDate: project?.startDate,
      expectedEndDate: project?.expectedEndDate,
    };
    return _event;
  };

  const { enqueueSnackbar } = useSnackbar();

  const {idProjectManager} = useAuth();

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
    try {
      const newProject = {
        idProject: project._id,
        idPM: idProjectManager,
        name: data.title,
        description: data.description,
        startDate: data.startDate,
        expectedEndDate: data.expectedEndDate,
      };
      onCancel();
      reset();
      dispatch(updateProject(newProject)).then((res) => {
        if (!res.error) {enqueueSnackbar('Successfully updated project');
        window.location.reload();
      }
        else
          enqueueSnackbar('unable to update project', {
            variant: 'error',
          });
      });

    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.expectedEndDate), new Date(values.startDate));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="title" label="Title" />

        <RHFTextField name="description" label="Description" multiline rows={4} />

        <Controller
          name="startDate"
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
          name="expectedEndDate"
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
