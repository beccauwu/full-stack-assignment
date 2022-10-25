import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Unstable_Grid2";
import {
  GridFooterContainer,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import React from "react";
import type { GridFooterProps } from "types";

const PaginationComponent: React.FC = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      count={pageCount}
      page={page + 1}
      boundaryCount={0}
      size="small"
      variant="outlined"
      color="primary"
      sx={{ mx: "auto", width: "fit-content" }}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};

const Footer: React.FC<GridFooterProps> = (props) => {
  return (
    <GridFooterContainer sx={{ borderTop: "none" }}>
      <Grid
        container
        columnSpacing={1}
        rowSpacing={3}
        direction={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "flex-start", sm: "space-between" }}
        alignItems="center"
        textAlign="center"
        width="100%"
      >
        <Grid
          xs
          sx={{
            color: "#ea8bff",
            textAlign: "left",
          }}
        >
          <Typography marginLeft={{ sm: 2, xs: "none" }}>
            {props.rowIds.length} users selected
          </Typography>
        </Grid>

        <Grid xs sm={5}>
          <PaginationComponent />
        </Grid>
        <Grid
          xs
          sx={{
            color: "#ea8bff",
          }}
        >
          <GridToolbarExport
            csvOptions={{ fileName: "users" }}
            printOptions={{ hideFooter: true, hideToolbar: true }}
            sx={{ float: "right", display: { xs: "none", sm: "flex" } }}
          />
          <GridToolbarQuickFilter
            quickFilterParser={(searchInput: string) =>
              searchInput
                .split(",")
                .map((value) => value.trim())
                .filter((value) => value !== "")
            }
            sx={{ display: { xs: "block", sm: "none" }, marginBottom: 2 }}
          />
        </Grid>
      </Grid>
    </GridFooterContainer>
  );
};

export default Footer;
