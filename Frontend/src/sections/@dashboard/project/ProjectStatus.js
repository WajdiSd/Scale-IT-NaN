// @mui
import { Box, Card, Stack, Button, Avatar, Tooltip, Typography, CardHeader, IconButton, CircularProgress } from '@mui/material';
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
  const { project, isPM, isLoading } = useProject();
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
      {
        !isLoading ? 
        (<>
        <CardHeader sx={{ textAlign: 'center' }} title={
          project?.status!=undefined ?
          `Status: ${project?.status}` : 'Status:'} /><Stack spacing={3} sx={{ p: 3 }}>

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
          </Stack></>)
         : 
        (
          <Box
          sx={{
            mt: 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={100} color="success" />
        </Box>
        )
      }
      
    </Card>
  );
}
