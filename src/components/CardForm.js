import React from "react";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";

const CardForm = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        component="form"
        sx={{
          minHeight: "400px",
          width: "300px",
          padding: "1.5rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        elevation={3}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default CardForm;
