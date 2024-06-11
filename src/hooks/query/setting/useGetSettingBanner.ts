import { useQuery } from '@tanstack/react-query';
import AxiosApi from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetSettingBanner = () =>
  useQuery({
    queryKey: [QUERY_KEYS.SLIDER.LIST],
    queryFn: () => AxiosApi.getSliders(),
  });
