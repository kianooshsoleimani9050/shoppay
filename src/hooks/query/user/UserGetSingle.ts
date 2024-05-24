import { useQuery } from '@tanstack/react-query';
import AxiosApi from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetUserSingle = (id: string, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER.SINGLE, id],
    queryFn: () => AxiosApi.singleUser(id),
    enabled,
  });
