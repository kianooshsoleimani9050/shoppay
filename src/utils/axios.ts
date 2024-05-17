import { AdminLoginDto } from '../@types/models/admin-login-dto';
import { UserDto } from '../@types/models/user-dto';
import { PageMetaDto } from '../@types/models/page-meta-dto';
import { LoginPayloadDto } from '../@types/models/login-payload-dto';
import axios from 'axios';
// config
import { HOST_API } from '../config';
import { UserRegisterDto } from 'src/@types/models';

// ----------------------------------------------------------------------

type GetList = {
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
  adminLogin: (data: AdminLoginDto) =>
    axiosInstance.post<LoginPayloadDto>('/admin/login', data).then((res) => res.data),
  getUsers: (data: GetList) =>
    axiosInstance.get<ResponseList<UserDto[]>>('/users', { params: data }).then((res) => res.data),
  getSingleUser: (data: string) =>
    axiosInstance.get<UserDto>(`users/${data}`).then((res) => res.data),
  handleCreateUser: (data: UserRegisterDto) => axiosInstance.post<void>('', data).then(() => {}),
  handleUpdateUser: (data: UserRegisterDto) =>
    axiosInstance.put<UserDto>('', data).then((res) => res),
};

export default AxiosApi;
