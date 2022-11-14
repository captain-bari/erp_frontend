import * as React from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SimpleBackdrop from "./loading";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
    ].join(","),
    fontSize: 15,
  },
});

export default React.memo(function Inventory(props) {
  const [loading, setLoading] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  React.useEffect(() => {
    setLoading(true);
    const payload = {};

    console.log(payload);

    axios
      .post("https://localhost:8090/v1/getelements", payload)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMsg("Failed to get inventory items. Please contact maintaner.");
        setErrorOpen(true);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {loading && <SimpleBackdrop />}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setErrorOpen(false)} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
});
