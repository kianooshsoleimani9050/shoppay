import AxiosApi, { GetList } from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetVendorAddresses = (id: string, params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.VENDOR.ADDRESSES, id],
    queryFn: () => AxiosApi.vendorAddresses(id, params),
    enabled,
  });
