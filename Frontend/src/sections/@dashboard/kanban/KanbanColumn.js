import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// @mui
import { Paper, Stack, Button } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { deleteColumn, updateColumn, addTask, deleteTask } from '../../../redux/slices/kanban';
// components
import Iconify from '../../../components/Iconify';
//
import KanbanAddTask from './KanbanTaskAdd';
import KanbanTaskCard from './KanbanTaskCard';
import KanbanColumnToolBar from './KanbanColumnToolBar';
import useProject from 'src/hooks/useProject';

// ----------------------------------------------------------------------

KanbanColumn.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number,
};

export default function KanbanColumn({ column, index }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { board } = useSelector((state) => state.kanban);
  const [open, setOpen] = useState(false);
  const {isTL } = useProject();

  
  const { name, cardIds, _id } = column;

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseAddTask = () => {
    setOpen(false);
  };

  const handleDeleteTask = (cardId) => {
    dispatch(deleteTask({ cardId, columnId: _id }));
  };

  const handleUpdateColumn = async (newName) => {
    try {
      if (newName !== name) {
        dispatch(updateColumn(_id, { ...column, name: newName }));
        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      dispatch(deleteColumn(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = (task) => {
    dispatch(addTask({ card: task, columnId: _id }));
    handleCloseAddTask();
  };

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, bgcolor: 'grey.5008' }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <KanbanColumnToolBar columnName={name} onDelete={handleDeleteColumn} onUpdate={handleUpdateColumn} />

            <Droppable droppableId={_id} type="task">
              {(provided) => (
                <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={2} width={280}>
                  {cardIds.map((cardId, index) => (
                    <KanbanTaskCard
                      key={cardId}
                      onDeleteTask={handleDeleteTask}
                      card={board?.cards[cardId]}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
            {
              isTL && <Stack spacing={2} sx={{ pb: 3 }}>
              {open && <KanbanAddTask onAddTask={handleAddTask} onCloseAddTask={handleCloseAddTask} />}

              <Button
                fullWidth
                size="large"
                color="inherit"
                startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                onClick={handleOpenAddTask}
                sx={{ fontSize: 14 }}
              >
                Add Task
              </Button>
            </Stack>
            }
            
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
