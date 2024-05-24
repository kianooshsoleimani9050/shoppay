import AxiosApi, { GetList } from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetVendorOrders = (id: string, params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.VENDOR.ORDERS, id],
    queryFn: () => AxiosApi.vendorOrders(id, params),
    enabled,
  });
