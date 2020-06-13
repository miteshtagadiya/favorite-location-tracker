import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MapWithSearch from "../../App/Maps/SearchMap.jsx";

const Modal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Add New Location"}
      </DialogTitle>
      <DialogContent>
        <div style={{ textAlign: "center" }}>
          <MapWithSearch
            select={"select"}
            onSelect={(location) => {
              if (typeof location !== "undefined") {
                console.log(location.position.lat());
                console.log(location.position.lng());
              }
              props.setLocation({
                latitude: 24.879999,
                longitude: 24.879999,
              });
            }}
          />
          <div style={{ marginTop: 20, width: 530 }}>
            <TextField
              id="filled-multiline-static"
              label="Name"
              fullWidth
              onChange={(e) => props.setName(e.target.value)}
              variant="outlined"
            />
          </div>
          <div style={{ marginTop: 20, width: 530 }}>
            <TextField
              id="filled-multiline-static"
              label="Description"
              multiline
              fullWidth
              onChange={(e) => props.setDescription(e.target.value)}
              rows={2}
              variant="outlined"
            />
          </div>
        </div>
      </DialogContent>
      {props.writeError !== null && (
        <div style={{ margin: 20 }}>{props.writeError}</div>
      )}
      <DialogActions style={{ justifyContent: "center", padding: 15 }}>
        <Button autoFocus onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={
            props.description === "" || props.name === "" || props.loading
          }
          onClick={props.handleLocationAdd}
          color="primary"
          autoFocus
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
