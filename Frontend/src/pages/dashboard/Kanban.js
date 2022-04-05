import { useEffect } from 'react';
// @mui
import { Container, Stack } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBoard, persistColumn, persistCard } from '../../redux/slices/kanban';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonKanbanColumn } from '../../components/skeleton';
// sections
import { KanbanColumn, KanbanColumnAdd } from '../../sections/@dashboard/kanban';
import useAuth from 'src/hooks/useAuth';
import useTask from 'src/hooks/useTask';
import { useNavigate, useParams } from 'react-router';
import useProject from 'src/hooks/useProject';
import useWorkspace from 'src/hooks/useWorkspace';

// ----------------------------------------------------------------------

export default function Kanban() {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.kanban);

  const navigate = useNavigate();


  const { user } = useAuth();
  const { memberTasks } = useTask();
  const {id, projectid} = useParams();
  const { project } = useProject();
  const { workspace } = useWorkspace();

  useEffect(() => {
    dispatch(getBoard(projectid));
  }, [dispatch]);

  const onDragEnd = (result) => {
    // Reorder card
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch(persistColumn(newColumnOrder));
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start._id === finish._id) {
      const updatedCardIds = [...start.cardIds];
      updatedCardIds.splice(source.index, 1);
      updatedCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };

      dispatch(
        persistCard({
          ...board.columns,
          [updatedColumn._id]: updatedColumn,
        })
      );
      return;
    }

    const startCardIds = [...start.cardIds];
    startCardIds.splice(source.index, 1);
    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];
    finishCardIds.splice(destination.index, 0, draggableId);
    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    dispatch(
      persistCard({
        ...board.columns,
        [updatedStart._id]: updatedStart,
        [updatedFinish._id]: updatedFinish,
      })
    );
  };

  return (
    <Page title="Kanban" sx={{ height: 1 }}>
      <Container maxWidth={false} sx={{ height: 1 }}>
      <HeaderBreadcrumbs
          key={project?.name}
          heading="Kanban"
          links={[
            { key: 0, name: 'Workspace', href: PATH_DASHBOARD.general.landing },
            { key: 1, name: workspace?.name, href: `${PATH_DASHBOARD.workspaces.details}${id}` },
            { key: 2, name: 'Project', href: '' },
            { key: 3, name: project?.name, href: `${PATH_DASHBOARD.workspaces.details}${id}/project/${projectid}`, },
            { key: 4, name: 'Kanban', href: '' },

          ]}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                direction="row"
                alignItems="flex-start"
                spacing={3}
                sx={{ height: 'calc(100% - 32px)', overflowY: 'hidden' }}
              >
                {!board?.columnOrder?.length ? (
                  <SkeletonKanbanColumn />
                ) : (
                  board.columnOrder.map((columnId, index) => (

                    <KanbanColumn index={index} key={columnId} column={board.columns[columnId]} />
                  ))
                )}

                {provided.placeholder}
                <KanbanColumnAdd />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Page>
  );
}
