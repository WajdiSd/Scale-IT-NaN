import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { ButtonGroup, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { sendCode } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const [isEmail, setIsEmail] = useState(true);


  const chooseMethod = (e) =>{
    setIsEmail(e.target.value==="email")
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch= useDispatch();
  const onSubmit = async (data) => {
    data = {
      ...data,
      isEmail : isEmail
    }
    try {
      if (isMountedRef.current) {
        dispatch(sendCode(data));

        onSent();
        onGetEmail(data.email);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
        <ButtonGroup onClick={chooseMethod}>
          <LoadingButton startIcon={<ForwardToInboxIcon />} value="email" fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Send via Email
          </LoadingButton>

          <LoadingButton startIcon={<PhoneIphoneOutlinedIcon />} value="phone" fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Send via SMS
          </LoadingButton>

          </ButtonGroup>
      </Stack>
    </FormProvider>
  );
}
