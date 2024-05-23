import { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  DataGridProps,
  GridSortModel,
  GridFilterModel,
} from "@mui/x-data-grid";

export type OtherObjectsType = { [key: string]: any };

export type QueryType = {
  sortModel?: GridSortModel;
  filterModel?: GridFilterModel;
  page: number;
  pageSize: number;
  otherObjects: OtherObjectsType;
};

type CustomDataGridPropsType = Omit<DataGridProps, "filterMode"> & {
  onQueryChange: (tableState: QueryType) => void;
};
export const CustomDataGrid = ({
  onQueryChange,
  ...props
}: CustomDataGridPropsType) => {
  const defaultData = {
    page: props?.initialState?.pagination?.page || 0,
    pageSize: props?.initialState?.pagination?.pageSize || 10,
    sortModel: props?.initialState?.sorting?.sortModel || [],
    filterModel: props?.initialState?.filter?.filterModel || {
      items: [],
    },
  };
  const [queryState, setQueryState] = useState<QueryType>({
    sortModel: defaultData.sortModel,
    filterModel: defaultData.filterModel,
    page: defaultData.page,
    pageSize: defaultData.pageSize,
    otherObjects: {},
  });

  useEffect(() => {
    onQueryChange(queryState);
  }, [onQueryChange, queryState]);

  return (
    <DataGrid
      sortingMode="server"
      sortModel={queryState.sortModel}
      onSortModelChange={(model) =>
        setQueryState((pre) => ({ ...pre, sortModel: model }))
      }
      filterMode="server"
      filterModel={
        (queryState.filterModel?.items?.length
          ? queryState.filterModel
          : { items: [] }) as GridFilterModel
      }
      onFilterModelChange={(model) => {
        setQueryState((pre) => ({ ...pre, filterModel: model }));
      }}
      paginationMode="server"
      pagination
      page={queryState.page}
      pageSize={queryState.pageSize}
      onPageChange={(NPage) =>
        setQueryState((pre) => ({ ...pre, page: NPage }))
      }
      onPageSizeChange={(NPageSize) =>
        setQueryState((pre) => ({ ...pre, pageSize: NPageSize }))
      }
      rowsPerPageOptions={[10, 20, 50, 100]}
      components={{ Toolbar: GridToolbar }}
      sx={{
        minHeight: 420,
        ...props.sx,
      }}
      disableSelectionOnClick
      {...props}
    />
  );
};
