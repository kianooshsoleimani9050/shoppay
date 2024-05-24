import AxiosApi, { GetList } from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetUserLogins = (id: string, params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER.LOGINS, id],
    queryFn: () => AxiosApi.userLogins(id, params),
    enabled,
  });
