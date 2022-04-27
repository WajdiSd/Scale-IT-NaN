import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Link,
  Grid,
  List,
  Stack,
  Popover,
  ListItem,
  ListSubheader,
  CardActionArea,
  Button,
  AppBar,
  Toolbar,
  Container,
} from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useAuth from 'src/hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
import { NavLink as RouterLink } from 'react-router-dom';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';

import { PATH_AFTER_LOGIN } from '../../config';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const { user } = useAuth();

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          {isDesktop && (
            <Label color="info" sx={{ ml: 1 }}>
              v5.0.0
            </Label>
          )}
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}

          {user ? (
            <Button
              to={PATH_AFTER_LOGIN}
              component={RouterLink}
              variant="contained"
              color="success"
              sx={{
                paddingX: '25px',
                ...(isHome && { color: 'common.white' }),
                '&.active': {
                  color: 'primary.main',
                },
              }}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button
                to={PATH_AUTH.register}
                component={RouterLink}
                variant="outlined"
                sx={{
                  marginRight: '15px',
                  paddingX: '40px',
                  ...(isHome && { color: 'common.white' }),
                  ...(isOffset && { color: 'primary.main' }),
                  '&.active': {
                    color: 'primary.main',
                  },
                }}
              >
                Register
              </Button>
              <Button to={PATH_AUTH.login} component={RouterLink} variant="contained" sx={{ paddingX: '30px' }}>
                Login
              </Button>
            </>
          )}

          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
