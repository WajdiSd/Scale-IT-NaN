import { useState } from 'react';
import {
  resetErrorMessage,
  resetSuccessMessage,
  getWorkspaceProjectsForMembers,
  getWorkspaceProjects,
  deleteProject,
  restoreProject,
  updateProject,
  resetProject,
} from 'src/redux/slices/projectSlice';
import { useSelector, useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

const useProject = () => {
  const projects = useSelector((state) => state.projects.projects);
  const archivedProjects = useSelector((state) => state.projects.archivedProjects);
  const unarchivedProjects = useSelector((state) => state.projects.unarchivedProjects);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const isTL = useSelector((state) => state.projects.isTeamLeader);
  const isPM = useSelector((state) => state.projects.isProjectManager);
  const isSuccess = useSelector((state) => state.projects.isSuccess);
  const project = useSelector((state) => state.projects.project);
  const usersInProject = useSelector((state) => state.projects.usersInProject);
  const projectError = useSelector((state) => state.projects.projectsErrorMessage);
  const projectSuccess = useSelector((state) => state.projects.projectsSuccessMessage);

  const dispatch = useDispatch();

  const getWorkspaceProjectsHook = (idWorkspace, idMember, isExecutive) =>
    {
      isExecutive
      ? dispatch(getWorkspaceProjects(idWorkspace))
      : dispatch(getWorkspaceProjectsForMembers({ idWorkspace, idMember }));

    }
    

  const resetErrorMessageHook = () => dispatch(resetErrorMessage());

  const resetProjectsStore = () => dispatch(resetProject());

  const resetSuccessMessageHook = () => dispatch(resetSuccessMessage());

  const deleteProjectHook = (data) => dispatch(deleteProject(data));

  const restoreProjectHook = (data) => dispatch(restoreProject(data));

  const updateProjectHook = (data) => dispatch(updateProject(data));

  return {
    project,
    usersInProject,
    projects,
    unarchivedProjects,
    archivedProjects,
    projectError,
    projectSuccess,
    isLoading,
    isSuccess,
    isTL,
    isPM,
    resetProjectsStore,
    resetSuccessMessageHook,
    resetErrorMessageHook,
    deleteProjectHook,
    restoreProjectHook,
    getWorkspaceProjectsHook,
    updateProjectHook,
  };
};

export default useProject;
