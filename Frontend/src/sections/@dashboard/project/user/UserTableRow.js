import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useProject from 'src/hooks/useProject';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onAssignTeamLeader: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onAssignTeamLeader }) {
  const theme = useTheme();
  const { company, role, isVerified, isTeamLeader, isDeleted, isProjectManager, status, phone, updatedAt, lastName, firstName, isValidated, gender, email } = row;
  const {isTL, isPM} = useProject();

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleAssignTeamLeader = () => {
    
  };
  

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={firstName+' '+lastName} src={'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_13.jpg'} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {firstName+' '+lastName}
        </Typography>
      </TableCell>

      <TableCell align="left">{company}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
       {
         isTeamLeader?
         ('Team Leader')
         :
         (isProjectManager?
          ('Project Manager')
          :
          ('Member')
          )
       }
      </TableCell>

      <TableCell align="center">
        <Iconify
          //icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          icon='eva:checkmark-circle-fill'
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
          }}
        />
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={ isDeleted? 'error' : 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          { isDeleted?
           'removed' : 'active'}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
            {isTL?
            ( 
              isProjectManager?
              (<></>)
              :
              (
                <>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                onDeleteRow();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon={'eva:trash-2-outline'} />
              Delete
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
              )
            )
            :
            (isPM?
              (
                !isProjectManager && !isTeamLeader?
                (<MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    onAssignTeamLeader();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  Make Team Leader
                </MenuItem>)
                :
                (<></>)
                
              )
              :
              (<></>)
            )
            }
             <MenuItem
              onClick={() => {
                handleCloseMenu();
                
              }}
            >
              <Iconify icon={'ant-design:eye-filled'} />
              View profile
            </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
