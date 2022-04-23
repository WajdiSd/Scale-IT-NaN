// @mui
import { Box, Card, Stack, Button, Avatar, Tooltip, Typography, CardHeader, IconButton } from '@mui/material';
// _mock_

// components
import Iconify from '../../../components/Iconify';
import useProject from 'src/hooks/useProject';
import useAuth from 'src/hooks/useAuth';
import { abortproject, finishproject } from 'src/redux/slices/projectSlice';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
// ----------------------------------------------------------------------

export default function ProjectStatus() {
  const { project, isPM } = useProject();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { projectid } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const Handleabortproject = () => {
    console.log('abort project');
    console.log();
    const obj = {
      projectId: projectid,
      pmId: user._id,
    };
    console.log(obj);
    dispatch(abortproject(obj)).then(() => {
      enqueueSnackbar('updated project status');
    });
  };
  const Handlefinsihproject = () => {
    console.log('finish project');
    console.log();
    const obj = {
      projectId: projectid,
      pmId: user._id,
    };
    console.log(obj);
    dispatch(finishproject(obj)).then(() => {
      enqueueSnackbar('updated project status');
    });
  };

  return (
    <Card>
      <CardHeader sx={{ textAlign: 'center' }} title={ `Status: ${project?.status}`} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* {_bankingContacts.map((contact) => (
          <Stack direction="row" alignItems="center" key={contact.id}>
            <Avatar src={contact.avatar} sx={{ width: 48, height: 48 }} />
            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
                {contact.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {contact.email}
              </Typography>
            </Box>

            <Tooltip title="Quick Transfer">
              <IconButton size="small">
                <Iconify icon={'eva:flash-fill'} width={22} height={22} />
              </IconButton>
            </Tooltip>
          </Stack>
        ))} */}
        {isPM ? (
          <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ flexGrow: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={Handlefinsihproject}
              endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
            >
              Finished
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={Handleabortproject}
              endIcon={<Iconify icon={'eva:close-circle-fill'} />}
            >
              Aborted
            </Button>
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Card>
  );
}
