import { useState } from 'react';
import {
  resetErrorMessage,
  getWorkspaceProjectsForMembers,
  getWorkspaceProjects,
  deleteProject,
  restoreProject,
} from 'src/redux/slices/projectSlice';
import { useSelector, useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

const useProject = () => {
  const projects = useSelector((state) => state.projects.projects);
  const archivedProjects = useSelector((state) => state.projects.archivedProjects);
  const unarchivedProjects = useSelector((state) => state.projects.unarchivedProjects);
  const projectError = useSelector((state) => state.projects.projectsErrorMessage);
  const projectSuccess = useSelector((state) => state.projects.projectsSuccessMessage);

  const dispatch = useDispatch();

  const getWorkspaceProjectsHook = (idWorkspace, idMember, isExecutive) =>
    isExecutive
      ? dispatch(getWorkspaceProjects(idWorkspace))
      : dispatch(getWorkspaceProjectsForMembers({ idWorkspace, idMember }));

  const resetErrorMessageHook = () => dispatch(resetErrorMessage());

  const resetSuccessMessageHook = () => dispatch(resetSuccessMessage());

  const deleteProjectHook = (data) => dispatch(deleteProject(data));

  const restoreProjectHook = (data) => dispatch(restoreProject(data));

  return {
    projects,
    unarchivedProjects,
    archivedProjects,
    projectError,
    projectSuccess,
    resetSuccessMessageHook,
    resetErrorMessageHook,
    deleteProjectHook,
    restoreProjectHook,
    getWorkspaceProjectsHook,
  };
};

export default useProject;
