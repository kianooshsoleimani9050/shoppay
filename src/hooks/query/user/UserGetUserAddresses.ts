import AxiosApi, { GetList } from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetUserAddresses = (id: string, params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER.ADDRESSES, id],
    queryFn: () => AxiosApi.userAddresses(id, params),
    enabled,
  });
