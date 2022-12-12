import * as React from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SimpleBackdrop from "./loading";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { commonState } from "./constants";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoupeIcon from '@mui/icons-material/Loupe';
import AddModal from "./inventory/addMaterialModal";
import Pagination from '@mui/material/Pagination';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

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
  const [addModal, setAddModal] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [materials, setMateriaials] = React.useState([{}]);

  const [value, setValue] = React.useState('RAW');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  React.useEffect(() => {
    setLoading(true);
    const payload = {};

    console.log(payload);

    const headers = {
      'Content-Type': 'application/json',
      'tokken': commonState.tokken,
    };

    axios
      .post("http://localhost:8090/v1/getmaterials", payload,{headers})
      .then((response) => {
        setLoading(false);
        if (response.data && response.data.materials) {
          setMateriaials(response.data.materials)
        }
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
      {addModal && <AddModal setAddModal={setAddModal}/>}
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs onChange={handleChange} aria-label="lab API tabs example" value={value}>
            <Tab label="Raw" value="RAW" />
            <Tab label="Inter-mediate" value="INTER" />
            <Tab label="Final" value="FINAL" />
          </Tabs>
        </Box>
        <Stack spacing={2}>
        {materials.map((text, index) => (
          <div></div>
        ))}
        <Button variant="outlined"  color="success" startIcon={<LoupeIcon />} onClick={()=>{setAddModal(true)}}>
          Add Material
        </Button>
        <br></br><br></br>
        <Pagination count={10} color="secondary"/>
      </Stack>
    </ThemeProvider>
  );
});
