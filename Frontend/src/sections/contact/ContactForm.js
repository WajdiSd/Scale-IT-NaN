// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// components
import { MotionInView, varFade } from '../../components/animate';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useDispatch } from 'react-redux';
import { sendContactEmail } from 'src/redux/slices/authSlice';

// ----------------------------------------------------------------------

export default function ContactForm() {

  const { enqueueSnackbar } = useSnackbar();

  const NewWorkspaceSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    message: Yup.string().required('Message is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    subject: Yup.string().required('Subject is required'),

  });

  const defaultValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewWorkspaceSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(sendContactEmail(data))
      .then(res=>{
        enqueueSnackbar("Email sent successfully");
        reset();
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack spacing={5}>
      <MotionInView variants={varFade().inUp}>
        <Typography variant="h3">
          Feel free to contact us. <br />
          We'll be glad to hear from you, buddy.
        </Typography>
      </MotionInView>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <MotionInView variants={varFade().inUp}>
          <RHFTextField fullWidth label="Name" name="name" />
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <RHFTextField fullWidth label="Email" name="email" />
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <RHFTextField fullWidth label="Subject" name="subject" />
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <RHFTextField fullWidth label="Enter your message here." name="message" multiline rows={4} />
        </MotionInView>
      </Stack>

      <MotionInView variants={varFade().inUp}>
        <Button type="submit" sx={{mt: 3}} size="large" variant="contained">
          Submit Now
        </Button>
      </MotionInView>
      </FormProvider>
    </Stack>
  );
}
