import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetSupplierList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.SUPPLIER.LIST, params],
    queryFn: () => AxiosApi.supplierList(params),
    enabled,
  });
