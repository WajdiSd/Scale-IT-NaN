import { useState } from 'react';
import { resetErrorMessage, getWorkspaceProjectsForMembers, getWorkspaceProjects } from 'src/redux/slices/projectSlice';
import { useSelector, useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

const useProject = () => {
  const projects = useSelector((state) => state.projects.projects);
  const projectError = useSelector((state) => state.projects.projectsErrorMessage);

  const dispatch = useDispatch();

  const getWorkspaceProjectsHook = (idWorkspace, idMember, isExecutive) =>
    isExecutive
      ? dispatch(getWorkspaceProjects(idWorkspace))
      : dispatch(getWorkspaceProjectsForMembers({ idWorkspace, idMember }));

  const resetErrorMessageHook = () => dispatch(resetErrorMessage());

  console.log('\n\n--------------------------------------------------------------------------------');
  console.log('projects in useProject');
  console.log(projects);
  console.log('--------------------------------------------------------------------------------\n\n');

  return {
    projects,
    projectError,
    resetErrorMessageHook,
    getWorkspaceProjectsHook,
  };
};

export default useProject;
