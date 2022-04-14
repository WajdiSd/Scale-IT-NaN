import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import {
  addMemberToTask,
  removeUser,
  setUserError,
  resetUserError,
  setUserSuccess,
  resetUserSuccess,
  submitInvitationsToTask,
} from 'src/redux/slices/inviteSlice';
import { useSelector, useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

const useTaskInvite = (id) => {
  const users = useSelector((state) => state.invite.users);
  const userError = useSelector((state) => state.invite.userErrorMessage);
  const userSuccess = useSelector((state) => state.invite.userSuccessMessage);

  const dispatch = useDispatch();

  const submitInvite = () => {
    dispatch(submitInvitationsToTask(id));
  };

  const addMemberUser = (email) => {
    const exists = users.find((user) => user.email === email);
    exists ? dispatch(setUserError('User already exists in list')) : dispatch(addMemberToTask(email));
  };

  const removeUserHook = (event) => {
    return dispatch(removeUser(event.target.innerHTML));
  };

  const resetUserErrorHook = () => dispatch(resetUserError());

  const resetUserSuccessHook = () => dispatch(resetUserSuccess());

  return {
    users,
    addMemberUser,
    removeUserHook,
    userError,
    resetUserErrorHook,
    userSuccess,
    resetUserSuccessHook,
    submitInvite,
  };
};

export default useTaskInvite;
