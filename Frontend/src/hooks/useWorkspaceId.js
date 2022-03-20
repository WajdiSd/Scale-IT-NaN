import { useState, useEffect } from 'react';

const useWorkspaceId = () => {
  const [rootWorkspace, setRootWorkspace] = useState('');

  useEffect(() => {
    console.log('\n\n-----------------------------------------------------------------');
    console.log('rootWorkspace func useWorkspaceId');
    console.log('\n\n-----------------------------------------------------------------');
    if (JSON.parse(localStorage.getItem('redux-workspaces')) != null) {
      console.log('\n\n-----------------------------------------------------------------');
      console.log('workspace in useWorkspaceId');
      const workspace = JSON.parse(localStorage.getItem('redux-workspaces'))['workspace'];
      console.log(workspace);
      console.log('\n\n-----------------------------------------------------------------');

      if (JSON.parse(workspace) != null) {
        const _id = JSON.parse(workspace)['_id'];
        console.log('\n\n-----------------------------------------------------------------');
        console.log('useWorkspaceId _id');
        console.log(_id);
        console.log('\n\n-----------------------------------------------------------------');
        setRootWorkspace(_id);
      } else {
        console.log('workspace null');
      }
    } else {
      console.log('redux-workspaces null');
    }
    return () => {
      setRootWorkspace('');
    };
  }, [rootWorkspace]);

  return { rootWorkspace };
};

export default useWorkspaceId;
