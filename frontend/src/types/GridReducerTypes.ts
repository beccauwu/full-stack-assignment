import type {
  GridColumnVisibilityModel,
  GridFilterModel,
  GridSelectionModel,
  GridSortModel,
} from "@mui/x-data-grid";

type GridAction = {
  type: "rowids" | "sort" | "filter" | "visibility" | "init";
  payload:
    | GridSelectionModel
    | GridSortModel
    | GridFilterModel
    | GridColumnVisibilityModel;
};

type GridState = {
  rowIds: GridSelectionModel;
  sortState: GridSortModel;
  filterState: GridFilterModel;
  visibilityState: GridColumnVisibilityModel;
};

export type { GridAction, GridState };
