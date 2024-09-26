import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";
import { ptBR as gridPtBr } from "@mui/x-data-grid/locales";

// A custom theme for this app
const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#556cd6",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      },
    },
  },
  ptBR,
  gridPtBr
);

export default theme;
