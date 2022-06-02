import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Notifier = ({ openMessage, handleClose, message, alertType }) => {
  const vertical = "top";
  const horizontal = "right";

  return (
    <Snackbar
      open={openMessage}
      autoHideDuration={1500}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        onClose={handleClose}
        severity={alertType}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notifier;
