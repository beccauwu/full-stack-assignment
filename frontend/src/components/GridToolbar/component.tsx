import AddIcon from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React, { useContext, useState } from "react";
import { UserContext } from "context";
import type { GridToolbarProps } from "types";
import { useConfirm } from "hooks";

const Toolbar: React.FC<GridToolbarProps> = ({ rowIds }) => {
  const [hoverState, setHoverState] = useState<boolean>(false);
  const confirm = useConfirm();
  const { state, modalState } = useContext(UserContext);
  const loading = state.loading;
  const handleDelete = () => {
    console.log("delete");
    state.delete && state.delete(rowIds as number[]);
  };
  const handleClick = () => {
    confirm({
      title: rowIds.length > 1 ? "Delete users?" : "Delete user?",
    }).then(() => {
      handleDelete();
    });
  };
  return (
    <GridToolbarContainer
      aria-busy={loading}
      sx={{
        justifyContent: "center",
        marginTop: 1,
        marginX: 2,
        gap: { xs: 2, sm: "none" },
      }}
    >
      <Box margin={{ sm: "0 auto 0 0", xs: "0 auto" }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          size="small"
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={() => modalState.setOpen(true)}
        >
          Create
        </Button>
        <GridToolbarColumnsButton />
      </Box>
      <GridToolbarExport
        csvOptions={{ fileName: "users" }}
        printOptions={{ hideFooter: true, hideToolbar: true }}
        sx={{ float: { sm: "right" }, display: { xs: "flex", sm: "none" } }}
      />
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput: string) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
        sx={{ display: { xs: "none", sm: "block" } }}
      />
      {rowIds.length > 0 &&
        (loading ? (
          <CircularProgress id="toolbarDeleteLoading" size={24} />
        ) : (
          <IconButton
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            onClick={handleClick}
          >
            <Delete color={!hoverState ? "primary" : "error"} />
          </IconButton>
        ))}
    </GridToolbarContainer>
  );
};

export default Toolbar;
