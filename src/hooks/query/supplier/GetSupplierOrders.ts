import AxiosApi, { GetList } from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetSupplierOrders = (id: string, params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.SUPPLIER.ORDERS, id],
    queryFn: () => AxiosApi.supplierOrders(id, params),
    enabled,
  });
