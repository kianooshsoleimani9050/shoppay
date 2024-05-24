import { useQuery } from '@tanstack/react-query';
import AxiosApi from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetVendorSingle = (id: string, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.VENDOR.SINGLE, id],
    queryFn: () => AxiosApi.singleVendor(id),
    enabled,
  });
