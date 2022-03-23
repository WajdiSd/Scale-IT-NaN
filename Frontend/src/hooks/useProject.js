import { useState } from 'react';
import { resetErrorMessage, getWorkspaceProjectsForMembers, getWorkspaceProjects } from 'src/redux/slices/projectSlice';
import { useSelector, useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

const useProject = () => {
  const projects = useSelector((state) => state.projects.projects);
  const project = useSelector((state) => state.projects.project );
  const usersInProject = useSelector((state) => state.projects.usersInProject );
  const projectError = useSelector((state) => state.projects.projectsErrorMessage);

  const dispatch = useDispatch();

  const getWorkspaceProjectsHook = (idWorkspace, idMember, isExecutive) =>
    isExecutive
      ? dispatch(getWorkspaceProjects(idWorkspace))
      : dispatch(getWorkspaceProjectsForMembers({ idWorkspace, idMember }));

  const resetErrorMessageHook = () => dispatch(resetErrorMessage());
  return {
    project,
    usersInProject,
    projects,
    projectError,
    resetErrorMessageHook,
    getWorkspaceProjectsHook,
  };
};

export default useProject;
