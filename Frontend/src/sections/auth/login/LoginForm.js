import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { dispatch } from 'src/redux/store';
import {login, resendEmail, reset} from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const  userStore = useAuth();
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);


  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const resendMail = async () =>{
    dispatch(resendEmail(userStore.user._id)).then((res)=>{
      if(!res.error){
          enqueueSnackbar(res.payload.message);

    }
    })
    .catch((e)=>{
      console.log("e:",e);
    });
  }

  const onSubmit = async (data) => {
    try {
      //await login(data.email, data.password);
      dispatch(login(data))
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
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {!!userStore.isError && <Alert severity="error">{userStore.message}
        {userStore.message == "Account not verified"? 
        <Link component={RouterLink} variant="subtitle2" to='' sx={{ ml: 3 }} onClick={resendMail}>
           Resend email
        </Link>
        :
        null
        }
        </Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={userStore.isLoading}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
