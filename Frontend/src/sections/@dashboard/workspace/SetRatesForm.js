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
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';
// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSwitch } from '../../../components/hook-form';
import { setRatesToMember } from 'src/redux/slices/workspaceSlice';
import useAuth from 'src/hooks/useAuth';
import useWorkspace from 'src/hooks/useWorkspace';

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

const getInitialValues = (event, range) => {
  const _event = {
    rateHour: 0,
    rateOvertime: 0,
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

SetRatesForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
  id: PropTypes.string,
};

export default function SetRatesForm({ id, event, range, onCancel }) {
  const { idHR } = useAuth();
  const { workspace } = useWorkspace();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const isCreating = Object.keys(event).length === 0;

  const EventSchema = Yup.object().shape({
    rateHour: Yup.number(),
    rateOvertime: Yup.number(),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
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
      console.log('test rates');
      console.log(data);
      const MemberRates = {
        idHR: idHR,
        idworkspace: workspace._id,
        idmember: id.id,
        rateHour: data.rateHour,
        rateOverTime: data.rateOvertime,
      };
      console.log(MemberRates);
      dispatch(setRatesToMember(MemberRates));
      enqueueSnackbar('Set Rates success!');

      // const newEvent = {
      //   title: data.title,
      //   description: data.description,
      //   textColor: data.textColor,
      //   allDay: data.allDay,
      //   start: data.start,
      //   end: data.end,
      // };
      // if (event.id) {
      //   dispatch(updateEvent(event.id, newEvent));
      //   enqueueSnackbar('Update success!');
      // } else {
      //   enqueueSnackbar('Create success!');
      //   dispatch(createEvent(newEvent));
      // }
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!event.id) return;
    try {
      onCancel();
      dispatch(deleteEvent(event.id));
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="rateHour" label="rate of the hour" />

        <RHFTextField name="rateOvertime" label="rate of the overtime" />
      </Stack>

      <DialogActions>
        {!isCreating && (
          <Tooltip title="Delete Event">
            <IconButton onClick={handleDelete}>
              <Iconify icon="eva:trash-2-outline" width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
          Set
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
