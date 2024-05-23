import { CategoryDto } from '../@types/models/category-dto';
import { RegisterVendorDto } from '../@types/models/register-vendor-dto';
import { SupplierDto } from '../@types/models/supplier-dto';
import { OrderDto } from '../@types/models/order-dto';
import { AdminLoginDto } from '../@types/models/admin-login-dto';
import { UserDto } from '../@types/models/user-dto';
import { PageMetaDto } from '../@types/models/page-meta-dto';
import { LoginPayloadDto } from '../@types/models/login-payload-dto';
import axios from 'axios';
// config
import { HOST_API } from '../config';
import { ProductDto, VendorDto } from 'src/@types/models';

// ----------------------------------------------------------------------

export type GetList = {
  q?: string;
  order?: string;
  take?: number;
  page?: number;
};

type ResponseList<T> = {
  data: T;
  meta: PageMetaDto;
};

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const AxiosApi = {
  axiosInstance,
  // auth
  adminLogin: (data: AdminLoginDto) =>
    axiosInstance.post<LoginPayloadDto>('/admins/login', data).then((res) => res.data),
  // orders api
  orderList: (params: GetList) =>
    axiosInstance.get<ResponseList<OrderDto[]>>('orders', { params }).then((res) => res.data),
  singleOrder: (id: string) => axiosInstance.get(`orders/${id}`).then((res) => res.data),
  // users api
  userList: (params: GetList) =>
    axiosInstance
      .get<ResponseList<UserDto[]>>('/dashboards/admins/users', { params })
      .then((res) => res.data),
  singleUser: (data: string) => axiosInstance.get<UserDto>(`users/${data}`).then((res) => res.data),
  activeUser: (id: string) =>
    axiosInstance.get<UserDto>(`dashboards/admins/users/activate/${id}`).then((res) => res.data),
  deActiveUser: (id: string) =>
    axiosInstance.put<UserDto>(`dashboards/admins/users/de-activate/${id}`).then((res) => res.data),
  deleteUser: (id: string) =>
    axiosInstance.delete<UserDto>(`dashboards/admins/users/${id}/delete`).then((res) => res.data),
  recoverUser: (id: string) =>
    axiosInstance.post<UserDto>(`dashboards/admins/users/${id}/recover`).then((res) => res.data),
  handleCreateVendor: (id: RegisterVendorDto) =>
    axiosInstance.post(`dashboards/admins/users/${id}/create`).then(() => {}),
  // vendors api
  vendorList: (params: GetList) =>
    axiosInstance
      .get<ResponseList<VendorDto[]>>('dashboards/admins/vendors', { params })
      .then((res) => res.data),
  singleVendor: (id: string) =>
    axiosInstance.get<VendorDto>(`dashboards/admins/vendors/${id}`).then((res) => res.data),
  vendorFeatured: (id: string) =>
    axiosInstance.post(`dashboards/admins/vendors/${id}/featured`).then((res) => res.data),
  vendorUnFeatured: (id: string) =>
    axiosInstance.post(`dashboards/admins/vendors/${id}/un-featured`).then((res) => res.data),
  // supplier api
  supplierList: (params: GetList) =>
    axiosInstance
      .get<ResponseList<SupplierDto[]>>('dashboards/admins/suppliers', { params })
      .then((res) => res.data),
  // categories api
  categoryList: (params: GetList) =>
    axiosInstance.get<CategoryDto[]>('categories', { params }).then((res) => res.data),
  // products api
  productList: (params: GetList) =>
    axiosInstance.get<ResponseList<ProductDto[]>>('/products', { params }).then((res) => res.data),
};

export default AxiosApi;
