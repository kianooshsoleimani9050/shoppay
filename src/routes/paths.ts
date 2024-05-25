// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  vendor: {
    root: path(ROOTS_DASHBOARD, '/vendor'),
    list: path(ROOTS_DASHBOARD, '/vendor/list'),
    pending: path(ROOTS_DASHBOARD, '/vendor/pending/list'),
    new: path(ROOTS_DASHBOARD, '/vendor/new'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/vendor/${id}/edit`),
    profile: (id: string) => path(ROOTS_DASHBOARD, `/vendor/${id}/profile`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    single: (id: string) => path(ROOTS_DASHBOARD, `/user/${id}/single`),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: (id: string) => path(ROOTS_DASHBOARD, `/user/${id}/profile`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/user/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  setting: {
    root: path(ROOTS_DASHBOARD, '/setting'),
    new: path(ROOTS_DASHBOARD, '/setting/new'),
    list: path(ROOTS_DASHBOARD, '/setting/list'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/setting/${id}/edit`),
  },
  commission: {
    root: path(ROOTS_DASHBOARD, '/commission'),
    new: path(ROOTS_DASHBOARD, '/commission/new'),
    list: path(ROOTS_DASHBOARD, '/commission/list'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/commission/${id}/edit`),
  },
  order: {
    root: path(ROOTS_DASHBOARD, 'order'),
    list: path(ROOTS_DASHBOARD, '/order/list'),
    single: (id: string) => path(ROOTS_DASHBOARD, `/order/${id}/single`),
  },
  supplier: {
    root: path(ROOTS_DASHBOARD, 'supplier'),
    list: path(ROOTS_DASHBOARD, '/supplier/list'),
    pending: path(ROOTS_DASHBOARD, '/supplier/pending/list'),
    single: (id: string) => path(ROOTS_DASHBOARD, `/supplier/${id}/single`),
    profile: (id: string) => path(ROOTS_DASHBOARD, `/supplier/${id}/profile`),
  },
  product: {
    root: path(ROOTS_DASHBOARD, 'product'),
    list: path(ROOTS_DASHBOARD, '/product/list'),
    create: path(ROOTS_DASHBOARD, '/product/new'),
    single: (id: string) => path(ROOTS_DASHBOARD, `/product/${id}/single`),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  category: {
    root: path(ROOTS_DASHBOARD, 'category'),
    list: path(ROOTS_DASHBOARD, '/category/list'),
    single: (id: string) => path(ROOTS_DASHBOARD, `/category/${id}/single`),
    new: path(ROOTS_DASHBOARD, '/category/new'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/category/${id}/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
