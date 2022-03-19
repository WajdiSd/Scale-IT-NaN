import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { addMember, addManager, removeUser } from 'src/redux/slices/workspaceInviteSlice';
import { useSelector, useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

const useWorkspaceInvite = () => {
  const users = useSelector((state) => state.workspaceInvite.users);
  const [member, setMember] = useState('');
  const [manager, setManager] = useState('');
  const [memberAlreadyExists, setMemberAlreadyExists] = useState('');
  const [managerAlreadyExists, setManagerAlreadyExists] = useState('');
  const workspaceInvvv = useSelector((state) => state.workspaceInvite);

  const dispatch = useDispatch();

  // TODO : add email validation
  // TODO : add db checking for value
  const addMemberUser = () => {
    console.log('in addmemberuser, users:');
    console.log(users);
    console.log('state.workspaceInvite');
    console.log(workspaceInvvv);
    console.log('member');
    console.log(member);
    return dispatch(addMember(member)) ? setMember('') : setMemberAlreadyExists(`${member.email} already exists`);
  };
  //   const addMemberUser = dispatch(addMember(member));

  // TODO : add email validation
  // TODO : add db checking for value
  const addManagerUser = () => {
    console.log('in addmanageruser, users:');
    console.log(users);
    console.log('state.workspaceInvite');
    console.log(workspaceInvvv);
    console.log('manager');
    console.log(manager);
    return dispatch(addManager(manager)) ? setManager('') : setManagerAlreadyExists(`${manager.email} already exists`);
  };

  const removeUserHook = (event) => {
    return dispatch(removeUser(event.target.innerHTML));
  };

  return {
    users,
    member,
    manager,
    setMember,
    setManager,
    addMemberUser,
    addManagerUser,
    removeUserHook,
    memberAlreadyExists,
    managerAlreadyExists,
    setMemberAlreadyExists,
    setManagerAlreadyExists,
  };
};

export default useWorkspaceInvite;
