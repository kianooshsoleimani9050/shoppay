import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetCategoryList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORY.LIST, params],
    queryFn: () => AxiosApi.categoryList(params),
    enabled,
  });
