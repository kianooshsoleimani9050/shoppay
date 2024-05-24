import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetPendingSupplierList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.SUPPLIER.PENDING_LIST, params],
    queryFn: () => AxiosApi.pendingSupplierList(params),
    enabled,
  });
