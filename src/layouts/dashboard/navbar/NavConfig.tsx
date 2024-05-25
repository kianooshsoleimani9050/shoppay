// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
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
  setting: getIcon('ic_mail'),
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
  {
    subheader: '',
    items: [
      {
        title: 'vendor',
        path: PATH_DASHBOARD.vendor.root,
        icon: ICONS.vendor,
        children: [
          { title: 'list', path: PATH_DASHBOARD.vendor.list },
          { title: 'pendings', path: PATH_DASHBOARD.vendor.pending },
        ],
      },
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
        ],
      },
      {
        title: 'order',
        path: PATH_DASHBOARD.order.root,
        icon: ICONS.order,
        children: [{ title: 'list', path: PATH_DASHBOARD.order.list }],
      },
      {
        title: 'supplier',
        path: PATH_DASHBOARD.supplier.root,
        icon: ICONS.product,
        children: [
          { title: 'list', path: PATH_DASHBOARD.supplier.list },
          { title: 'pendings', path: PATH_DASHBOARD.supplier.pending },
        ],
      },
      {
        title: 'setting',
        path: PATH_DASHBOARD.setting.root,
        icon: ICONS.setting,
        children: [
          { title: 'list', path: PATH_DASHBOARD.setting.list },
          // @TODO kio
          // { title: 'edit', path: PATH_DASHBOARD.setting.edit() },
          { title: 'create', path: PATH_DASHBOARD.setting.new },
        ],
      },
      {
        title: 'commission',
        path: PATH_DASHBOARD.commission.root,
        icon: ICONS.setting,
        children: [
          { title: 'list', path: PATH_DASHBOARD.commission.list },
          { title: 'create', path: PATH_DASHBOARD.commission.new },
        ],
      },
      {
        title: 'product',
        path: PATH_DASHBOARD.product.root,
        icon: ICONS.product,
        children: [
          { title: 'list', path: PATH_DASHBOARD.product.list },
          { title: 'create', path: PATH_DASHBOARD.product.create },
        ],
      },
      {
        title: 'category',
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.category,
        children: [
          { title: 'list', path: PATH_DASHBOARD.category.list },
          { title: 'create', path: PATH_DASHBOARD.category.new },
        ],
      },
    ],
  },
];

export default navConfig;
