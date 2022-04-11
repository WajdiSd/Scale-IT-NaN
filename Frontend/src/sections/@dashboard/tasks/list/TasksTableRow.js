import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem, AvatarGroup, Box, Tooltip } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useAuth from 'src/hooks/useAuth';
import useProject from 'src/hooks/useProject';
import moment from 'moment'

// ----------------------------------------------------------------------

TasksTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function TasksTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();
  const {user} = useAuth();
  const {usersInProject} = useProject();

  const { name, description, startDate, expectedEndDate, status, endDate, priority, members } = row;
  const [membersInTask, setMembersInTask] = useState([]);

  useEffect(() => {
    members.map((memberinTask)=>{
      usersInProject.map((memberInfo)=>{
        if (memberinTask.memberId == memberInfo._id){
          let member = {...memberinTask, fullName: memberInfo.firstName+' '+memberInfo.lastName};
          setMembersInTask((oldArray) => [...oldArray, member]);
        }
      })
    })
  }, []);

  
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={user.firstName} color={createAvatar(user.firstName).color} sx={{ mr: 2 }}>
          {createAvatar(user.firstName).name}
        </Avatar>

        <Stack>
          <Typography variant="subtitle2" noWrap>
          {name}
          
          </Typography>

          <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
          {user.firstName} {user.lastName}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{moment(startDate).zone('-0100').format('YYYY-MM-DD')}</TableCell>

      <TableCell align="left">{moment(expectedEndDate).zone('-0100').format('YYYY-MM-DD')}</TableCell>

      <TableCell align="center">
          <AvatarGroup max={2} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
            {membersInTask.map((person) => (
              <Tooltip title={person.fullName} placement="top">
                <Avatar key={person._id} alt={person.fullName} color={createAvatar(person.fullName).color} sx={{ mr: 2 }}>
                  {createAvatar(person.fullName).name}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
      </TableCell>

      <TableCell align="center" sx={{ display: 'flex' , mx: 1, my: 0.5, borderRadius: 1 }}>
      <Box
        sx={{
        mr: 1,
        width: 14,
        height: 14,
        borderRadius: 0.5,
        bgcolor: 'error.main',
        ...(priority === 'Low' && { bgcolor: 'info.main' }),
        ...(priority === 'Medium' && { bgcolor: 'warning.main' }),
                      }}
      />
      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
        {priority}
      </Typography>
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'to_do' && 'success') ||
            (status === 'done' && 'success') ||
            (status === 'review' && 'warning') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                View
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
