import { CreateOrUpdateAboutUsDto } from '../@types/models/create-about-us-dto';
import { CreateOrUpdateRuleDto } from '../@types/models/create-rule-dto';
import { RuleDto } from '../@types/models/rule-dto';
import { CreateBrandDto } from '../@types/models/create-brand-dto';
import { CommissionDto } from '../@types/models/commission-dto';
import { SettingDto } from '../@types/models/setting-dto';
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
import {
  AddressDto,
  BrandDto,
  CreateCategoryDto,
  CreateCommissionAdminDto,
  CreateSettingAdminDto,
  CreateSliderDto,
  LogDto,
  ProductDto,
  ProductRequestDto,
  UpdateCategoryDto,
  UpdateSettingAdminDto,
  VendorDto,
} from 'src/@types/models';
import { CreateOrUpdateGeneralsDto } from 'src/@types/models/create-update-generals';

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
  // assets
  getFileLocalPath: (url: string, fileName: string, returnFile?: boolean) =>
    axiosInstance
      .get<Buffer>(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const array = new Uint8Array(res.data);
        const blob = new Blob([array]);
        let blobToFile: any = blob;
        blobToFile.lastModifiedDate = new Date();
        blobToFile.name = fileName;
        if (blobToFile) {
          const src = URL.createObjectURL(blobToFile);
          if (returnFile) {
            return {
              src,
              file: blobToFile as File,
            };
          }
          return src;
        }
        return null;
      }),
  // main
  stats: () => axiosInstance.get<any>('/generals/stats').then((res) => res.data),
  lastestOrders: () =>
    axiosInstance.get<OrderDto[]>('/generals/latest-orders').then((res) => res.data),
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
  singleUser: (id: string) => axiosInstance.get<UserDto>(`users/${id}`).then((res) => res.data),
  userOrders: (id: string, params: GetList) =>
    axiosInstance
      .get<ResponseList<OrderDto[]>>(`users/${id}/orders`, { params })
      .then((res) => res.data),
  userAddresses: (id: string, params: GetList) =>
    axiosInstance
      .get<ResponseList<AddressDto[]>>(`users/${id}/addresses`, { params })
      .then((res) => res.data),
  userLogins: (id: string, params: GetList) =>
    axiosInstance
      .get<ResponseList<LogDto[]>>(`users/${id}/logins`, { params })
      .then((res) => res.data),
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
  pendingVendorList: (params: GetList) =>
    axiosInstance
      .get<ResponseList<VendorDto[]>>('vendors/pendings', { params })
      .then((res) => res.data),
  singleVendor: (id: string) =>
    axiosInstance.get<VendorDto>(`dashboards/admins/vendors/${id}`).then((res) => res.data),
  vendorFeatured: (id: string) =>
    axiosInstance.post(`dashboards/admins/vendors/${id}/featured`).then((res) => res.data),
  vendorUnFeatured: (id: string) =>
    axiosInstance.post(`dashboards/admins/vendors/${id}/un-featured`).then((res) => res.data),
  vendorOrders: (id: string, params: GetList) =>
    axiosInstance
      .get<ResponseList<OrderDto[]>>(`vendors/${id}/orders`, { params })
      .then((res) => res.data),
  vendorAddresses: (id: string, params: GetList) =>
    axiosInstance
      .get<ResponseList<AddressDto[]>>(`vendors/${id}/addresses`, { params })
      .then((res) => res.data),
  // supplier api
  supplierList: (params: GetList) =>
    axiosInstance
      .get<ResponseList<SupplierDto[]>>('dashboards/admins/suppliers', { params })
      .then((res) => res.data),
  pendingSupplierList: (params: GetList) =>
    axiosInstance
      .get<ResponseList<SupplierDto[]>>('suppliers/pendings', { params })
      .then((res) => res.data),
  singleSupplier: (id: string) =>
    axiosInstance.get<SupplierDto>(`dashboards/admins/suppliers/${id}`).then((res) => res.data),
  supplierAddresses: (id: string, params: GetList) =>
    axiosInstance
      .get<ResponseList<AddressDto[]>>(`suppliers/${id}/addresses`, { params })
      .then((res) => res.data),
  supplierOrders: (id: string, params: GetList) =>
    axiosInstance
      .get<ResponseList<OrderDto[]>>(`suppliers/${id}/orders`, { params })
      .then((res) => res.data),

  supplierVendor: (id: string, params: GetList) =>
    axiosInstance
      .get<ResponseList<OrderDto[]>>(`suppliers/${id}/vendors`, { params })
      .then((res) => res.data),
  // categories api
  categoryList: (params: GetList) =>
    axiosInstance
      .get<ResponseList<CategoryDto[]>>('dashboards/admins/categories', { params })
      .then((res) => res.data),
  createCategory: ({ data }: { data: CreateCategoryDto }) => {
    console.info(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(key, val);
        });
      } else {
        formData.append(key, value);
      }
    });
    return axiosInstance.post<any>(`/categories`, formData).then((res) => res.data);
  },
  updateCategory: (data: UpdateCategoryDto) =>
    axiosInstance.patch('/categories', data).then(() => {}),
  deleteCategory: (id: string) => axiosInstance.delete(`/categories/${id}`).then(() => {}),
  // products api
  productList: (params: GetList) =>
    axiosInstance.get<ResponseList<ProductDto[]>>('/products', { params }).then((res) => res.data),
  productRequestList: (params: GetList) =>
    axiosInstance
      .get<ResponseList<ProductRequestDto[]>>('/products/requests', { params })
      .then((res) => res.data),
  postProduct: ({ data }: { data: Record<string, any> }) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(key, val);
        });
      } else {
        formData.append(key, value);
      }
    });

    return axiosInstance.post<any>(`/dashboards/products`, formData).then((res) => res.data);
  },
  brandList: () =>
    axiosInstance.get<BrandDto[]>('dashboards/products/brands/flat').then((res) => res.data),
  createBrand: ({ data }: { data: CreateBrandDto }) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(key, val);
        });
      } else {
        formData.append(key, value);
      }
    });
    return axiosInstance.post(`/dashboards/products/brands`, formData).then((res) => res.data);
  },
  updateBrand: ({ data }: { data: CreateBrandDto }, id: string) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(key, val);
        });
      } else {
        formData.append(key, value);
      }
    });
    return axiosInstance.put(`dashboards/products/brands/${id}`, formData).then((res) => res.data);
  },
  brandListWithPagination: (params: GetList) =>
    axiosInstance
      .get<ResponseList<BrandDto[]>>('products/brands/list', { params })
      .then((res) => res.data),
  // setting api
  settingList: (params: GetList) =>
    axiosInstance.get<ResponseList<SettingDto[]>>('/settings', { params }).then((res) => res.data),
  generalSetting: () => axiosInstance.get<SettingDto>('/settings/generals').then((res) => res),
  aboutUsSetting: () => axiosInstance.get<SettingDto>('/settings/about-us').then((res) => res),
  rulesGetMany: () => axiosInstance.get<RuleDto>('/settings/rules').then((res) => res),
  commissionList: (params: GetList) =>
    axiosInstance
      .get<ResponseList<CommissionDto[]>>('/settings/commissions', { params })
      .then((res) => res.data),
  createOrUpdateCommission: (data: CreateCommissionAdminDto) =>
    axiosInstance.post('/settings/commissions', data).then(() => {}),
  settingCreate: (data: CreateSettingAdminDto) =>
    axiosInstance.post(`settings`, data).then(() => {}),
  createGeneral: (data: CreateOrUpdateGeneralsDto) =>
    axiosInstance.post(`settings/generals`, data).then(() => {}),
  createAboutus: (data: CreateOrUpdateAboutUsDto) =>
    axiosInstance.post(`settings/about-us`, data).then(() => {}),
  createRule: (data: { bulk: CreateOrUpdateRuleDto[] }) =>
    axiosInstance.post(`settings/rules`, data).then(() => {}),
  settingUpdate: (id: string, data: UpdateSettingAdminDto) =>
    axiosInstance.put(`/settings/${id}`, data).then(() => {}),
  getSliders: () =>
    axiosInstance
      .get<{ Slider?: any[]; Square?: any[]; Wide?: any[] }>('/sliders')
      .then((res) => res),
  postSliders: ({
    data,
  }: {
    data: CreateSliderDto & {
      icon: File | Blob;
    };
  }) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(key, val);
        });
      } else {
        formData.append(key, value);
      }
    });
    return axiosInstance.post('/sliders', formData).then((res) => res.data);
  },
};

export default AxiosApi;
