import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridLinkOperator } from "@mui/x-data-grid";
import { GridFooter, GridToolbar } from "components";
import { UserContext } from "context";
import { useGrid } from "hooks";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";

const SortDescIcon: React.FC = () => <ExpandMoreIcon color="primary" />;
const SortAscIcon: React.FC = () => <ExpandLessIcon color="primary" />;

const UserGrid: React.FC = () => {
  const reducer = useGrid();
  const { rowIds, sortState, visibilityState } = reducer.state;
  const { state } = useContext(UserContext);
  const [loaded, setLoaded] = useState<boolean>(false);
  const loading = state.loading;
  const users = state.data;
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, editable: false },
    {
      field: "name",
      headerName: "Name",
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];
  useEffect(() => {
    if (users) {
      setLoaded(true);
    }
    return () => {
      setLoaded(false);
    };
  }, [users]);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "100vh",
        p: { xs: 1, sm: 5 },
      }}
    >
      <Box sx={{ m: "0 auto", flexGrow: 1, height: "90%" }}>
        {loaded && (
          <DataGrid
            columns={columns}
            loading={!!loading}
            disableColumnMenu
            rows={users || []}
            getRowId={(row) => row.id}
            onSelectionModelChange={(newSelection) => {
              reducer.dispatch({ type: "rowids", payload: newSelection });
            }}
            onSortModelChange={(newSortModel) => {
              reducer.dispatch({ type: "sort", payload: newSortModel });
            }}
            columnVisibilityModel={visibilityState}
            onColumnVisibilityModelChange={(newVisibilityModel) => {
              reducer.dispatch({
                type: "visibility",
                payload: newVisibilityModel,
              });
            }}
            sortModel={sortState}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterLogicOperator: GridLinkOperator.Or,
                },
              },
            }}
            selectionModel={rowIds}
            checkboxSelection
            components={{
              ColumnSortedAscendingIcon: SortAscIcon,
              ColumnSortedDescendingIcon: SortDescIcon,
              Toolbar: GridToolbar,
              Footer: GridFooter,
              Pagination: null,
            }}
            scrollbarSize={10}
            componentsProps={{
              toolbar: { rowIds: rowIds },
              baseCheckbox: { sx: { color: "primary.main" } },
              footer: {
                rowIds: rowIds,
                users: users,
              },
            }}
            autoPageSize
          />
        )}
      </Box>
    </Box>
  );
};

export default UserGrid;
