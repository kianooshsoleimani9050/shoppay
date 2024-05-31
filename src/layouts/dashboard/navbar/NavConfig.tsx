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
  brand: getIcon('ic_mail'),
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
        title: 'فروشنده ها',
        path: PATH_DASHBOARD.vendor.root,
        icon: ICONS.vendor,
        children: [
          { title: 'لیست', path: PATH_DASHBOARD.vendor.list },
          { title: 'تایید نشده ها', path: PATH_DASHBOARD.vendor.pending },
        ],
      },
      {
        title: 'کاربران',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'لیست', path: PATH_DASHBOARD.user.list },
          { title: 'ساخت', path: PATH_DASHBOARD.user.new },
        ],
      },
      {
        title: 'سفارش',
        path: PATH_DASHBOARD.order.root,
        icon: ICONS.order,
        children: [{ title: 'لیست', path: PATH_DASHBOARD.order.list }],
      },
      {
        title: 'تامین کننده',
        path: PATH_DASHBOARD.supplier.root,
        icon: ICONS.product,
        children: [
          { title: 'لیست', path: PATH_DASHBOARD.supplier.list },
          { title: 'تایید نشده ها', path: PATH_DASHBOARD.supplier.pending },
        ],
      },
      {
        title: 'تنظیمات',
        path: PATH_DASHBOARD.setting.root,
        icon: ICONS.setting,
        children: [
          { title: 'لیست', path: PATH_DASHBOARD.setting.list },
          { title: 'ساخت', path: PATH_DASHBOARD.setting.new },
        ],
      },
      {
        title: 'کمیسیون',
        path: PATH_DASHBOARD.commission.root,
        icon: ICONS.setting,
        children: [
          { title: 'لیست', path: PATH_DASHBOARD.commission.list },
          { title: 'ساخت', path: PATH_DASHBOARD.commission.new },
        ],
      },
      {
        title: 'محصولات',
        path: PATH_DASHBOARD.product.root,
        icon: ICONS.product,
        children: [
          { title: 'لیست', path: PATH_DASHBOARD.product.list },
          { title: 'ساخت', path: PATH_DASHBOARD.product.create },
          { title: 'درخواست ها', path: PATH_DASHBOARD.product.requests },
        ],
      },
      {
        title: 'دسته بندی ها',
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.category,
        children: [
          { title: 'لیست', path: PATH_DASHBOARD.category.list },
          { title: 'ساخت', path: PATH_DASHBOARD.category.new },
        ],
      },
      {
        title: 'برندها',
        path: PATH_DASHBOARD.brand.root,
        icon: ICONS.brand,
        children: [
          { title: 'لیست', path: PATH_DASHBOARD.brand.list },
          { title: 'ساخت', path: PATH_DASHBOARD.brand.new },
        ],
      },
    ],
  },
];

export default navConfig;
