import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const categories_list_to_tree = (list: any[]) => {
  const roots: any[] = [];
  list.forEach((item) => {
    roots.push(item);
    console.log(item);
    if (!!item?.children?.length) {
      roots.push(...item?.children);
    }
  });
  return roots;
};

export const useGetCategoryList = (params: GetList, enabled = true) =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORY.LIST, params],
    queryFn: () => AxiosApi.categoryList(params),
    enabled,
    select: (data) => ({
      ...data,
      idList: ['root'],
      data: categories_list_to_tree(data.data),
      rawData: data,
    }),
  });
