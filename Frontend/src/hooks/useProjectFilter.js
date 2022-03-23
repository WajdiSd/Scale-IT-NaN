import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

const useProjectFilter = (projects) => {
  const [projectsFilter, setProjectsFilter] = useState([]);
  const [query, setQuery] = useState('');
  const initialProjects = projects;

  useEffect(() => (query ? searchProjectsFilter(query) : setProjectsFilter(initialProjects)), [initialProjects, query]);

  const searchProjectsFilter = (value) =>
    setProjectsFilter(() =>
      initialProjects.filter((project) => project.name.toUpperCase().includes(value.toUpperCase()))
    );

  const searchProjects = (value) => {
    setQuery(value);
    searchProjectsFilter(query);
  };

  return { query, projectsFilter, searchProjects };
};

export default useProjectFilter;
