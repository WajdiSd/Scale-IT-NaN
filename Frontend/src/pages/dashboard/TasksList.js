import sumBy from 'lodash/sumBy';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import moment from 'moment'
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
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
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
import { _invoices } from '../../_mock/_invoice';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
// sections
import TasksAnalytic from '../../sections/@dashboard/tasks/TasksAnalytic';
import { TasksTableRow, TasksTableToolbar } from '../../sections/@dashboard/tasks/list';
import { DialogAnimate } from 'src/components/animate';
import AddTaskForm from 'src/sections/@dashboard/tasks/AddTaskForm';
import { useDispatch } from 'react-redux';
import { addTask, deleteTask, getUserTasks } from 'src/redux/slices/tasksSlice';
import useAuth from 'src/hooks/useAuth';
import useTask from 'src/hooks/useTask';
import useProject from 'src/hooks/useProject';
import useWorkspace from 'src/hooks/useWorkspace';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------


const PRIORITY_OPTIONS = [
  'all',
  'Low',
  'Medium',
  'High',
];

const TABLE_HEAD = [
  { id: 'task', label: 'Task', align: 'left' },
  { id: 'createDate', label: 'Create', align: 'left' },
  { id: 'expectedDueDate', label: 'Due', align: 'left' },
  { id: 'assignees', label: 'Assignees', align: 'center', width: 140 },
  { id: 'priority', label: 'Priority', align: 'center', width: 140 },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function TasksList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useAuth();
  const { memberTasks } = useTask();
  const {id, projectid} = useParams();
  const { project } = useProject();
  const { workspace } = useWorkspace();

  const { enqueueSnackbar } = useSnackbar();


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
  } = useTable({ defaultOrderBy: 'createDate' });


  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [refreshTasks, setRefreshTasks] = useState(false);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  useEffect(() => {

    const data = {
      memberId: user._id,
      projectId: projectid,
    }
    dispatch(getUserTasks(data))
  }, [refreshTasks]);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const onFilterPriority = (event) => {
    console.log(event.target.value);
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const teamLeadId = user._id;
    const projectId = projectid;
    dispatch(deleteTask({teamLeadId: teamLeadId, projectId: projectId, taskId: id}));
    //const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    //setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleAddTask = (data) => {
    dispatch(addTask(data))
        .then(res=>{
          if(!res.error)
            {
              enqueueSnackbar("Successfully added task")
              setRefreshTasks(true)
            }
          else
            enqueueSnackbar("unable to add task",{
              variant: 'error',
            })
      });
  }

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const dataFiltered = applySortFilter({
    memberTasks,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const denseHeight = dense ? 56 : 76;

  const isNotFound =
    (!dataFiltered?.length && !!filterName) ||
    (!dataFiltered?.length && !!filterStatus) ||
    (!dataFiltered?.length && !!filterService) ||
    (!dataFiltered?.length && !!filterEndDate) ||
    (!dataFiltered?.length && !!filterStartDate);

  const getLengthByStatus = (status) => {
    
    return memberTasks?.filter((item) => 
    item.status === status).length;
  }

  const getTotalPriceByStatus = (status) =>
    sumBy(
      memberTasks?.filter((item) => item.status === status),
      'totalPrice'
    );

  const getPercentByStatus = (status) => (getLengthByStatus(status) / memberTasks?.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: memberTasks.length },
    { value: 'to_do', label: 'To Do', color: 'success', count: getLengthByStatus('to_do') },
    { value: 'doing', label: 'Doing', color: 'default', count: getLengthByStatus('doing') },
    { value: 'done', label: 'Done', color: 'success', count: getLengthByStatus('done') },
    { value: 'review', label: 'Review', color: 'default', count: getLengthByStatus('review') },
  ];
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleAddEvent = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <Page title="Invoice: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      
        <HeaderBreadcrumbs
          key={project?.name}
          heading="Tasks"
          links={[
            { key: 0, name: 'Workspace', href: PATH_DASHBOARD.general.landing },
            { key: 1, name: workspace?.name, href: `${PATH_DASHBOARD.workspaces.details}${id}` },
            { key: 2, name: 'Project', href: '' },
            { key: 3, name: project?.name, href: `${PATH_DASHBOARD.workspaces.details}${id}/project/${projectid}`, },
            { key: 4, name: 'Tasks', href: '' },

          ]}
          action={
            <Button
              variant="contained"
              onClick={handleAddEvent}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Task
            </Button>
          }
        />
      <DialogAnimate sx={{ minWidth: '50%' }} open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>{'Add Task'}</DialogTitle>
        <AddTaskForm onCancel={handleCloseModal} handleAddTask={handleAddTask} />
      </DialogAnimate>
        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <TasksAnalytic
                title="All"
                total={memberTasks?.length}
                percent={100}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <TasksAnalytic
                title="To Do"
                total={getLengthByStatus('to_do')}
                percent={getPercentByStatus('to_do')}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
              />
              <TasksAnalytic
                title="Doing"
                total={getLengthByStatus('doing')}
                percent={getPercentByStatus('doing')}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <TasksAnalytic
                title="Done"
                total={getLengthByStatus('done')}
                percent={getPercentByStatus('done')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
                
              />
              <TasksAnalytic
                title="Review"
                total={getLengthByStatus('review')}
                percent={getPercentByStatus('review')}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
                
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div> <Label color={tab.color}> {tab.count} </Label>
                  </Stack>
                }
              />
            ))}
          </Tabs>

          <Divider />

          <TasksTableToolbar
            filterName={filterName}
            filterService={filterService}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onFilterPriority={onFilterPriority}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
            optionsPriority={PRIORITY_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={memberTasks?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      memberTasks?.map((row) => row.id)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Sent">
                        <IconButton color="primary">
                          <Iconify icon={'ic:round-send'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download">
                        <IconButton color="primary">
                          <Iconify icon={'eva:download-outline'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Print">
                        <IconButton color="primary">
                          <Iconify icon={'eva:printer-fill'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={memberTasks?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      memberTasks?.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TasksTableRow
                      key={row._id}
                      row={row}
                      selected={selected.includes(row._id)}
                      onSelectRow={() => onSelectRow(row._id)}
                      onViewRow={() => handleViewRow(row._id)}
                      onEditRow={() => handleEditRow(row._id)}
                      onDeleteRow={() => handleDeleteRow(row._id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, memberTasks?.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered?.length}
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

function applySortFilter({
  memberTasks,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}) {
  const stabilizedThis = memberTasks?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  memberTasks = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    memberTasks = memberTasks.filter(
      (item) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    memberTasks = memberTasks.filter((item) => item.status === filterStatus);
  }

  if (filterService !== 'all') {
    memberTasks = memberTasks.filter((item) => item.priority === filterService);
  }

  if (filterStartDate && filterEndDate) {
    console.log(memberTasks);
    
    memberTasks = memberTasks.filter(
      
      (item) =>{
        
        if(moment(item.startDate,'YYYY-MM-DD').isSameOrAfter(moment(filterStartDate,'YYYY-MM-DD'), 'day'
        ) && moment(item.expectedEndDate,'YYYY-MM-DD').isSameOrBefore(moment(filterEndDate,'YYYY-MM-DD'), 'day')
        ){
          console.log(item);
          console.log(moment(item.expectedEndDate,'YYYY-MM-DD').isSameOrBefore(moment(filterEndDate,'YYYY-MM-DD'), 'day'))
          return item ;  
        }
      }   
    );
  }
  return memberTasks;
}
