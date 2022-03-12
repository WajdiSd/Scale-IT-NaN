import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { VerifyCodeForm } from '../../sections/auth/verify-code';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyAccount } from 'src/redux/slices/authSlice';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ConfirmAccount() {
  const { enqueueSnackbar } = useSnackbar();
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    try {
      //await login(data.email, data.password);
      dispatch(verifyAccount(id))
      enqueueSnackbar("Account verified");
      navigate(PATH_DASHBOARD.root, { replace: true });

    } catch (error) {
      console.error(error);
    }

  }, []);


  return (
    <></>
  );
}
