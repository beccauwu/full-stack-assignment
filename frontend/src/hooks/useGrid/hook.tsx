import {
  GridColumnVisibilityModel,
  GridFilterModel,
  GridLinkOperator,
  GridSelectionModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useReducer } from "react";
import type {
  GridAction as Action,
  GridState as State,
} from "types/GridReducerTypes";

/**
 * Manages the state of the grid
 * @returns state and a dispatch function to update the state
 */
const useGrid = () => {
  const gridReducer = (state: State, action: Action) => {
    switch (action.type) {
      case "rowids":
        return {
          ...state,
          rowIds: action.payload as GridSelectionModel,
        };
      case "sort":
        return { ...state, sortState: action.payload as GridSortModel };
      case "filter":
        return { ...state, filterState: action.payload as GridFilterModel };
      case "visibility":
        return {
          ...state,
          visibilityState: action.payload as GridColumnVisibilityModel,
        };
      default:
        return state;
    }
  };
  const initialState: State = {
    rowIds: [],
    sortState: [{ field: "id", sort: "asc" }],
    filterState: {
      items: [],
      linkOperator: GridLinkOperator.Or,
      quickFilterLogicOperator: GridLinkOperator.And,
      quickFilterValues: [],
    },
    visibilityState: {},
  };
  const [state, dispatch] = useReducer(gridReducer, initialState);
  return { state: state, dispatch: dispatch };
};

export default useGrid;
