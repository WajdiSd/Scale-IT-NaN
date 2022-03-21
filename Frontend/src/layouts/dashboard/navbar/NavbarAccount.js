import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useResponsive from '../../../hooks/useResponsive';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import { useEffect, useState } from 'react';
import useWorkspace from 'src/hooks/useWorkspace';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isInWorkspace, isCollapse }) {
  const { user, isHr } = useAuth();
  const { workspace } = useWorkspace();

  const [memberInviteLink, setMemberInviteLink] = useState("");
  const rootWorkspace = () => {
    if(JSON.parse(localStorage.getItem('redux-workspaces')) != null){
      const workspac = JSON.parse(localStorage.getItem('redux-workspaces'))['workspace'];
    
      if (JSON.parse(workspac) != null) {
        const _id = JSON.parse(workspac)['_id'];
        return `/dashboard/workspace/${_id}/invite`;
      }
      else{
        return "";
      }
    }else{
      return "";
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setMemberInviteLink(rootWorkspace())
    }, 500);
  }, []);
  const isDesktop = useResponsive('up', 'lg');

  return (
    <>
      <Link underline="none" color="inherit" component={RouterLink} to={PATH_DASHBOARD.user.account}>
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          <MyAvatar />

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
              {user?.role}
            </Typography>
          </Box>
        </RootStyle>
      </Link>

      {!isDesktop && isInWorkspace && isHr && (
        <Button href={memberInviteLink} variant="contained">
          Invite Members
        </Button>
      )}
    </>
  );
}
