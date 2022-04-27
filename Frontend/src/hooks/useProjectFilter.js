import { useState, useEffect, useMemo } from 'react';

// ----------------------------------------------------------------------

const useProjectFilter = (projects) => {
  const [projectsFilter, setProjectsFilter] = useState([]);
  const [query, setQuery] = useState('');
  const [managedProjects, setManagedProjects] = useState([]);
  const [ledProjects, setLedProjects] = useState([]);
  const [normalProjects, setNormalProjects] = useState([]);

  const initialProjects = projects;

  useEffect(() => {
    if (query) {
      searchProjects(query);
    } else {
      setProjectsFilter(initialProjects);
      setManagedProjects(initialProjects.filter((project) => project.hasOwnProperty('isProjectManager')));
      setLedProjects(initialProjects.filter((project) => project.hasOwnProperty('isTeamLeader')));
      setNormalProjects(
        initialProjects.filter(
          (project) => !project.hasOwnProperty('isProjectManager') && !project.hasOwnProperty('isTeamLeader')
        )
      );
    }
  }, [initialProjects, query]);

  // setProjectsFilter(initialProjects);

  const searchProjects = (value) => {
    setQuery(value);
    setProjectsFilter(() =>
      initialProjects.filter((project) => project.name.toUpperCase().includes(value.toUpperCase()))
    );
    setManagedProjects(
      initialProjects.filter(
        (project) =>
          project.name.toUpperCase().includes(value.toUpperCase()) && project.hasOwnProperty('isProjectManager')
      )
    );
    setLedProjects(
      initialProjects.filter(
        (project) => project.name.toUpperCase().includes(value.toUpperCase()) && project.hasOwnProperty('isTeamLeader')
      )
    );
    setNormalProjects(
      initialProjects.filter(
        (project) =>
          project.name.toUpperCase().includes(value.toUpperCase()) &&
          !project.hasOwnProperty('isProjectManager') &&
          !project.hasOwnProperty('isTeamLeader')
      )
    );
  };

  return { query, projectsFilter, managedProjects, ledProjects, normalProjects, searchProjects };
};

export default useProjectFilter;
