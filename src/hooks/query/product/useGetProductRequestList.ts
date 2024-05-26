import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetProductRequestList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCT.REQUEST, params],
    queryFn: () => AxiosApi.productRequestList(params),
    enabled,
  });
