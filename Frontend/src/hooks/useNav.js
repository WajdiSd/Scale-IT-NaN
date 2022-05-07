// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// components
import SvgIconStyle from 'src/components/SvgIconStyle';
import useWorkspaceId from 'src/hooks/useWorkspaceId';
import { useEffect, useState } from 'react';
import Label from 'src/components/Label';
import { useParams } from 'react-router';
import useWorkspace from './useWorkspace';
import useProject from './useProject';
import useAuth from './useAuth';

// ----------------------------------------------------------------------

// const workspace = JSON.parse(localStorage.getItem('redux-workspaces'))['workspace'];
// const _id = JSON.parse(workspace)['_id'];
// console.log('_id');
// console.log(_id);
// const linkToWorkspaceInvite = `${PATH_DASHBOARD.workspaces.details}${_id}/invite`;

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  //blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  //mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  //calendar: getIcon('ic_calendar'),
  //ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  //booking: getIcon('ic_booking'),
  workspace: getIcon('ic_custom_workspaces'),
};

const useNav = () => {
  const { rootWorkspace } = useWorkspaceId();
  const {workspace} = useWorkspace();
  const {project} = useProject();
  const { isHr } = useAuth();

  const {id, projectid} = useParams();


  const [navConfig, setNavConfig] = useState([]);

  useEffect(() => {

    let navlist = [
      // GENERAL
      // ----------------------------------------------------------------------
      {
        subheader: 'manegement',
        items: [
          {
            title: 'workspaces',
            path: PATH_DASHBOARD.workspaces.root,
            icon: ICONS.workspace,
            children: [
              
            ],
          },
          {
            title: 'user',
            path: PATH_DASHBOARD.user.root,
            icon: ICONS.user,
            children: [
              { title: 'profile', path: PATH_DASHBOARD.user.profile },
              //{ title: 'cards', path: PATH_DASHBOARD.user.cards },
              //{ title: 'list', path: PATH_DASHBOARD.user.list },
              //{ title: 'create', path: PATH_DASHBOARD.user.newUser },
              //{ title: 'edit', path: PATH_DASHBOARD.user.editById },
              //{ title: 'account', path: PATH_DASHBOARD.user.account },
            ],
          },
          //{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
          //{ title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
          //{ title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
         // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
          //{ title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
          
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      /*{
        subheader: 'management',
        items: [
          // MANAGEMENT : WORKSPACE

          // MANAGEMENT : USER
          {
            title: 'user',
            path: PATH_DASHBOARD.user.root,
            icon: ICONS.user,
            children: [
              { title: 'profile', path: PATH_DASHBOARD.user.profile },
              //{ title: 'cards', path: PATH_DASHBOARD.user.cards },
              //{ title: 'list', path: PATH_DASHBOARD.user.list },
              //{ title: 'create', path: PATH_DASHBOARD.user.newUser },
              //{ title: 'edit', path: PATH_DASHBOARD.user.editById },
              //{ title: 'account', path: PATH_DASHBOARD.user.account },
            ],
          },

          // MANAGEMENT : E-COMMERCE
          // {
          //   title: 'e-commerce',
          //   path: PATH_DASHBOARD.eCommerce.root,
          //   icon: ICONS.cart,
          //   children: [
          //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
          //     { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
          //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
          //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
          //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
          //     { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
          //   ],
          // },

          // MANAGEMENT : BLOG
          // {
          //   title: 'blog',
          //   path: PATH_DASHBOARD.blog.root,
          //   icon: ICONS.blog,
          //   children: [
          //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          //     { title: 'post', path: PATH_DASHBOARD.blog.postById },
          //     { title: 'new post', path: PATH_DASHBOARD.blog.newPost },
          //   ],
          // },
        ],
      },*/

      // APP
      // ----------------------------------------------------------------------
      /*{
        subheader: 'app',
        items: [
          // {
          //   title: 'mail',
          //   path: PATH_DASHBOARD.mail.root,
          //   icon: ICONS.mail,
          //   info: (
          //     <Label variant="outlined" color="error">
          //       +32
          //     </Label>
          //   ),
          // },
          //{ title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
          //{ title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
          {
            title: 'kanban',
            path: PATH_DASHBOARD.kanban,
            icon: ICONS.kanban,
          },
        ],
      },*/
    ];

    if(id && isHr){
      let inviteItem = {
        title: 'invite members',
        path: `${PATH_DASHBOARD.workspaces.memberInvite}${id}/invite`,
        icon: ICONS.workspace,
      }
      navlist[0].items[0].children.splice(1, 0, inviteItem);
    }

    if(projectid){
      let projectsItems = 
      {
        title: 'projects',
        path: PATH_DASHBOARD.workspaces.root,
        icon: ICONS.workspace,
        children: [
          {
            title: 'details',
            path: `${PATH_DASHBOARD.workspaces.details}${id}/project/${projectid}`,
            icon: ICONS.workspace,
          },
          {
            title: 'tasks',
            path: `${PATH_DASHBOARD.workspaces.details}${id}/project/${projectid}/tasks/list`,
            icon: ICONS.workspace,
          },
          {
            title: 'kanban',
            path: `${PATH_DASHBOARD.workspaces.details}${id}/project/${projectid}/tasks/kanban`,
            icon: ICONS.kanban,
          },
        ],
      };
      navlist[0].items.splice(1, 0, projectsItems);
    }

    
    setNavConfig(navlist);
  }, [workspace, project]);

  return { navConfig };
};

export default useNav;
