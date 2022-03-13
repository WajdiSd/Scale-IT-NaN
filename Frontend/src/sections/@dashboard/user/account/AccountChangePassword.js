import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';

import useAuth from '../../../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { updateUserPassword } from 'src/redux/slices/authSlice';
import { useNavigate } from 'react-router';
import { PATH_AUTH } from 'src/routes/paths';
//import { updateUserPassword } from 'src/redux/slices/authSlice';


// ----------------------------------------------------------------------

export default function AccountChangePassword(email) {
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const navigate = useNavigate();


  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const  userStore = useAuth();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if(userStore.isAuthenticated){
      data = {
        ...data,
        email: userStore.user.email
      }
    } else {
      data = {
        ...data,
        email: email.email
      }
    }
    try {
      dispatch(updateUserPassword(data)).then((res)=>{
        console.log(res);
        if(res.error){
          enqueueSnackbar(res.payload,{
            variant: 'error',
          })
        }else{
          enqueueSnackbar(res.payload)
          navigate(PATH_AUTH.login, { replace: true });
        }
      }).catch((e)=>{
        enqueueSnackbar(e,{
          variant: 'error',
        })
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="oldPassword" type="password" label="Old Password" />

          <RHFTextField name="newPassword" type="password" label="New Password" />

          <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
