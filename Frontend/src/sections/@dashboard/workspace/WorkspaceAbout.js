import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack, Button, DialogTitle, CardActionArea } from '@mui/material';

// components
import Iconify from '../../../components/Iconify';
import useWorkspace from 'src/hooks/useWorkspace';
import { useEffect, useState } from 'react';
import moment from 'moment';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

WorkspaceAbout.propTypes = {
  profile: PropTypes.object,
};

export default function WorkspaceAbout({ profile }) {
  const { quote, country, email, role, company, school } = profile;
  const { workspace, usersInWorkspace } = useWorkspace();
  const [userHR, setUserHR] = useState(null);
  const [userManager, setUserManager] = useState(null);
  

  const getUsersManagerHR = () => {
    usersInWorkspace.map((member) => {
      if (member.isHR) {
        setUserHR(member);
      }
      if (member.isProjectManager) {
        setUserManager(member);
      }
    });
  };

  useEffect(() => {
    console.log(workspace?.createdAt);
    console.log('date');
    //console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(workspace?.createdAt));
    getUsersManagerHR();
  }, [usersInWorkspace]);
  return (
    <Card>
      <CardHeader title="About" />
   
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{workspace.description}</Typography>

        <Stack direction="row">
          <IconStyle icon={'eva:calendar-fill'} />
          <Typography variant="body2">
            Created on &nbsp;
            {moment(workspace.createdAt).format('L')}
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={'eva:calendar-fill'} />
          <Typography variant="body2">
            Last updated on &nbsp;
            {moment(workspace.updatedAt).format('L')}
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">HR: {userHR?.email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">Manager: {userManager?.email}</Typography>
        </Stack>
 
      </Stack>
    </Card>
  );
}
