import { paramCase } from 'change-case';
import { useEffect, useState, useRef } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  DialogTitle,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useParams } from 'react-router';

// hooks
import useTabs from 'src/hooks/useTabs';
import useSettings from 'src/hooks/useSettings';
import useTable, { getComparator, emptyRows } from 'src/hooks/useTable';
// _mock_
import { _userList } from 'src/_mock';
// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from 'src/components/table';
// sections
import { UserTableToolbar, UserTableRow } from './user';
import useProject from 'src/hooks/useProject';
import { DialogAnimate } from 'src/components/animate';

import InviteMembersToProjectForm from './InviteMembersToProjectForm';

import { useDispatch } from '../../../redux/store';
import { getFullMemberByProject, inviteMemberToProject, removeMembersFromProject, updateTeamLeader } from 'src/redux/slices/projectSlice';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';


// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'removed'];

const ROLE_OPTIONS = ['all', 'Project Manager', 'Team Leader', 'Member'];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'company', label: 'Company', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'isVerified', label: 'Verified', align: 'center' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch, themeMode } = useSettings();
  const {usersInProject, project} = useProject();
  const {user} = useAuth();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { projectid } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState(usersInProject);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [inviteMemberClicked, setInviteMemberClicked] = useState(false);

  const handleOpenInviteDialog = () => {
    setInviteMemberClicked(true);
    setIsOpenModal(true);
  }

  const handleCloseInviteDialog = () => {
    setInviteMemberClicked(false);
  }

  const handleInviteEvent = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };


  const onInviteMembers = async (members) => {
    const data = {
      idproject: projectid,
      idtl: user._id,
      members
    }
    dispatch(inviteMemberToProject(data)).then(() => {
      setReloadData(true);
      enqueueSnackbar('Invite members to project successfully', { variant: 'success' });
    });
  };


  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  let dataFiltered=null;
  let toastId = useRef(null);


  const notify = (text) => {
    toastId.current = 
    themeMode === 'dark'? toast(text, { autoClose: false, type: toast.TYPE.INFO })
    :
    toast.dark(text, { autoClose: false, type: toast.TYPE.INFO })
  }
  const update = (text) => toast.update(toastId.current, { render: text,type: toast.TYPE.SUCCESS, autoClose: 5000 });

  useEffect(() => {

    setReloadData(false)
    setTableData(usersInProject);
  }, [reloadData]);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    console.log('handleFilterRole');
    console.log(event.target.value);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const data = {
      userIds: [id],
      idproject: projectid,
      idtl: user._id,
    };
    try {
    notify("Removing member...")

      dispatch(removeMembersFromProject(data)).then(()=>{
      update("Member removed")
        setReloadData(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRows = (selected) => {
    //const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    //setSelected([]);
    //setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    //navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleAssignTeamLeader = (id) => {
    
    //:idproject/:idmember/:idpm
    /*if(themeMode === 'dark')
      toast("Assigning Team Leader...");
    else
      toast.dark("Wow so easy !");*/

    console.log(id);
    const data = {
      idproject: projectid,
      idpm: user._id,
      idmember: id,
    }

    notify("Assigning Team Leader...")
    dispatch(updateTeamLeader(data)).then((res)=>{
      update(res.payload.msg)
      //enqueueSnackbar(res.payload.msg)
      setReloadData(true);
    })
  };

  dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  return (
    <Page title={"Project: "+project?.name}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <DialogAnimate sx={{ minWidth: '50%' }} open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>{'Invite Members to project'}</DialogTitle>
        <InviteMembersToProjectForm onInviteMembers={onInviteMembers} onCancel={handleCloseModal}/>
      </DialogAnimate>
        <HeaderBreadcrumbs
          heading=""
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={handleOpenInviteDialog}
            >
              Invite members
            </Button>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab, index) => (
              <Tab disableRipple key={index} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
                    )
                  }
                />

                {!usersInProject ? (
                  <TableBody>
                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                ) : (
                  <TableBody>
                    {dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <UserTableRow
                        key={row?._id}
                        row={row}
                        selected={selected.includes(row?._id)}
                        onSelectRow={() => onSelectRow(row?._id)}
                        onDeleteRow={() => handleDeleteRow(row?._id)}
                        onEditRow={() => handleEditRow(row?._id)}
                        onAssignTeamLeader={() => handleAssignTeamLeader(row?._id)}
                      />
                    ))}

                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData?.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item) =>
        item.firstName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.lastName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    //tableData = tableData.filter((item) => item.status === filterStatus);
    if (filterStatus === 'removed') {
      tableData = tableData.filter((item) => {
        if (item.isDeleted) {
          return item;
        }
      });
    } else {
      tableData = tableData.filter((item) => {
        if (!item.isDeleted) {
          return item;
        }
      });
    }
  }

  if (filterRole !== 'all') {
    if (filterRole === 'Team Leader') {
      tableData = tableData.filter((item) => {
        console.log('item');
        if (item.isTeamLeader) {
          console.log(item);
          return item;
        }
      });
    } else if (filterRole === 'Project Manager') {
      tableData = tableData.filter((item) => {
        if (item.isProjectManager) {
          return item;
        }
      });
    } else {
      tableData = tableData.filter((item) => {
        if (!item.isTeamLeader && !item.isProjectManager) {
          return item;
        }
      });
    }
  }
  return tableData;
}
