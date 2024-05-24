import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetCommissionList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.COMMISSION.LIST, params],
    queryFn: () => AxiosApi.commissionList(params),
    enabled,
  });
