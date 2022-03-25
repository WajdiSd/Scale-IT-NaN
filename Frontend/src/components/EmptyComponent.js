// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Container, Typography, InputAdornment } from '@mui/material';
// hooks
import useCountdown from '../hooks/useCountdown';
// components
import Page from './Page';
import InputStyle from './InputStyle';
import SocialsButton from './SocialsButton';
// assets
import { ComingSoonIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5),
  },
}));

// ----------------------------------------------------------------------

export default function EmptyComponent() {
  const countdown = useCountdown(new Date('07/07/2022 21:30'));

  return (
    <Page alignItems="center" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
            Nothing to see here...
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>It looks empty here</Typography>

            <ComingSoonIllustration sx={{ my: 10, height: 240 }} />
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
