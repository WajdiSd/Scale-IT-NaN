import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { addMember, addManager, removeUser, setUserError, resetUserError } from 'src/redux/slices/workspaceInviteSlice';
import { useSelector, useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

const useWorkspaceInvite = () => {
  const users = useSelector((state) => state.workspaceInvite.users);
  const userError = useSelector((state) => state.workspaceInvite.userErrorMessage);
  const [member, setMember] = useState('');
  const [manager, setManager] = useState('');

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const addMemberUser = () => {
    validateEmail(member) ? dispatch(addMember(member)) : dispatch(setUserError('Please add a valid email'));
    setMember('');
  };

  const addManagerUser = () => {
    validateEmail(manager) ? dispatch(addManager(manager)) : dispatch(setUserError('Please add a valid email'));
    setManager('');
  };

  const removeUserHook = (event) => {
    return dispatch(removeUser(event.target.innerHTML));
  };

  const resetUserErrorHook = () => dispatch(resetUserError());

  return {
    users,
    member,
    manager,
    setMember,
    setManager,
    addMemberUser,
    addManagerUser,
    removeUserHook,
    userError,
    resetUserErrorHook,
  };
};

export default useWorkspaceInvite;
