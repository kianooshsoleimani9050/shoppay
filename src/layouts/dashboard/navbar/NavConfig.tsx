// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  order: getIcon('ic_mail'),
  category: getIcon('ic_mail'),
  product: getIcon('ic_mail'),
  vendor: getIcon('ic_cart'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
  //     { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },
      {
        title: 'order',
        path: PATH_DASHBOARD.order.root,
        icon: ICONS.order,
        children: [
          { title: 'list', path: PATH_DASHBOARD.order.list },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
        ],
      },
      {
        title: 'category',
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.category,
        children: [
          { title: 'list', path: PATH_DASHBOARD.category.list },
          { title: 'single', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
        ],
      },
      {
        title: 'product',
        path: PATH_DASHBOARD.product.root,
        icon: ICONS.product,
        children: [
          { title: 'list', path: PATH_DASHBOARD.product.list },
          { title: 'single', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
        ],
      },
      {
        title: 'vendor',
        path: PATH_DASHBOARD.vendor.root,
        icon: ICONS.vendor,
        children: [
          { title: 'list', path: PATH_DASHBOARD.vendor.list },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      // {
      //   title: 'mail',
      //   path: PATH_DASHBOARD.mail.root,
      //   icon: ICONS.mail,
      //   info: <Label color="error">+32</Label>,
      // },
      { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      // { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
    ],
  },
];

export default navConfig;
