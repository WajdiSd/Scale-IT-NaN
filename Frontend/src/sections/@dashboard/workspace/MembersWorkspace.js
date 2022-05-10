import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Grid,
  Card,
  Link,
  Avatar,
  IconButton,
  Typography,
  InputAdornment,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
// components

import InputStyle from 'src/components/InputStyle';
import SocialsButton from 'src/components/SocialsButton';
import SearchNotFound from 'src/components/SearchNotFound';
import Iconify from 'src/components/Iconify';
import { useState } from 'react';
import MenuPopover from 'src/components/MenuPopover';
import useAuth from 'src/hooks/useAuth';
import useWorkspace from 'src/hooks/useWorkspace';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  AssignProjectManagerTomember,
  dischargeprojectmanager,
  removememberfromworkspace,
  AssignHR,
} from 'src/redux/slices/workspaceSlice';
import { useSnackbar } from 'notistack';
import { CalendarForm } from '../calendar';
import { DialogAnimate } from 'src/components/animate';
import SetRatesForm from './SetRatesForm';

// ----------------------------------------------------------------------

//ff
MembersWorkspace.propTypes = {
  members: PropTypes.array,
  findMembers: PropTypes.string,
  onFindMembers: PropTypes.func,
};

export default function MembersWorkspace({ members, findMembers, onFindMembers }) {
  const memberFiltered = applyFilter(members, findMembers);

  const isNotFound = memberFiltered.length === 0;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Members
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findMembers}
        onChange={(event) => onFindMembers(event.target.value)}
        placeholder="Find members..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={3}>
        {memberFiltered.map((member) => (
          <Grid key={member._id} item xs={12} md={4}>
            <MemberCard member={member} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findMembers} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.object,
};

function MemberCard({ member }) {
  const { gender, lastName, phone, email, avatarUrl, firstName, _id, isHR, isProjectManager } = member;
  const { user } = useAuth();

  return (
    <Card
      sx={{
        py: 5,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Avatar
        alt={firstName}
        src={'/images/avatars/avatar_13.jpg'}
        sx={{ width: 64, height: 64, mb: 3 }}
      />
      <Link variant="subtitle1" color="text.primary">
        {firstName} {lastName}
      </Link>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        {email}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        {isHR ? 'HR' : isProjectManager ? 'Project Manager' : 'Member'}
      </Typography>

      <SocialsButton initialColor />
      {
        user._id != _id?
        (
          <MoreMenuButton id={_id} isPM={isProjectManager} isHumRes={isHR} />
        )
        :
        (<></>)
      }
    </Card>
  );
}
// ----------------------------------------------------------------------

function applyFilter(array, query) {
  if (query) {
    return array.filter((member) => member.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return array;
}

// ----------------------------------------------------------------------

function MoreMenuButton({ id, isPM, isHumRes }) {
  const { isHr } = useAuth();
  const { idHR } = useAuth();
  const { workspace } = useWorkspace();
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDia, setOpenDia] = useState(false);
  const [openAssDia, setOpenAssDia] = useState(false);
  const [openAssHRDia, setOpenAssHRDia] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openDisDia, setOpenDisDia] = useState(false);

  const deletemember = () => {
    try {
      const obj = {
        idmember: id,
        idhr: idHR,
        idworkspace: workspace._id,
      };
      dispatch(removememberfromworkspace(obj)).then((res) => {
        enqueueSnackbar('Deleted member successfully');
      });
    } catch (error) {
    }
  };

  const AssignProjectManager = () => {
    try {
      const obj = {
        idmember: id,
        idHR: idHR,
        idworkspace: workspace._id,
      };
      dispatch(AssignProjectManagerTomember(obj)).then((res) => {
        enqueueSnackbar('Assign Project Manager successfully');
        window.location.reload();
      });
    } catch (error) {
    }
  };

  const AssignHRMember = () => {
    try {
      const obj = {
        idmember: id,
        idHR: idHR,
        idworkspace: workspace._id,
      };
      handleCloseAssHRDialogue();
      dispatch(AssignHR(obj)).then((res) => {
        enqueueSnackbar('Assigned HR successfully');

      });
    } catch (error) {
    }
  };

  const DischargeProjectManager = () => {
    try {
      const obj = {
        idmember: id,
        idHR: idHR,
        idworkspace: workspace._id,
      };
      dispatch(dischargeprojectmanager(obj)).then((res) => {
        enqueueSnackbar('Discharge Project Manager successfully');
        window.location.reload();
      });
    } catch (error) {
    }
  };

  const handleCloseDisDialogue = () => {
    setOpenDisDia(false);
  };

  const handleClickDisOpen = () => {
    setOpenDisDia(true);
  };
  const handleAddEvent = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleCloseDialogue = () => {
    setOpenDia(false);
  };

  const handleClickOpen = () => {
    setOpenDia(true);
  };

  const handleCloseAssDialogue = () => {
    setOpenAssDia(false);
  };

  const handleClickAssOpen = () => {
    setOpenAssDia(true);
  };

  const handleCloseAssHRDialogue = () => {
    setOpenAssHRDia(false);
  };

  const handleClickAssHROpen = () => {
    setOpenAssHRDia(true);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton sx={{ top: 8, right: 8, position: 'absolute' }} onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >

        {isHr ? (
          !isPM ? (
            <>
            <MenuItem onClick={handleClickAssOpen}>
              <Iconify icon={'entypo:add-user'} sx={{ ...ICON }} />
              Assign PM
            </MenuItem>
            <MenuItem onClick={()=>{ handleClose(); handleClickAssHROpen();}}>
              <Iconify icon={'entypo:add-user'} sx={{ ...ICON }} />
              Assign HR
            </MenuItem>
            </>
          ) : !isHumRes ? (
            <MenuItem onClick={handleClickDisOpen}>
              <Iconify icon={'entypo:remove-user'} sx={{ ...ICON }} />
              Remove PM
            </MenuItem>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}

        {isHr && (
          <MenuItem onClick={handleAddEvent}>
            <Iconify icon={'ph:currency-circle-dollar-fill'} sx={{ ...ICON }} />
            Set Rates
          </MenuItem>
        )}
        <Divider sx={{ borderStyle: 'dashed' }} />
        {isHr && (
          <MenuItem onClick={handleClickOpen} sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
            Delete
          </MenuItem>
        )}
      </MenuPopover>
      <Dialog
        open={openDia}
        onClose={handleCloseDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this member ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">this member will be permanetly deleted</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogue}>Disagree</Button>
          <Button onClick={deletemember} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAssDia}
        onClose={handleCloseAssDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to assign this member as PM ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Assign this member as a Project Member</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssDialogue}>Cancel</Button>
          <Button onClick={AssignProjectManager} autoFocus>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog
        open={openDisDia}
        onClose={handleCloseDisDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to discharge this PM ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Discharge this Project Manager </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisDialogue}>Cancel</Button>
          <Button onClick={DischargeProjectManager} autoFocus>
            Discharge
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAssHRDia}
        onClose={handleCloseAssHRDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to assign this member as HR ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You will be a regular member</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssHRDialogue}>Cancel</Button>
          <Button onClick={AssignHRMember} autoFocus>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
      <DialogAnimate sx={{ minWidth: '50%' }} open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>{'Set Rates'}</DialogTitle>

        <SetRatesForm id={String(id)} event={{}} range={{}} onCancel={handleCloseModal} />
      </DialogAnimate>
    </>
  );
}
