import {
  addMemberToTask,
  removeUser,
  setUserError,
  resetUserError,
  setUserSuccess,
  resetUserSuccess,
  submitInvitationsToTask,
  getTaskMembers,
} from 'src/redux/slices/inviteSlice';
import { useSelector, useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

const useTaskInvite = (id) => {
  const users = useSelector((state) => state.invite.users);
  const taskMembers = useSelector((state) => state.invite.taskMembers);
  const notAssignedMembers = useSelector((state) => state.invite.notAssignedMembers);
  const userError = useSelector((state) => state.invite.userErrorMessage);
  const userSuccess = useSelector((state) => state.invite.userSuccessMessage);

  const dispatch = useDispatch();

  const submitInvite = () => {
    dispatch(submitInvitationsToTask(id));
  };

  const fetchTaskMembers = () => {
    dispatch(getTaskMembers(id));
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
    taskMembers,
    notAssignedMembers,
    addMemberUser,
    removeUserHook,
    userError,
    resetUserErrorHook,
    userSuccess,
    resetUserSuccessHook,
    submitInvite,
    fetchTaskMembers,
  };
};

export default useTaskInvite;
