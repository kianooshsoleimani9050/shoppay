import AxiosApi, { GetList } from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetSupplierAddresses = (id: string, params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.SUPPLIER.ADDRESSES, id],
    queryFn: () => AxiosApi.supplierAddresses(id, params),
    enabled,
  });
