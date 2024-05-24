import { useQuery } from '@tanstack/react-query';
import AxiosApi from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetStatus = (enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.GENERAL.STATS],
    queryFn: () => AxiosApi.stats(),
    enabled,
  });
