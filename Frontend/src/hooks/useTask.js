import { useContext } from 'react';
import { useSelector } from 'src/redux/store';

// import { AuthContext } from '../contexts/FirebaseContext';
// import { AuthContext } from '../contexts/Auth0Context';
// import { AuthContext } from '../contexts/AwsCognitoContext';

// ----------------------------------------------------------------------

const useTask = () => {

  //const context = useContext(AuthContext);

 // if (!context) throw new Error('Auth context must be use inside AuthProvider');

  const taskStore = useSelector(
    (state) => state.tasks
  )
  return taskStore;
};

export default useTask;
