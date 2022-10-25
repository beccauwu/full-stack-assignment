import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";
import React from "react";
import { OnlyChildren } from "types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ea8bff",
      contrastText: "#000000",
    },
    secondary: {
      main: "#f942af",
    },
    background: {
      paper: "#343434",
      default: "#000000",
    },
    text: {
      primary: "#e8e6e8",
    },
    error: {
      main: "#fd708f",
      contrastText: "#000000",
    },
    warning: {
      main: "#f1f060",
      contrastText: "#000000",
    },
    info: {
      main: "#4B9EBF",
      contrastText: "#000000",
    },
    success: {
      main: "#b7f7de",
      contrastText: "#000000",
    },
  },
  shape: {
    borderRadius: 15,
  },
  typography: {
    fontSize: 13,
  },
  spacing: 8,
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiDataGrid: {
      defaultProps: {
        density: "comfortable",
        editMode: "row",
        componentsProps: {
          baseCheckbox: {
            color: "secondary",
            sx: {
              color: "#e8e6e8",
              "&.Mui-checked": {
                color: "#f942af",
              },
            },
          },
          pagination: {
            sx: {
              color: "#e8e6e8",
            },
          },
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: "#1A1A1A",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#e8e6e8",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#e8e6e8",
        },
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      },
    },
  },
});

const Theme: React.FC<OnlyChildren> = (props) => (
  <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    {props.children}
  </ThemeProvider>
);

export default Theme;
