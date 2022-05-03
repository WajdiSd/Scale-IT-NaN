import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Rating, CardHeader, Typography, Stack, Divider } from '@mui/material';
// utils
import { fCurrency, fShortenNumber } from 'src/utils/formatNumber';
// _mock_
import { _appRelated } from 'src/_mock';
// components
import Label from 'src/components/Label';
import Image from 'src/components/Image';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import Logo from 'src/components/Logo';
import styled from '@emotion/styled';

// ----------------------------------------------------------------------

export default function AppTopRelated({msgContent}) {
  msgContent = msgContent.map((mes) => {
    for (const [key, value] of Object.entries(mes)) {
     //if(key.includes("id")) 
     //delete mes[key];
    }
    return mes
    ;
  })
  console.log(msgContent);
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 320,
    minWidth: 290,
    backgroundColor: theme.palette.background.neutral,

  }));
  return (
    <ContentStyle>
      <CardHeader title={msgContent.title? msgContent.title: ""} />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {msgContent.map((mes) => (
            <>
            <ApplicationItem key={msgContent.id} msgContent={mes} />
            <Divider sx={{ borderStyle: 'dashed' }} />
            </>
          ))}
        </Stack>
      </Scrollbar>
    </ContentStyle>
  );
}

// ----------------------------------------------------------------------


function ApplicationItem({ msgContent }) {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral',
        }}
      >
        <Logo />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160 }}>
        <Typography variant="subtitle2">{msgContent.name}</Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
          
          <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
            Status
          </Typography>
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={msgContent.status === 'finished' |  'done'? 'success' : 'error'}
          >
            {msgContent.status}
          </Label>
        </Stack>
        {
        msgContent.priority?
        (<Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
        <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
            Priority
          </Typography>
            <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={msgContent.priority === 'Low'? 'success' : 'error'}
          >
            {msgContent.priority}
          </Label>
          
        </Stack> ):
        
        (<></>)
        }

      </Box>

    </Stack>
  );
}
