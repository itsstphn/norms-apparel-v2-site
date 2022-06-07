import React, { useState } from "react";
import CardForm from "./../components/CardForm";
import {
  Box,
  Typography,
  TextField,
  styled,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "./../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const CustomTextField = styled(TextField)({
  margin: ".5rem 0",
  width: "100%",
});

const Signup = () => {
  const { error, isPending, signup } = useSignup();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(displayName, email, password, userType);
    console.log(displayName, email, password, userType);
  };

  const handleUserSelect = (e) => {
    setUserType(e.target.value);
  };

  return (
    <CardForm>
      <Typography color="primary" fontWeight="bold" variant="h5" gutterBottom>
        Create Account
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

      <CustomTextField
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        label="Display Name"
        variant="standard"
      ></CustomTextField>

      <FormControl variant="standard" sx={{ margin: ".5rem 0" }}>
        <InputLabel>Type of user</InputLabel>
        <Select
          value={userType}
          label="Type of user"
          onChange={handleUserSelect}
        >
          <MenuItem value={"regular"}>Regular</MenuItem>
          <MenuItem value={"admin"}>Administrator</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          margin: "1.5rem",
          // marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Button type="submit" onClick={handleSubmit} variant="contained">
          Signup
        </Button>
      </Box>
    </CardForm>
  );
};

export default Signup;
