import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const useGetSettingList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.SETTING.LIST, params],
    queryFn: () => AxiosApi.settingList(params),
    enabled,
  });
