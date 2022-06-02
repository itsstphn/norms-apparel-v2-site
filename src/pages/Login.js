import React, { useEffect, useState } from "react";
import CardForm from "./../components/CardForm";
import { Box, Typography, TextField, styled, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Notifier from "./../components/Notifier";
import { useAuthContext } from "./../hooks/useAuthContext";

const CustomTextField = styled(TextField)({
  margin: ".5rem 0",
  width: "100%",
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleClickLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  error && console.log("error is: ", error);

  const [openNotifierMessage, setOpenNotifierMessage] = useState(false);
  const handleClose = () => {
    setOpenNotifierMessage(false);
  };

  return (
    <CardForm>
      <Typography color="primary" fontWeight="bold" variant="h5" gutterBottom>
        Login
      </Typography>

      <CustomTextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        type="email"
        variant="standard"
      ></CustomTextField>

      <CustomTextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        variant="standard"
      ></CustomTextField>

      <Box
        sx={{
          margin: "1.5rem",
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        <Button onClick={handleClickLogin} variant="contained">
          Login
        </Button>
        <Notifier
          openMessage={openNotifierMessage}
          handleClose={handleClose}
          message={error}
          alertType="error"
        ></Notifier>
        <Button variant="outlined">
          <Link to="/signup">signup instead</Link>
        </Button>
      </Box>
    </CardForm>
  );
};

export default Login;
