import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

const useProjectFilter = (projects) => {
  const [projectsFilter, setProjectsFilter] = useState([]);
  const [query, setQuery] = useState('');
  const initialProjects = projects;

  useEffect(() => (query ? searchProjectsFilter(query) : setProjectsFilter(initialProjects)), [initialProjects, query]);

  const searchProjects = (value) => {
    setQuery(value);
    setProjectsFilter(() =>
      initialProjects.filter((project) => project.name.toUpperCase().includes(value.toUpperCase()))
    );
  };

  return { query, projectsFilter, searchProjects };
};

export default useProjectFilter;
