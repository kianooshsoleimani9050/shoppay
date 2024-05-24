import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetPendingVendorList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.VENDOR.PENDING_LIST, params],
    queryFn: () => AxiosApi.pendingVendorList(params),
    enabled,
  });
