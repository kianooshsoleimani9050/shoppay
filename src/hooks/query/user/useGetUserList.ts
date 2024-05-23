import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetUserList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER.LIST, params],
    queryFn: () => AxiosApi.userList(params),
    enabled,
  });
