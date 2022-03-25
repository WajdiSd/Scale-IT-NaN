import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// @mui
import { useTheme } from '@mui/material/styles';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import { BlogPostCard } from 'src/sections/@dashboard/blog';
import { SkeletonPostItem } from 'src/components/skeleton';
import WorkspaceCard from 'src/sections/@dashboard/workspace/WorkspaceCard';
import { useDispatch } from 'react-redux';
import { getWorkspaces } from 'src/redux/slices/workspaceSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import useWorkspace from 'src/hooks/useWorkspace';
import { MotionInView, varFade } from 'src/components/animate';
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from 'src/components/hook-form';
import {
  Grid,
  Card,
  CardHeader,
  Container,
  Chip,
  Stack,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { addWorkspace } from 'src/redux/slices/workspaceSlice';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function AddWorkspace() {
  const { user } = useAuth();
  const { workspaces, isLoading } = useWorkspace();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [userJoinedspaces, setUserJoinedspaces] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewWorkspaceSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = {
    name: '',
    description: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewWorkspaceSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      console.log('data', data);
      
      let workspaceData = {
        data: data,
        userId: user._id,
      }
      dispatch(addWorkspace(workspaceData))
      .then(res=>{
        enqueueSnackbar("Added workspace successfully");
        navigate(PATH_DASHBOARD.general.landing);
      });
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // handleClosePreview();
      // enqueueSnackbar('Post success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <HeaderBreadcrumbs
          heading="Workspace"
          links={[
            { name: 'Workspace', href: PATH_DASHBOARD.general.landing },
            { name: 'new' },
          ]}
        />
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user?.firstName} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>
        </Grid>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <LabelStyle>Add New Workspace </LabelStyle>
                  </div>
                  <RHFTextField name="name" label="Workspace Name" />

                  <RHFTextField name="description" label="Description" multiline rows={3} />
                  <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isLoading}>
                    Create
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
        {/* <CardHeader title="Workspaces that you manage" subheader="" />
          <Grid container spacing={3} mt={3}>
          {userWorkspaces ? userWorkspaces.map((workspace, index) =>
            workspace ? (
              <Grid key={workspace._id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <MotionInView key={workspace._id} variants={varFade().inDown}>
                  <WorkspaceCard workspace={workspace} index={index} />
                </MotionInView>
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          ): null}
        </Grid> */}

        {/* <CardHeader title="Workspaces that you joined" subheader="" />
          <Grid container spacing={3} >
          {userJoinedspaces ? userJoinedspaces.map((workspace, index) =>
            workspace ? (
              <Grid key={workspace._id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <WorkspaceCard workspace={workspace} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          ): null}
        </Grid> */}
      </Container>
    </Page>
  );
}
