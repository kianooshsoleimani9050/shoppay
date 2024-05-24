import { useQuery } from '@tanstack/react-query';
import AxiosApi from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetSupplierSingle = (id: string, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.SUPPLIER.SINGLE, id],
    queryFn: () => AxiosApi.singleSupplier(id),
    enabled,
  });
