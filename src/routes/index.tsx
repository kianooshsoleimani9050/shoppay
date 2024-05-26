import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },
        {
          path: 'vendor',
          children: [
            { element: <Navigate to="/dashboard/vendor/list" replace />, index: true },
            { path: 'list', element: <VendorList /> },
            { path: 'pending/list', element: <PendingVendorList /> },
            { path: 'new', element: <VendorCreate /> },
            { path: ':id/edit', element: <UserCreate /> },
            { path: ':id/profile', element: <VendorProfile /> }
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            { path: 'list', element: <UserList /> },
            { path: ':id/single', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':id/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'order',
          children: [
            { element: <Navigate to="/dashboard/order/list" replace />, index: true },
            { path: 'list', element: <OrderList /> },
            { path: ':id/single', element: <UserCreate /> },
          ],
        },
        {
          path: 'setting',
          children: [
            { element: <Navigate to="/dashboard/setting/list" replace />, index: true },
            { path: 'list', element: <SettingList /> },
            { path: ':id/single', element: <SettingCreate /> },
            { path: 'new', element: <SettingCreate /> },
            { path: ':id/edit', element: <SettingCreate /> },
          ],
        },
        {
          path: 'commission',
          children: [
            { element: <Navigate to="/dashboard/commission/list" replace />, index: true },
            { path: 'list', element: <CommissionList /> },
            { path: ':id/single', element: <CommissionCreate /> },
            { path: 'new', element: <CommissionCreate /> },
            { path: ':id/edit', element: <CommissionCreate /> },
          ],
        },
        {
          path: 'supplier',
          children: [
            { element: <Navigate to="/dashboard/supplier/list" replace />, index: true },
            { path: 'list', element: <SupplierList /> },
            { path: ':id/single', element: <UserCreate /> },
            { path: 'pending/list', element: <PendingSupplierList /> },
            { path: ':id/profile', element: <SupplierProfile /> }
          ],
        },
        {
          path: 'product',
          children: [
            { element: <Navigate to="/dashboard/product/list" replace />, index: true },
            { path: 'list', element: <ProductList /> },
            { path: 'list/requests', element: <ProductRequestList /> },
            { path: 'new', element: <ProductCreate /> },
            { path: ':id/edit', element: <ProductCreate /> },
          ],
        },
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductEdit /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },
        {
          path: 'category',
          children: [
            { element: <Navigate to="/dashboard/category/list" replace />, index: true },
            { path: 'list', element: <CategoryList /> },
            { path: 'new', element: <CategoryCreate /> },
            { path: ':id/edit', element: <CategoryCreate /> },
          ],
        },
        {
          path: 'product-request',
          children: [
            { element: <Navigate to="/dashboard/product-request/list" replace />, index: true },
            { path: 'list', element: <CategoryList /> },
            { path: 'new', element: <BrandCreate /> },
            { path: ':id/edit', element: <BrandCreate /> },
          ],
        },
        {
          path: 'brand',
          children: [
            { element: <Navigate to="/dashboard/brand/list" replace />, index: true },
            { path: 'list', element: <BrandList /> },
            { path: 'new', element: <BrandCreate /> },
            { path: ':id/edit', element: <BrandCreate /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductDetails'))
);
const EcommerceProductList = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductList'))
);
const EcommerceProductCreate = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductCreate'))
);
const EcommerceProductEdit = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductEdit'))
);
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// USER
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// ORDER
const OrderList = Loadable(lazy(() => import('../pages/dashboard/OrderList')));

// SUPPLIER
const SupplierList = Loadable(lazy(() => import('../pages/dashboard/SupplierList')));
const PendingSupplierList = Loadable(lazy(() => import('../pages/dashboard/SupplierPendingList')))
const SupplierProfile = Loadable(lazy(() => import('../pages/dashboard/SupplierProfile')));

// SETTING
const SettingList = Loadable(lazy(() => import('../pages/dashboard/SettingList')));
const SettingCreate = Loadable(lazy(() => import('../pages/dashboard/SettingCreate')));

// COMMISSION
const CommissionList = Loadable(lazy(() => import('../pages/dashboard/CommissionList')));
const CommissionCreate = Loadable(lazy(() => import('../pages/dashboard/CommissionCreate')));

// PRODUCT
const ProductList = Loadable(lazy(() => import('../pages/dashboard/ProductList')));
const ProductCreate = Loadable(lazy(() => import('../pages/dashboard/ProductCreate')));
const ProductRequestList = Loadable(lazy(() => import('../pages/dashboard/ProductRequestList')));

// CATEGORY
const CategoryList = Loadable(lazy(() => import('../pages/dashboard/CategoryList')));
const CategoryCreate = Loadable(lazy(() => import('../pages/dashboard/CategoryCreate')));

// BRAND
const BrandList = Loadable(lazy(() => import('../pages/dashboard/BrandList')));
const BrandCreate = Loadable(lazy(() => import('../pages/dashboard/BrandCreate')));

// VENDOR
const VendorList = Loadable(lazy(() => import('../pages/dashboard/VendorList')))
const VendorCreate = Loadable(lazy(() => import('../pages/dashboard/VendorCreate')))
const PendingVendorList = Loadable(lazy(() => import('../pages/dashboard/VendorPendingList')))
const VendorProfile = Loadable(lazy(() => import('../pages/dashboard/VendorProfile')));

// APP
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// TEST RENDER PAGE BY ROLE
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

// MAIN
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
