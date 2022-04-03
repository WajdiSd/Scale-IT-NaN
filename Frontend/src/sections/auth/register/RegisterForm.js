import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Box, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField ,RHFSelect} from '../../../components/hook-form';

import {register} from 'src/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { PATH_AUTH } from '../../../routes/paths';

import { SentIcon } from 'src/assets';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const userStore = useAuth();
  //const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");


  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender required')
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gender: 'female',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const dispatch = useDispatch();
  //const history = useHistory();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      //console.log(data);
      setEmail(data.email)
      dispatch(register(data));
      //toast.info('We have sent you a verification email. Please check your inbox.');

      //history.push("/auth/login");
      //navigate("/auth/login");
      //await register(data.email, data.password, data.firstName, data.lastName, data.phone, data.gender);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

  {!userStore.isAuthenticated ? 
  (
    <>
      {!userStore.user ? 
      (
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField name="phone" label="Phone number" />

        <RHFSelect name="gender" label="Gender" >
          <option>female</option>
          <option>male</option>
        </RHFSelect>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={userStore.isLoading}>
          Register
        </LoadingButton>
      </Stack>
      ):
      (
      <Box sx={{ textAlign: 'center' }}>
                      <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                      <Typography variant="h3" gutterBottom>
                        Email confirmation sent successfully
                      </Typography>
                      <Typography>
                        We have sent a confirmation email to &nbsp;
                        <strong>{email}</strong>
                        <br />
                        Please check your email.
                      </Typography>

                      <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                        Back
                      </Button>
      </Box>
      )
      }
    </>
      
  ):
  (null)
  }
    </FormProvider>
    
  );
}
