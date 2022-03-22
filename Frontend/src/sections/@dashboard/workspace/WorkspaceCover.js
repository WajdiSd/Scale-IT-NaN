import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, DialogTitle, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// utils
// hooks
// components
import cssStyles from 'src/utils/cssStyles';
import MyAvatar from 'src/components/MyAvatar';
import Image from 'src/components/Image';
import useAuth from 'src/hooks/useAuth';
import useWorkspace from 'src/hooks/useWorkspace';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DialogAnimate } from 'src/components/animate';
import WorkspaceForm from './WorkspaceForm';

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
  const { workspace, usersInWorkspace } = useWorkspace();
  const [hRName, setHRName] = useState('');
  const { id } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editIsShown, setEditIsShown] = useState(false);

  const handleAddEvent = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const getHRName = () => {
    usersInWorkspace.map((member) => {
      if (member.isHR) {
        setHRName(member.firstName + ' ' + member.lastName);
      }
    });
  };

  useEffect(() => {
    getHRName();
  }, [usersInWorkspace]);

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
          <Typography variant="h4"
          onMouseEnter={() => setEditIsShown(true)}
          onMouseLeave={() => setEditIsShown(false)}
          >
            {workspace?.name}
            {editIsShown && (
              <EditIcon
                sx={{ width: { xs: 15, md: 20 }, marginLeft: 1 }}
                onClick={handleAddEvent}
                
              />
            )}
          </Typography>
          <Typography sx={{ opacity: 0.72 }}>By {hRName}</Typography>
        </Box>
      </InfoStyle>
      <Image
        alt="profile cover"
        src="https://minimal-assets-api.vercel.app/assets/images/covers/cover_1.jpg"
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <DialogAnimate sx={{ minWidth: '50%' }} open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>{'Update your Workspace'}</DialogTitle>

        <WorkspaceForm
          event={{}}
          range={[]}
          name={workspace.name}
          description={workspace.description}
          onCancel={handleCloseModal}
        />
      </DialogAnimate>
    </RootStyle>
  );
}
