import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetBrandList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.BRAND.LIST, params],
    queryFn: () => AxiosApi.brandListWithPagination(params),
    enabled,
  });
