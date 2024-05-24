import AxiosApi, { GetList } from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetUserOrders = (id: string, params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER.ORDERS, id],
    queryFn: () => AxiosApi.userOrders(id, params),
    enabled,
  });
