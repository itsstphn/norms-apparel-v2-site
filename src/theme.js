import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200EA",

      contrastText: "#fff",
    },
    secondary: {
      light: "#B0BEC5",
      main: "#B0BEC5",
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 414, // iPhone X and below in portrait mode
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
