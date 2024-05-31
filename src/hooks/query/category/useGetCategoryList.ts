import { useQuery } from '@tanstack/react-query';
import AxiosApi, { GetList } from '../../../utils/axios';
import { QUERY_KEYS } from 'src/utils/constant';

export const categories_list_to_tree = (list: any[]) => {
  let map: {
      [key: string]: any;
    } = {},
    node;
  const roots: any[] = [];
  for (let i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (let j = 0; j < list.length; j += 1) {
    node = list[j];
    if (node.parentId && !!String(map[node.parentId])) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children?.push(node);
    } else {
      roots.push(node);
    }
  }
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
      data: categories_list_to_tree(data.data.map((category) => ({ ...category, children: [] }))),
      rawData: data,
    }),
  });
