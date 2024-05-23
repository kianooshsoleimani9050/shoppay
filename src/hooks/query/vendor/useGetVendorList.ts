import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetVendorList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.VENDOR.LIST, params],
    queryFn: () => AxiosApi.vendorList(params),
    enabled,
  });
