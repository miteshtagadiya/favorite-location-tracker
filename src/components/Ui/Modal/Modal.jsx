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
  Divider,
} from "@material-ui/core";
import MapWithSearch from "../../App/Maps/SearchMap.jsx";
import "./Modal.sass";

const Modal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      className="Modal"
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
                props.setLocation({
                  latitude: location.position.lat(),
                  longitude: location.position.lng(),
                });
              }else{
                props.setLocation({
                  latitude: 24.6578,
                  longitude: 25.64246,
                });
              }
            }}
          />
          <div>
            <div className="input-width">
              <TextField
                id="filled-multiline-static"
                label="Name"
                fullWidth
                onChange={(e) => props.setName(e.target.value)}
                variant="outlined"
              />
            </div>
            <div className="input-width">
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
        </div>
      </DialogContent>
      {props.writeError !== null && (
        <div className="error-msg">{props.writeError}</div>
      )}
      <Divider />
      <DialogActions className="action-buttons">
        <Button autoFocus onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={
            props.description === "" ||
            props.name === "" ||
            props.location === "" ||
            props.loading
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
