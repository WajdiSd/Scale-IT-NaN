import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// utils
// hooks
// components
import cssStyles from 'src/utils/cssStyles';
import MyAvatar from 'src/components/MyAvatar';
import Image from 'src/components/Image';
import useAuth from 'src/hooks/useAuth';
import useWorkspace from 'src/hooks/useWorkspace';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------


export default function WorkspaceCover() {
  const { user } = useAuth();
  const { workspace } = useWorkspace();


  const getHRName = () =>{
    workspace.assigned_members.map((member)=>{
      //member.isHR? 
    })
  }

  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{workspace?.name}</Typography>
          <Typography sx={{ opacity: 0.72 }}>By {user?.firstName} {user?.lastName}</Typography>
        </Box>
      </InfoStyle>
      <Image alt="profile cover" src="https://minimal-assets-api.vercel.app/assets/images/covers/cover_1.jpg" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
    </RootStyle>
  );
}
