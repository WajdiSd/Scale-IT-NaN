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
import useAuth from 'src/hooks/useAuth';
import useWorkspace from 'src/hooks/useWorkspace';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onAssignTeamLeader: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onRestoreRow,onAssignTeamLeader, onAssignProjectManager }) {
  const theme = useTheme();
  const {user} = useAuth();
  const {workspace} = useWorkspace();

  const { _id, company, role, isVerified, isTeamLeader, isDeleted, isProjectManager, status, phone, updatedAt, lastName, firstName, isValidated, gender, email } = row;
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
        <Checkbox checked={selected} onClick={onSelectRow} disabled={_id == user._id}/> 
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={firstName+' '+lastName} src={'/images/avatars/avatar_13.jpg'} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {firstName+' '+lastName}
        </Typography>
      </TableCell>

      <TableCell align="left">{workspace?.name}</TableCell>

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

        {
          _id == user._id?
          (<></>)
          :
          (
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
                      {isDeleted?
                        (
                          <MenuItem
                            onClick={() => {
                              handleCloseMenu();
                              onRestoreRow();
                            }}
                            sx={{ color: 'success.main' }}
                          >
                            <Iconify icon={'ant-design:undo-outlined'} />
                            Restore
                          </MenuItem>
                        )
                        :
                        (
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
                        )
                      }
                  </>
                    )
                  )
                  :
                  (isPM?
                    (
                      !isProjectManager && !isTeamLeader && !isDeleted?
                      (<>
                      <MenuItem
                        onClick={() => {
                          handleCloseMenu();
                          onAssignTeamLeader();
                        }}
                      >
                        <Iconify icon={'eva:edit-fill'} />
                        Make Team Leader
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleCloseMenu();
                          onAssignProjectManager();
                        }}
                      >
                        <Iconify icon={'eva:edit-fill'} />
                        Make Project Manager
                      </MenuItem>
                      </>)
                      :
                      (<></>)
                      
                    )
                    :
                    (<></>)
                  )
                  }
                  </>
                }
              />
            </TableCell>
          )
        }
      
    </TableRow>
  );
}
