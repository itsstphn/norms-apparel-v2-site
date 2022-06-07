import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Box from "@mui/material/Box";
import Product from "./pages/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import AddListing from "./pages/AddListing";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/productsSlice";
import { fetchCart } from "./store/cartSlice";

function App() {
  const { user, authIsReady, isAdmin } = useAuthContext();

  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(fetchCart(user));
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ overflow: "hidden", minHeight: "100vh", display: "flex" }}>
      {authIsReady ? (
        <BrowserRouter>
          <Navbar></Navbar>
          <Box paddingTop="65px" minHeight="100%" flexGrow={1}>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/product/:id" element={<Product></Product>}></Route>
              <Route
                path="/add-listing"
                element={<AddListing></AddListing>}
              ></Route>
              <Route path="/checkout" element={<Checkout></Checkout>}></Route>
              <Route
                path="/login"
                element={!user ? <Login></Login> : <Navigate to="/"></Navigate>}
              ></Route>
              <Route
                path="/signup"
                element={
                  !user ? <Signup></Signup> : <Navigate to="/"></Navigate>
                }
              ></Route>
            </Routes>
          </Box>
        </BrowserRouter>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
}

export default App;
