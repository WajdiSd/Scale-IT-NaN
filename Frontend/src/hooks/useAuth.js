import { useContext } from 'react';
import { useSelector } from 'src/redux/store';
//
import { AuthContext } from '../contexts/JWTContext';
// import { AuthContext } from '../contexts/FirebaseContext';
// import { AuthContext } from '../contexts/Auth0Context';
// import { AuthContext } from '../contexts/AwsCognitoContext';

// ----------------------------------------------------------------------

const useAuth = () => {

  //const context = useContext(AuthContext);

 // if (!context) throw new Error('Auth context must be use inside AuthProvider');

  const userAuth = useSelector(
    (state) => state.auth
  )
  return userAuth;
};

export default useAuth;
