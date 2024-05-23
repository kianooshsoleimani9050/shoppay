import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetOrderList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.ORDER.LIST, params],
    queryFn: () => AxiosApi.orderList(params),
    enabled,
  });
