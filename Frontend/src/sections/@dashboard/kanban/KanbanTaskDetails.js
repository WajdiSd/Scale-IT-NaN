import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
// @mui
import { MobileDateRangePicker } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Drawer,
  Button,
  Avatar,
  Tooltip,
  Divider,
  MenuItem,
  TextField,
  Typography,
  OutlinedInput,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { IconButtonAnimate } from '../../../components/animate';
//
import KanbanTaskCommentList from './KanbanTaskCommentList';
import KanbanTaskAttachments from './KanbanTaskAttachments';
import KanbanTaskCommentInput from './KanbanTaskCommentInput';
import { useDatePicker, DisplayTime } from './KanbanTaskAdd';
import useProject from 'src/hooks/useProject';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { removeMembersFromTask } from 'src/redux/slices/tasksSlice';
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

const PRIORITIZES = ['low', 'medium', 'hight'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  width: 140,
  fontSize: 13,
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

KanbanTaskDetails.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  card: PropTypes.object,
  onDeleteTask: PropTypes.func,
};

export default function KanbanTaskDetails({ card, isOpen, onClose, onDeleteTask }) {
  const isDesktop = useResponsive('up', 'sm');
  const { id, projectid } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [taskCompleted, setTaskCompleted] = useState(card.completed);
  const [prioritize, setPrioritize] = useState('low');
  const { usersInProject, isTL } = useProject();
  const [membersInTask, setMembersInTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [userid, setUserid] = useState('');
  console.log(card);
  const { name, description, startDate, expectedEndDate, members, attachments, priority, _id } = card;
  useEffect(() => {
    members.map((memberinTask) => {
      usersInProject.map((memberInfo) => {
        if (memberinTask.memberId == memberInfo._id) {
          let member = { ...memberinTask, fullName: memberInfo.firstName + ' ' + memberInfo.lastName };
          setMembersInTask((oldArray) => [...oldArray, member]);
        }
      });
    });
  }, []);
  const {
    dueDate,
    startTime,
    endTime,
    isSameDays,
    isSameMonths,
    onChangeDueDate,
    openPicker,
    onOpenPicker,
    onClosePicker,
  } = useDatePicker({
    date: [startDate, expectedEndDate],
  });

  const handleClickOpen = (userid) => {
    setOpen(true);
    setUserid(userid);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removemembersfromtask = (id) => {
    const data = {
      memberIds: [id],
      projectId: projectid,
      idtask: _id,
      idtl: user._id,
    };
    dispatch(removeMembersFromTask(data));
  };
  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleToggleCompleted = () => {
    setTaskCompleted((prev) => !prev);
  };

  const handleChangePrioritize = (event) => {
    setPrioritize(event.target.value);
  };

  return (
    <>
      <Drawer open={isOpen} onClose={onClose} anchor="right" PaperProps={{ sx: { width: { xs: 1, sm: 480 } } }}>
        <Stack p={2.5} direction="row" alignItems="center">
          {!isDesktop && (
            <>
              <Tooltip title="Back">
                <IconButtonAnimate onClick={onClose} sx={{ mr: 1 }}>
                  <Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />
                </IconButtonAnimate>
              </Tooltip>
            </>
          )}

          <Button
            size="small"
            variant="outlined"
            color={taskCompleted ? 'primary' : 'inherit'}
            startIcon={!taskCompleted && <Iconify icon={'eva:checkmark-fill'} width={16} height={16} />}
            onClick={handleToggleCompleted}
          >
            {taskCompleted ? 'Complete' : 'Mark complete'}
          </Button>

          <Stack direction="row" spacing={1} justifyContent="flex-end" flexGrow={1}>
            <Tooltip title="Like this">
              <IconButtonAnimate size="small">
                <Iconify icon={'ic:round-thumb-up'} width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>

            <>
              <Tooltip title="Attachment">
                <IconButtonAnimate size="small" onClick={handleAttach}>
                  <Iconify icon={'eva:attach-2-fill'} width={20} height={20} />
                </IconButtonAnimate>
              </Tooltip>
              <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
            </>

            <Tooltip title="Delete task">
              <IconButtonAnimate onClick={onDeleteTask} size="small">
                <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>

            <Tooltip title="More actions">
              <IconButtonAnimate size="small">
                <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ px: 2.5, py: 3 }}>
            <OutlinedInput
              fullWidth
              multiline
              size="small"
              placeholder="Task name"
              value={name}
              sx={{
                typography: 'h6',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              }}
            />
            <Stack direction="row">
              <LabelStyle sx={{ mt: 1.5 }}>Assignee</LabelStyle>
              <Stack direction="row" flexWrap="wrap" alignItems="center">
                {isTL ? (
                  <>
                    {membersInTask.map((user) => (
                      <Badge
                        badgeContent="x"
                        color="error"
                        overlap="circular"
                        // onClick={() => removemembersfromtask(user.memberId)}
                        onClick={() => handleClickOpen(user.memberId)}
                      >
                        {/* <MailIcon color="action" /> */}
                        <Avatar
                          key={user.memberId}
                          alt={user.firstName}
                          src={user.firstName}
                          sx={{ m: 0.5, width: 36, height: 36 }}
                        />
                      </Badge>
                    ))}
                  </>
                ) : (
                  <>
                    {membersInTask.map((user) => (
                      <Avatar
                        key={user.memberId}
                        alt={user.firstName}
                        src={user.firstName}
                        sx={{ m: 0.5, width: 36, height: 36 }}
                      />
                    ))}
                  </>
                )}

                <Tooltip title="Add assignee">
                  <IconButtonAnimate sx={{ p: 1, ml: 0.5, border: (theme) => `dashed 1px ${theme.palette.divider}` }}>
                    <Iconify icon={'eva:plus-fill'} width={20} height={20} />
                  </IconButtonAnimate>
                </Tooltip>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
              <LabelStyle> Due date</LabelStyle>
              <>
                {startTime && endTime ? (
                  <DisplayTime
                    startTime={startTime}
                    endTime={endTime}
                    isSameDays={isSameDays}
                    isSameMonths={isSameMonths}
                    onOpenPicker={onOpenPicker}
                    sx={{ typography: 'body2' }}
                  />
                ) : (
                  <Tooltip title="Add assignee">
                    <IconButtonAnimate
                      onClick={onOpenPicker}
                      sx={{
                        p: 1,
                        ml: 0.5,
                        border: (theme) => `dashed 1px ${theme.palette.divider}`,
                      }}
                    >
                      <Iconify icon={'eva:plus-fill'} width={20} height={20} />
                    </IconButtonAnimate>
                  </Tooltip>
                )}

                <MobileDateRangePicker
                  open={openPicker}
                  onClose={onClosePicker}
                  onOpen={onOpenPicker}
                  value={dueDate}
                  onChange={onChangeDueDate}
                  renderInput={() => {}}
                />
              </>
            </Stack>

            <Stack direction="row" alignItems="center">
              <LabelStyle>Priority</LabelStyle>
              <TextField
                fullWidth
                select
                size="small"
                value={priority}
                onChange={handleChangePrioritize}
                sx={{
                  '& svg': { display: 'none' },
                  '& fieldset': { display: 'none' },
                  '& .MuiSelect-select': { p: 0, display: 'flex', alignItems: 'center' },
                }}
              >
                {PRIORITIZES.map((option) => (
                  <MenuItem key={option} value={option} sx={{ mx: 1, my: 0.5, borderRadius: 1 }}>
                    <Box
                      sx={{
                        mr: 1,
                        width: 14,
                        height: 14,
                        borderRadius: 0.5,
                        bgcolor: 'error.main',
                        ...(option === 'low' && { bgcolor: 'info.main' }),
                        ...(option === 'medium' && { bgcolor: 'warning.main' }),
                      }}
                    />
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {option}
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack direction="row">
              <LabelStyle sx={{ mt: 2 }}>Description</LabelStyle>
              <OutlinedInput
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Task name"
                value={description}
                sx={{ typography: 'body2' }}
              />
            </Stack>

            <Stack direction="row">
              <LabelStyle sx={{ mt: 2 }}>Attachments</LabelStyle>
              <Stack direction="row" flexWrap="wrap">
                {/*<KanbanTaskAttachments attachments={attachments} />*/}
              </Stack>
            </Stack>
          </Stack>

          {/*comments.length > 0 && <KanbanTaskCommentList comments={comments} />*/}
        </Scrollbar>

        <Divider />

        {/* <KanbanTaskCommentInput /> */}
      </Drawer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Remove this member from this task ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this member from this task permanently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => removemembersfromtask(userid)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
