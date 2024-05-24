import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetProductList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCT.LIST, params],
    queryFn: () => AxiosApi.productList(params),
    enabled,
  });
