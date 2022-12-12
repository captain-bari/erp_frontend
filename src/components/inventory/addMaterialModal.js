import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: 5,
  borderColor: "#4db6ac",
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

export default function AddModal(props) {
  const handleClose = () => props.setAddModal(false);

  const [type, setType] = React.useState('RAW');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add material details
            </Typography>
            <br></br>
            <TextField id="material-name" label="Material Name" variant="outlined" />
            <FormControl sx={{ minWidth: 120,'margin-left': 10}}>
                <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-helper"
                  value={type}
                  label="Type"
                  autoWidth
                  onChange={handleChange}
                  
                >
                  <MenuItem value='RAW'>Raw</MenuItem>
                  <MenuItem value='INTER'>Inter-mediate</MenuItem>
                  <MenuItem value='FINAL'>Final</MenuItem>
                </Select>
            </FormControl>
            <br></br><br></br>
            <Button variant="contained" color="success">Add</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}