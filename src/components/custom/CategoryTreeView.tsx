import {
  useCallback,
  useState,
} from "react";
import { m } from "framer-motion";
import {
  alpha,
  Box,
  Checkbox,
  Collapse,
  IconButton,
  InputAdornment,
  LinearProgress,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { TreeView } from "@mui/lab";
import TreeItem, { treeItemClasses, TreeItemProps } from "@mui/lab/TreeItem";
import { debounce } from "lodash-es";
import useLocales from "../../hooks/useLocales";
import Iconify from "../Iconify";
import { GridSearchIcon } from "@mui/x-data-grid";
import { CategoryDto } from "src/@types/models";
import { useGetCategoryList } from "src/hooks/query/category/useGetCategoryList";
import { useNavigate } from "react-router";
import AxiosApi from "src/utils/axios";
import { PATH_DASHBOARD } from "src/routes/paths";

type CustomCategoryType = Omit<CategoryDto, "children"> & {
  children: CustomCategoryType[];
};

const mockNode: CustomCategoryType = {
  title: "",
  parentId: "",
  id: "root",
  createdAt: new Date(),
  updatedAt: new Date(),
  children: [],
  icon: "",
  parent: {} as any
};

type OpenAddDialogFnType = {
  parentId: string;
  parentTitle: string;
  id: string;
};
type OpenEditDialogFnType = OpenAddDialogFnType & { title: string };
type OpenDeleteDialogFnType = {
  title: string;
  id: string;
};

const TransitionComponent = (props: TransitionProps) => (
  <m.div
    initial={{ opacity: 0, transform: "translate3d(20px,0,0)" }}
    whileInView={{
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    }}
    viewport={{ once: true }}
  >
    <Collapse {...props} />
  </m.div>
);

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  minWidth: 300,
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

interface RenderTreePropsType {
  nodes: CustomCategoryType;
  title: string;
  handleOpenAddDialog: (arrgs: OpenAddDialogFnType) => void;
  handleOpenInfoDialog: (arrgs: OpenEditDialogFnType) => void;
  handleOpenDeleteDialog: (arrgs: OpenDeleteDialogFnType) => void;
  selectMode?: boolean;
  onSelectHandler?: (categoryId: string) => void;
  isSelected?: (categoryId: string) => boolean;
  isParent?: boolean;
  selectedIds?: string[];
}

interface TreeItemContentPropsType extends RenderTreePropsType {
  isBase?: boolean;
}

const TreeItemContent = ({
  nodes,
  handleOpenAddDialog,
  handleOpenInfoDialog,
  handleOpenDeleteDialog,
  isBase,
  selectMode,
  isParent,
  selectedIds,
}: TreeItemContentPropsType) => (
  <Box display="flex" alignItems="center" py={0.8}>
    {selectMode && !isParent && (
      <Checkbox
        checked={!!selectedIds?.find((cat) => cat === nodes.id)}
        sx={{ mr: 2 }}
      />
    )}
    <Typography>{nodes.title}</Typography>
    {!selectMode && (
      <Box ml={2}>
        {!isBase && (
          <>
            <IconButton
              color="default"
              size="small"
              disabled={!!nodes.children.length}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDeleteDialog({
                  id: nodes.id,
                  title: nodes.title,
                });
              }}
            >
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
            <IconButton
              color="info"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenInfoDialog({
                  id: nodes.id,
                  title: nodes.title,
                  parentId: "",
                  parentTitle: "",
                });
              }}
            >
              <Iconify icon="eva:info-outline" />
            </IconButton>
          </>
        )}
      </Box>
    )}
  </Box>
);

const RenderTree = ({
  nodes,
  title,
  handleOpenAddDialog,
  handleOpenInfoDialog,
  handleOpenDeleteDialog,
  selectMode,
  onSelectHandler,
  isSelected,
  selectedIds,
}: RenderTreePropsType) => (
  <StyledTreeItem
    key={nodes.id}
    nodeId={nodes.id}
    label={
      <TreeItemContent
        nodes={nodes}
        title={title}
        handleOpenAddDialog={handleOpenAddDialog}
        handleOpenInfoDialog={handleOpenInfoDialog}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
        selectMode={!!selectMode}
        isSelected={isSelected}
        isParent={!!nodes.children.length}
        selectedIds={selectedIds}
      />
    }
    onClick={() => {
      if (onSelectHandler && !nodes.children.length) {
        onSelectHandler(nodes.id);
      }
    }}
  >
    {Array.isArray(nodes.children) &&
      nodes.children.map((node) => (
        <RenderTree
          key={node.id}
          nodes={node}
          title={title}
          handleOpenAddDialog={handleOpenAddDialog}
          handleOpenInfoDialog={handleOpenInfoDialog}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          selectMode={!!selectMode}
          onSelectHandler={onSelectHandler}
          isParent={!!node.children.length}
          selectedIds={selectedIds}
        />
      ))}
  </StyledTreeItem>
);

interface CategoryTreeViewPropsType {
  hasMaxHeight?: boolean;
}
export const CategoryTreeView = ({
  hasMaxHeight = true,
}: CategoryTreeViewPropsType) => {
  const { translate } = useLocales();

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoryList({ ...(searchValue && { q: searchValue }) });

  const idList = [
    ...(categoryData?.idList || []),
  ];

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(debounce(handleSearch, 500), []);


  const handleRowClick = (rowId: string | number) => {
    navigate(PATH_DASHBOARD.category.edit(`${rowId}`));
  };

  const handleDeleteRow = (rowId: string) => {
    AxiosApi.deleteCategory(rowId).then(() => {
      navigate(PATH_DASHBOARD.category.list);
    });
  };

  if ((!categoryData && isCategoryLoading)) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <TextField
        fullWidth
        placeholder={translate("CATEGORY_SEARCH")}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GridSearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TreeView
        aria-label="category"
        // defaultCollapseIcon={<ExpandMore />}
        defaultExpanded={idList}
        // defaultExpandIcon={<ChevronRight />}
        disableSelection
        sx={{
          minHeight: 110,
          ...(hasMaxHeight && {
            maxHeight: 300,
          }),
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <StyledTreeItem
          key={1}
          nodeId={mockNode.id}
          label={
            <TreeItemContent
              nodes={{
                ...mockNode,
                id: "",
                title: translate("ALL"),
              }}
              title={translate("ALL")}
              handleOpenAddDialog={() => { }}
              handleOpenInfoDialog={() => { }}
              handleOpenDeleteDialog={() => { }}
              isBase
              selectMode
              isParent
            />
          }
        >
          {categoryData?.data.map((category) => (
            <RenderTree
              key={category.id}
              nodes={category}
              title={category.title}
              handleOpenAddDialog={() => { }}
              handleOpenInfoDialog={(data) => {
                handleRowClick(data?.id)
              }}
              handleOpenDeleteDialog={(data) => {
                handleDeleteRow(data?.id);
              }}
              isParent={!category.children.length}
            />
          ))}
        </StyledTreeItem>
      </TreeView>
    </>
  );
};