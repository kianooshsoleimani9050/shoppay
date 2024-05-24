import AxiosApi, { GetList } from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetSupplierVendors = (id: string, params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.SUPPLIER.VENDORS, id],
    queryFn: () => AxiosApi.supplierVendor(id, params),
    enabled,
  });
