import { capitalCase } from 'change-case';
import { useState } from 'react';
import React from 'react';
// @mui
import { Container, Tab, Box, Tabs, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from '../../sections/@dashboard/user/account';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { DeleteAccount } from 'src/redux/slices/authSlice';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const authState = useSelector((state) => state.auth);

  const [currentTab, setCurrentTab] = useState('general');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteUserAccount = () => {
    console.log(authState.user._id);
    dispatch(DeleteAccount(authState.user._id)).then(() => {
      //navigate(PATH_AUTH.login, { replace: true });
      window.location.reload();
    });
    // navigate(PATH_AUTH.login, { replace: true });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    /*{
      value: 'billing',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: <AccountBilling cards={_userPayment} addressBook={_userAddressBook} invoices={_userInvoices} />,
    },
    {
      value: 'notifications',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <AccountNotifications />,
    },
    {
      value: 'social_links',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <AccountSocialLinks myProfile={_userAbout} />,
    },*/
    {
      value: 'change_password',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' },
          ]}
        />
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>
        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
      <Button sx={{ mt: 5 }} onClick={handleClickOpen} color="error">
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete your account ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Your account will be permanetly deleted</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deleteUserAccount} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}
